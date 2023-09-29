import { Module } from "@nestjs/common";
import { WebScraperController } from "./webscraper.controller";
import { PrivatePropertySaleService } from "./PrivatePropertySale.service";
import { PrivatePropertyRentService } from "./PrivatePropertyRent.service";
import { RemaxSaleService } from "./RemaxSale.service";
import { RemaxRentService } from "./RemaxRent.service";
import { PropertiesService } from "@estate-match/api/properties/feature";
import { CqrsModule } from "@nestjs/cqrs";
import { ImageToTextService } from "@estate-match/api/ai/feature";
import { PreferenceModule as PreferenceDataAccessModule } from "@estate-match/api/prefrences/data-access";


@Module({
    imports: [CqrsModule, PreferenceDataAccessModule],
    controllers: [WebScraperController],
    providers: [PrivatePropertySaleService, PrivatePropertyRentService,RemaxSaleService,RemaxRentService, PropertiesService, ImageToTextService],
})
export class WebScraperModule {}