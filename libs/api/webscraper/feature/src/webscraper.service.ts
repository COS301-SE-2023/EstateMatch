import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';


@Injectable()
export class WebScraperService {
  public async scrape(): Promise<any[]> {
    // Launch Puppeteer and open new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //await page.goto('https://www.property24.com/for-sale/cape-town/western-cape/432');

    // Go to target web page
    await page.goto('https://www.privateproperty.co.za/for-sale/western-cape/cape-town/cape-town-city-bowl/59');

    
    //await page.waitForSelector('.js_listingResultsContainer');

    // Wait for the results container to load 
    await page.waitForSelector('.resultsItemsContainer');

    // Get the URLs of the properties
    const propertyURLs = await page.$$eval('.resultsItemsContainer a.listingResult', (listings) =>
    listings.map((listing) => listing.getAttribute('href') || '')
  );

  // Process each property page
  const propertyListings = await Promise.all(
    propertyURLs.map(async (url) => {
      const propertyPage = await browser.newPage();
      await propertyPage.goto("https://www.privateproperty.co.za" +url);

      
      await propertyPage.waitForSelector('.contentWhite');

      const title = await propertyPage.$eval('.titleContainer h1', (titleElement) => titleElement.textContent?.trim() || '');
      const price = await propertyPage.$eval('.titleContainer h2 span.detailsPrice', (priceElement) => priceElement.textContent?.trim() || '');
      const description = await propertyPage.$$eval('.description p', (descriptionElement) => descriptionElement.map((description) => description.textContent?.trim() || ''));
      const location = await propertyPage.$eval('.previousPage span', (locationElement) => locationElement.textContent?.trim() || '');
      const attributeLabel = await propertyPage.$$eval('.attributeLabel', (attributeLabelElement) => attributeLabelElement.map((attributeLabel) => attributeLabel.textContent?.trim() || ''));
      const propAttrValue = await propertyPage.$$eval('.propAttrValue', (propAttrValueElement) => propAttrValueElement.map((propAttrValue) => propAttrValue.textContent?.trim() || ''));
    
      var bedrooms;
      var bathrooms;
      var garages;
      var amenities: string[] = [];

    

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


      const imageURLs = (await propertyPage.$$eval('.imageGrid a', (imagesElement) => imagesElement.map((image) => image.dataset['background']))).filter(url => url !== null && url !== undefined);

      for (let i = 0; i < imageURLs.length; i++) {
        const lastDotIndex = imageURLs[i]?.lastIndexOf(".");
        if (lastDotIndex !== -1) 
        {
          imageURLs[i] = imageURLs[i]?.slice(0, lastDotIndex) + "_dhd" + imageURLs[i]?.slice(lastDotIndex);
        }
      }
    

      await propertyPage.close();

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

  await browser.close();

  return propertyListings;
}
}