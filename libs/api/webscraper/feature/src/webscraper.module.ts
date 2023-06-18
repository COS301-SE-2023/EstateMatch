import { Module } from "@nestjs/common";
import { WebScraperController } from "./webscraper.controller";
import { WebScraperService } from "./webscraper.service";
import { NestCrawlerModule } from 'nest-crawler';

@Module({
    controllers: [WebScraperController],
    providers: [WebScraperService],
    imports: [NestCrawlerModule]
})
export class WebScraperModule {}