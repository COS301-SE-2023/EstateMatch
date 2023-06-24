import { Controller, Get } from "@nestjs/common";
import { WebScraperService } from "./webscraper.service";

@Controller()
export class WebScraperController {
    constructor(private readonly webscraperService: WebScraperService) {}
    
    @Get("/scraper")
    async getScrapedProperties() {
        const properties = await this.webscraperService.scrape();
        return properties;
      }
}
