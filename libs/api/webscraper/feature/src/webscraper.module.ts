import { Module } from "@nestjs/common";
import { WebScraperController } from "./webscraper.controller";
import { WebScraperService } from "./webscraper.service";
import { PropertiesService } from "@estate-match/api/properties/feature";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
    imports: [CqrsModule],
    controllers: [WebScraperController],
    providers: [WebScraperService, PropertiesService],
})
export class WebScraperModule {}