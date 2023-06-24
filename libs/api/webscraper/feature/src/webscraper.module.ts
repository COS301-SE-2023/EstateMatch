import { Module } from "@nestjs/common";
import { WebScraperController } from "./webscraper.controller";
import { WebScraperService } from "./webscraper.service";

@Module({
    controllers: [WebScraperController],
    providers: [WebScraperService],
})
export class WebScraperModule {}