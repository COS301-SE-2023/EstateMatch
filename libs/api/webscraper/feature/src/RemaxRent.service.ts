import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';


@Injectable()
export class RemaxRentService {
  public async RemaxRentscrape(location:string): Promise<any[]> {
    // Launch Puppeteer and open new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const navigationTimeout = 180000;

    // Go to target web page
    /*await page.goto('https://www.remax.co.za/property/to-rent/south-africa/western-cape/cape-town-city-bowl/', {
      timeout: navigationTimeout,
    });*/

    await page.goto('https://www.remax.co.za/property/to-rent/', {
      timeout: navigationTimeout,
    });

    await page.waitForSelector('.app-container', {
      timeout: navigationTimeout,
    });

    await page.waitForSelector('span.tagify__input');

    await page.type('span.tagify__input', "Camps Bay");

    await page.waitForTimeout(1000);

    await page.keyboard.press('Enter');

    //await page.waitForTimeout(1000);
    await page.waitForSelector('#searchBox-container');
    await page.waitForSelector('#searchBox-container button.btn.btn-red[type="submit"]');
    const submitButtonSelector = 'button.btn.btn-red[type="submit"]';
    const submitButton = await page.waitForSelector(submitButtonSelector);

    await submitButton?.evaluate((button) => button.click());

    await page.waitForNavigation();

    //console.log(page.url());


    // Wait for the results container to load 
    await page.waitForSelector('.landing-page-container-inner');

    const pageLinks = (await page.$$eval('.page-item a.page-link', (pagination) => pagination.map((page) => page.getAttribute('href') || ''))).filter(url => url !== "#");

    const lastPageLink = pageLinks[pageLinks.length - 2];
    //const pageNumber = parseInt(lastPageLink.slice(-2));

    var propertyURLs: string[] = [];
    const pages = await browser.newPage();

    for(let i = 1; i <= 2; i++)
    {
      if(i === 1)
      {

        await pages.goto("https://www.remax.co.za/property/to-rent/south-africa/western-cape/cape-town-city-bowl/", {
          timeout: navigationTimeout,
        });

        propertyURLs = propertyURLs.concat( await pages.$$eval('.property-card-info a.property-card-link', (listings) =>
        listings.map((listing) => listing.getAttribute('href') || '')
        ));
      }

      else
      {
        await pages.goto('https://www.remax.co.za/property/to-rent/south-africa/western-cape/cape-town-city-bowl/?page=' + i.toString(), {
          timeout: navigationTimeout,
        });

        propertyURLs = propertyURLs.concat( await pages.$$eval('.property-card-info a.property-card-link', (listings) =>
        listings.map((listing) => listing.getAttribute('href') || '')
        ));
      }


    }

  // Process each property page
  const propertyListings = await Promise.all(
    propertyURLs.map(async (url) => {
      // Open a new page for each property
      const propertyPage = await browser.newPage();
      await propertyPage.goto("https://www.remax.co.za" +url, {
        timeout: navigationTimeout,
      });

      // Wait for the property page to load
      await propertyPage.waitForSelector('.single-listing-page-container');

      // Extract the data we want
      const title = await propertyPage.$eval('.header-info-lrg h1', (titleElement) => titleElement.textContent?.trim() || '');
      const price = (await propertyPage.$eval('.price', (priceElement) => priceElement.textContent?.trim() || '')).slice(1);
      const filteredDescription = await propertyPage.$$eval('.details p', (descriptionElement) => descriptionElement.map((description) => description.textContent?.trim() || '').filter((item) => item.trim() !== ''));
      const description = filteredDescription.slice(0, filteredDescription.length - 6);
      const location = title.split("in")[1].trim();
      const bedrooms = await (await propertyPage.$('.details.property-details [itemprop="numberOfRooms"]'))?.evaluate((el) => el.textContent?.trim() || '');
      const keyVals = await propertyPage.$$eval('.details.property-details [itemprop="amenityFeature"]', (elements) =>elements.map((el) => el.textContent?.trim() || ''));
      const amenities = await propertyPage.$$eval('.mobi-features-list li', (elements) =>elements.map((el) => el.textContent?.trim() || ''));

      // Initialize variables for storing bedrooms, bathrooms, garages, and amenities 
      var bathrooms;
      var garages;

      if (keyVals.length < 2)
      {
        bathrooms = keyVals[0];
        garages = "0";
      }

      else
      {
        bathrooms = keyVals[0];
        garages = keyVals[1];
      }

      // Extract and process image URLs for the property
      const imageURLs = await propertyPage.$$eval('.swiper-slide a', (imagesElement) => imagesElement.map((image) => image.getAttribute('href') || ''));
      
      const type = 'Rent';
      // Close the property page
      await propertyPage.close();

      // Return an object containing all the extracted property details
      return {
        title,
        price,
        description,
        bedrooms,
        bathrooms,
        garages,
        imageURLs,
        location,
        amenities,
        type,
      };
    })
  );

  // Close the browser
  await browser.close();

  const filteredPropertyListings = propertyListings.filter((property) => property.price !== "OA");

  // Return the array of property listings
  return filteredPropertyListings;
}
}