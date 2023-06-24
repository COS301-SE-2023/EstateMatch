import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';


@Injectable()
export class WebScraperService {
  public async scrape(): Promise<any[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //await page.goto('https://www.property24.com/for-sale/cape-town/western-cape/432');
    await page.goto('https://www.privateproperty.co.za/for-sale/western-cape/cape-town/cape-town-city-bowl/59');

    
    //await page.waitForSelector('.js_listingResultsContainer');
    await page.waitForSelector('.resultsItemsContainer');

    console.log('Scraping property listings from: ', page.url());

    
    const propertyURLs = await page.$$eval('.resultsItemsContainer a.listingResult', (listings) =>
    listings.map((listing) => listing.getAttribute('href') || '')
  );

  
  const propertyListings = await Promise.all(
    propertyURLs.map(async (url) => {
      console.log('Scraping property listing from: ', url);
      const propertyPage = await browser.newPage();
      await propertyPage.goto("https://www.privateproperty.co.za" +url);

      
      await propertyPage.waitForSelector('.contentWhite');

      //const imageURLs: string[]  = await propertyPage.$$eval('.js_lightboxImageWrapper', (imagesElement) => imagesElement.map((image) => image.getAttribute('data-image-url') || ''));
      const title = await propertyPage.$eval('.titleContainer h1', (titleElement) => titleElement.textContent?.trim() || '');
      const price = await propertyPage.$eval('.titleContainer h2 span.detailsPrice', (priceElement) => priceElement.textContent?.trim() || '');
      //const description = await propertyPage.$eval('.description p', (descriptionElement) => descriptionElement.textContent?.trim() || '');
      //const bedrooms = await propertyPage.$eval('li.p24_feaureDetails[title = "Bedrooms"] span ', (bedroomElement) => bedroomElement.textContent?.trim() || '');
      //const bathrooms = await propertyPage.$eval('.p24_feautureDetails[title = "Bathrooms"] span', (bathroomElement) => bathroomElement.textContent?.trim() || '');
      //const garages = await propertyPage.$eval('.p24_feautureDetails[title = "Parking spaces"] span', (garageElement) => garageElement.textContent?.trim() || '');


      await propertyPage.close();

      return {
        //imageURLs,
        title,
        price,
        //description,
        //bedrooms,
        //bathrooms,
        //garages,
        
      };
    })
  );

  await browser.close();

  return propertyListings;
}
}