import { Controller, Get } from "@nestjs/common";
import { WebScraperService } from "./webscraper.service";

@Controller()
export class WebScraperController {
    constructor(private readonly webscraperService: WebScraperService) {}
    
    @Get()
    webscraperController() {
        return this.webscraperService.scrape();
    }
}
