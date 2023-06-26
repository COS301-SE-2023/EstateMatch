import { Controller, Get } from "@nestjs/common";
import { WebScraperService } from "./webscraper.service";
import { PropertiesService } from "@estate-match/api/properties/feature";
import { ICreatePropertyRequest, IProperty } from "@estate-match/api/properties/util";

@Controller()
export class WebScraperController {
    constructor(private readonly webscraperService: WebScraperService,
      private readonly propertyService: PropertiesService
      ) {}
    
    @Get("/scraper")
    async getScrapedProperties() {
        const properties = await this.webscraperService.scrape();
        // properties.forEach(property => {
        
        
        // });
        for(let i = 0; i < properties.length; i++){
          const property: IProperty = {
            title: properties[i].title,
            price: parseInt(properties[i].price.replace(/\s/g, "")),
            bedrooms: properties[i].bedrooms,
            bathrooms: properties[i].bathrooms,
            garages: properties[i].garages,
            location: properties[i].location,
            amenities: properties[i].amenities,
            images: properties[i].imageURLs,
        }
          const request: ICreatePropertyRequest = {
            property: property
          };
          // console.log(request);
          this.propertyService.createProperty(request);
        }
        
        return properties;
      }
}
