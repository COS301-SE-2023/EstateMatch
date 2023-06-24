import { Controller, Get } from "@nestjs/common";
import { WebScraperService } from "./webscraper.service";

@Controller()
export class WebScraperController {
    constructor(private readonly webscraperService: WebScraperService) {}
    
    @Get()
    async getScrapedProperties() {
        const properties = await this.webscraperService.scrape();
        return properties;
      }
}
