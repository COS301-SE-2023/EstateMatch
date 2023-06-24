import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { NestCrawlerService } from 'nest-crawler';


@Injectable()
export class WebScraperService {
  public async scrape(): Promise<any[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.property24.com/for-sale/cape-town/western-cape/432');

    
    await page.waitForSelector('.js_listingResultsContainer');

    
    const propertyURLs = await page.$$eval('.js_psuedoLinkHref', (listings) =>
    listings.map((listing) => listing.getAttribute('href') || '')
  );

  
  const propertyListings = await Promise.all(
    propertyURLs.map(async (url) => {
      const propertyPage = await browser.newPage();
      await propertyPage.goto(url);

      
      await propertyPage.waitForSelector('.p24_listing');

      const imageURLs: string[]  = await propertyPage.$$eval('.js_lightboxImageWrapper', (imagesElement) => imagesElement.map((image) => image.getAttribute('data-image-url') || ''));
      const title = await propertyPage.$eval('.p24_mBM h1', (titleElement) => titleElement.textContent?.trim() || '');
      const price = await propertyPage.$eval('.p24_price', (priceElement) => priceElement.textContent?.trim() || '');
      const description = await propertyPage.$eval('.js_expandedText p', (descriptionElement) => descriptionElement.textContent?.trim() || '');
      const bedrooms = await propertyPage.$eval('.p24_feautureDetails[title = "Bedrooms"] span ', (bedroomElement) => bedroomElement.textContent?.trim() || '');
      const bathrooms = await propertyPage.$eval('.p24_feautureDetails[title = "Bathrooms"] span', (bathroomElement) => bathroomElement.textContent?.trim() || '');
      const garages = await propertyPage.$eval('.p24_feautureDetails[title = "Parking spaces"] span', (garageElement) => garageElement.textContent?.trim() || '');


      await propertyPage.close();

      return {
        imageURLs,
        title,
        price,
        description,
        bedrooms,
        bathrooms,
        garages,
        
      };
    })
  );

  await browser.close();

  return propertyListings;
}
}