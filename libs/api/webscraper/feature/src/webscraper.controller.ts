import { Controller, Get, Post, Body } from "@nestjs/common";
import { PrivatePropertySaleService } from "./PrivatePropertySale.service";
import { PrivatePropertyRentService } from "./PrivatePropertyRent.service";
import { RemaxSaleService } from "./RemaxSale.service";
import { RemaxRentService } from "./RemaxRent.service";
import { PropertiesService } from "@estate-match/api/properties/feature";
import { ICreatePropertyRequest, IProperty } from "@estate-match/api/properties/util";

@Controller()
export class WebScraperController {
    constructor(private readonly PrivatePropertySaleService: PrivatePropertySaleService,
      private readonly PrivatePropertyRentService: PrivatePropertyRentService,
      private readonly RemaxSaleService: RemaxSaleService,
      private readonly RemaxRentService: RemaxRentService,
      private readonly propertyService: PropertiesService
      ) {}
    
    @Post("/PrivatePropertySaleScraper")
    async getScrapedPrivatePropertySalesProperties(@Body() location: string) {
        const properties = await this.PrivatePropertySaleService.PrivatePropertySalescrape(location);
      
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

            //  //user specific fields
            //  userId: properties[i].userId,
            //  username: properties[i].username,
            //  seen : properties[i].seen,

            user : properties[i].user
        }
          const request: ICreatePropertyRequest = {
            property: property
          };
          // console.log(request);
          this.propertyService.createProperty(request);
        }
        
        return properties;
      }

    @Post("/PrivatePropertyRentScraper")
    async getScrapedPrivatePropertiesRentProperties(@Body() location: string) {
      const properties = await this.PrivatePropertyRentService.PrivatePropertyRentscrape(location);
      
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

          //  //user specific fields
          //  userId: properties[i].userId,
          //  username: properties[i].username,
          //  seen : properties[i].seen,

          user : properties[i].user
      }
        const request: ICreatePropertyRequest = {
          property: property
        };

        this.propertyService.createProperty(request);
      }
      
      return properties;
    }

    @Post("/RemaxSaleScraper")
    async getScrapedRemaxSalesProperties(@Body() location: string) {
      const properties = await this.RemaxSaleService.RemaxSalescrape(location);

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

          //  //user specific fields
          //  userId: properties[i].userId,
          //  username: properties[i].username,
          //  seen : properties[i].seen,

          user : properties[i].user
      }
        const request: ICreatePropertyRequest = {
          property: property
        };

        this.propertyService.createProperty(request);
      }
      
      return properties;
    }

    @Post("/RemaxRentScraper")
    async getScrapedRemaxRentProperties(@Body() location: string) {
        const properties = await this.RemaxRentService.RemaxRentscrape(location);
      
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

            // //user specific fields
            // userId: properties[i].userId,
            // username: properties[i].username,
            // seen : properties[i].seen,

            user : properties[i].user
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
