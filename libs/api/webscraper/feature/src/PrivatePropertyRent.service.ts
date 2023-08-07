import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';


@Injectable()
export class PrivatePropertyRentService {
  public async PrivatePropertyRentscrape(location: string): Promise<any[]> {
    // Launch Puppeteer and open new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const navigationTimeout = 180000;

    // Go to target web page
    /*await page.goto('https://www.privateproperty.co.za/to-rent/western-cape/cape-town/cape-town-city-bowl/59', {
      timeout: navigationTimeout,
    });*/

    await page.goto('https://www.privateproperty.co.za/to-rent', {
      timeout: navigationTimeout,
    });

    await page.waitForSelector('.floatingSearchContainer');

    await page.type('.formWrapper input', "Woodstock");

    await page.waitForSelector('.autocomplete-suggestions');

    const suggestionSelector = '.autocomplete-suggestion';
    await page.evaluate((selector) => {
      const suggestion = document.querySelector(selector);
      if (suggestion) {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        suggestion.dispatchEvent(clickEvent);
      }
    }, suggestionSelector);
    

    // Wait for the results container to load 
    await page.waitForSelector('.resultsItemsContainer', {
      timeout: navigationTimeout,
    });

    const pageLinks = (await page.$$eval('.pagination a.pageNumber', (pagination) => pagination.map((page) => page.getAttribute('href') || ''))).filter(url => url !== "#");

    const lastPageLink = pageLinks[pageLinks.length - 2];
    const pageNumber = parseInt(lastPageLink.slice(-2));

    let propertyURLs: string[] = [];
    const pages = await browser.newPage();

    for(let i = 1; i <= 3; i++)
    {
      if(i === 1)
      {

        await pages.goto("https://www.privateproperty.co.za/to-rent/western-cape/cape-town/cape-town-city-bowl/59", {
          timeout: navigationTimeout,
        });

        propertyURLs = propertyURLs.concat( await pages.$$eval('.resultsItemsContainer a.listingResult', (listings) =>
        listings.map((listing) => listing.getAttribute('href') || '')
        ));
      }

      else
      {
        await pages.goto('https://www.privateproperty.co.za/to-rent/western-cape/cape-town/cape-town-city-bowl/59?page=' + i.toString(), {
          timeout: navigationTimeout,
        });

        propertyURLs = propertyURLs.concat( await pages.$$eval('.resultsItemsContainer a.listingResult', (listings) =>
        listings.map((listing) => listing.getAttribute('href') || '')
        ));
      }


    }

  // Process each property page
  const propertyListings = await Promise.all(
    propertyURLs.map(async (url) => {
      // Open a new page for each property
      const propertyPage = await browser.newPage();
      await propertyPage.goto("https://www.privateproperty.co.za" +url, {
        timeout: navigationTimeout,
      });

      // Wait for the property page to load
      await propertyPage.waitForSelector('.contentWhite');

      // Extract the data we want
      const title = await propertyPage.$eval('.titleContainer h1', (titleElement) => titleElement.textContent?.trim() || '');
      const price = await propertyPage.$eval('.titleContainer h2 span.detailsPrice', (priceElement) => priceElement.textContent?.trim() || '');
      const description = await propertyPage.$$eval('.description p', (descriptionElement) => descriptionElement.map((description) => description.textContent?.trim() || ''));
      const location = await propertyPage.$eval('.previousPage span', (locationElement) => locationElement.textContent?.trim() || '');
      const attributeLabel = await propertyPage.$$eval('.attributeLabel', (attributeLabelElement) => attributeLabelElement.map((attributeLabel) => attributeLabel.textContent?.trim() || ''));
      const propAttrValue = await propertyPage.$$eval('.propAttrValue', (propAttrValueElement) => propAttrValueElement.map((propAttrValue) => propAttrValue.textContent?.trim() || ''));
      
      // Initialize variables for storing bedrooms, bathrooms, garages, and amenities 
      let bedrooms;
      let bathrooms;
      let garages;
      const amenities: string[] = [];

    

      // Check if the text content matches the desired value
      for (const attribute of attributeLabel) 
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
      }

      // Extract and process image URLs for the property
      const imageURLs = (await propertyPage.$$eval('.imageGrid a', (imagesElement) => imagesElement.map((image) => image.dataset['background']))).filter(url => url !== null && url !== undefined);
      
      // Modify image URLs to include "_dhd" before the file extension
      /*for (let i = 0; i < imageURLs.length; i++) {
        const lastDotIndex = imageURLs[i]?.lastIndexOf(".");
        if (lastDotIndex !== -1) 
        {
          imageURLs[i] = imageURLs[i]?.slice(0, lastDotIndex) + "_dhd" + imageURLs[i]?.slice(lastDotIndex);
        }
      }*/

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
        