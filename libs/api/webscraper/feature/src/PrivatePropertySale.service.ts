import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';


@Injectable()
export class PrivatePropertySaleService {
  public async PrivatePropertySalescrape(location: string): Promise<any[]> {
    // Launch Puppeteer and open new page
    const browser = await puppeteer.launch({timeout: 0,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--single-process',
      '--no-zygote',
      // '--disable-features=site-per-process'
    ]});
    const page = await browser.newPage();
    console.log("Page created");
    //console.log(location);

    const navigationTimeout = 180000;

    // Go to target web page
    /*await page.goto('https://www.privateproperty.co.za/for-sale/western-cape/cape-town/cape-town-city-bowl/59', {
      timeout: navigationTimeout,
    });*/

    await page.goto('https://www.privateproperty.co.za/for-sale', {
      timeout: navigationTimeout,
    });

    console.log("Navigated");

    await page.waitForSelector('.floatingSearchContainer');

    console.log("Selector created");

    await page.type('.formWrapper input', location);

    const typingDelay = 1000; // 1 second (adjust as needed)
    await page.waitForTimeout(typingDelay)

    await page.waitForSelector('.autocomplete-suggestions');
    console.log("Selector found");

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

    // await page.waitForNavigation();

    //console.log(page.url());


    // Wait for the results container to load 
    await page.waitForSelector('.resultsContainer', {
      timeout: navigationTimeout,
    });

    console.log("Results created");

    const currentURL = await page.url();

    const pageLinks = (await page.$$eval('.pagination a.pageNumber', (pagination) => pagination.map((page) => page.getAttribute('href') || ''))).filter(url => url !== "#");

    console.log("Links created");

    const lastPageLink = pageLinks[pageLinks.length - 2];
    //const pageNumber = parseInt(lastPageLink.slice(-2));


    let propertyURLs: string[] = [];

    const pages = await browser.newPage();

    console.log("New Page");

    for(let i = 1; i <= 1; i++)
    {
      if(i === 1)
      {

        await pages.goto(currentURL, {
          timeout: navigationTimeout,
        });

        propertyURLs = propertyURLs.concat( await pages.$$eval('.resultsItemsContainer a.listingResult', (listings) =>
        listings.map((listing) => listing.getAttribute('href') || '')
        ));
      }

      else
      {
        await pages.goto(currentURL+'?page=' + i.toString(), {
          timeout: navigationTimeout,
        });

        propertyURLs = propertyURLs.concat( await pages.$$eval('.resultsItemsContainer a.listingResult', (listings) =>
        listings.map((listing) => listing.getAttribute('href') || '')
        ));
      }


    }

  // Process each property page
  console.log("Waiting to process...");
  // console.log(propertyURLs);
  propertyURLs = propertyURLs.slice(0,1);
  console.log(propertyURLs);
  const propertyListings = propertyURLs.map(async (url) => {
      // Open a new page for each property

      const propertyPage = await browser.newPage();
      // await pages.waitForNavigation();
      console.log("Property page created");
      try{
        await propertyPage.goto("https://www.privateproperty.co.za" +url, {
          timeout: navigationTimeout,
        });
      }catch(e){
        console.log(e);
      }

      // await propertyPage.goto("https://www.privateproperty.co.za" +url, {
      //   timeout: 0,
      // });
      await propertyPage.waitForNavigation({ waitUntil: 'domcontentloaded' });

      // await propertyPage.waitForNavigation({timeout: navigationTimeout});
      console.log("Navigated to listings");

      // Wait for the property page to load
      await propertyPage.waitForSelector('.contentWhite');

      console.log("Found selector");

      // Extract the data we want
      const title = await propertyPage.$eval('.titleContainer h1', (titleElement) => titleElement.textContent?.trim() || '');
      const price = await propertyPage.$eval('.titleContainer h2 span.detailsPrice', (priceElement) => priceElement.textContent?.trim() || '');
      const description = await propertyPage.$$eval('.description p', (descriptionElement) => descriptionElement.map((description) => description.textContent?.trim() || ''));
      const location = await propertyPage.$eval('.previousPage span', (locationElement) => locationElement.textContent?.trim() || '');
      const attributeLabel = await propertyPage.$$eval('.attributeLabel', (attributeLabelElement) => attributeLabelElement.map((attributeLabel) => attributeLabel.textContent?.trim() || ''));
      const propAttrValue = await propertyPage.$$eval('.propAttrValue', (propAttrValueElement) => propAttrValueElement.map((propAttrValue) => propAttrValue.textContent?.trim() || ''));
      
      console.log("Got info");

      const propertyURL = propertyPage.url();
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


      const propertyType = 'Sale';

    
      // Close the property page
      await propertyPage.close();
      console.log("Closed page");

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
        propertyType,
        propertyURL
      };
    }) as any[];

  console.log("Processed");

  // Close the browser
  await browser.close();

  const filteredPropertyListings = propertyListings.filter((property) => property.price !== "Sold" && property.price !== "POA");

  // Return the array of property listings
  return filteredPropertyListings;
}
}