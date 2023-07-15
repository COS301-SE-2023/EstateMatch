import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';


@Injectable()
export class RemaxSaleService {
  public async RemaxSalescrape(): Promise<any[]> {
    // Launch Puppeteer and open new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const navigationTimeout = 180000;

    // Go to target web page
    await page.goto('https://www.remax.co.za/property/for-sale/south-africa/western-cape/cape-town-city-bowl/', {
      timeout: navigationTimeout,
    });


    // Wait for the results container to load 
    await page.waitForSelector('.landing-page-container-inner');

    const pageLinks = (await page.$$eval('.page-item a.page-link', (pagination) => pagination.map((page) => page.getAttribute('href') || ''))).filter(url => url !== "#");

    const lastPageLink = pageLinks[pageLinks.length - 2];
    const pageNumber = parseInt(lastPageLink.slice(-2));

    var propertyURLs: string[] = [];
    const pages = await browser.newPage();

    for(let i = 1; i <= 2; i++)
    {
      if(i === 1)
      {

        await pages.goto("https://www.remax.co.za/property/for-sale/south-africa/western-cape/cape-town-city-bowl/", {
          timeout: navigationTimeout,
        });

        propertyURLs = propertyURLs.concat( await pages.$$eval('.property-card-info a.property-card-link', (listings) =>
        listings.map((listing) => listing.getAttribute('href') || '')
        ));
      }

      else
      {
        await pages.goto('https://www.remax.co.za/property/for-sale/south-africa/western-cape/cape-town-city-bowl/?page=' + i.toString(), {
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
      const price = await propertyPage.$eval('.price', (priceElement) => priceElement.textContent?.trim() || '');
      const description = await propertyPage.$$eval('.details p', (descriptionElement) => descriptionElement.map((description) => description.textContent?.trim() || ''));
      const location = title.split("in")[1].trim();
      const bedrooms = await page.$('td[itemprop="numberOfRooms"]');
      const keyVals = await page.$$('td[itemprop="amenityFeature"]');
      //const propAttrValue = await propertyPage.$$eval('.propAttrValue', (propAttrValueElement) => propAttrValueElement.map((propAttrValue) => propAttrValue.textContent?.trim() || ''));
      const amenities = await page.$$(`.mobi-features-list li`);

      // Initialize variables for storing bedrooms, bathrooms, garages, and amenities 
      var bathrooms;
      var garages;

      if (keyVals.length === 1)
      {
        bathrooms = keyVals[0];
        garages = 0;
      }

      else
      {
        bathrooms = keyVals[0];
        garages = keyVals[1];
      }

    

      // Check if the text content matches the desired value
      /*for (const attribute of attributeLabel) 
      {
        if (attribute === 'Bedrooms') 
        {
          
          bedrooms= propAttrValue[attributeLabel.indexOf(attribute)];
          
        }

        if (attribute === 'Bathrooms')
        {
          bathrooms= propAttrValue[attributeLabel.indexOf(attribute)];
          
        }

        if (attribute === 'Covered Parkings' || attribute === 'Open Parkings' || attribute === 'Garages')
        {
          garages= propAttrValue[attributeLabel.indexOf(attribute)];
          
        }

        if(attribute !== 'Bedrooms' && attribute !== 'Bathrooms' && attribute !== 'Covered Parkings' && attribute !== 'Open Parkings' && attribute !== 'Garages' && attribute !== 'Lounges')
        {
          amenities.push(attribute);
        }
      }*/

      // Extract and process image URLs for the property
      const imageURLs = await propertyPage.$$eval('.swiper-slide a', (imagesElement) => imagesElement.map((image) => image.getAttribute('href') || ''));
    
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
      };
    })
  );

  // Close the browser
  await browser.close();

  const filteredPropertyListings = propertyListings.filter((property) => property.price !== "Sold");

  // Return the array of property listings
  return filteredPropertyListings;
}
}