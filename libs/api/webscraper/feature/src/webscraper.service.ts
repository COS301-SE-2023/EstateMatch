import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { NestCrawlerService } from 'nest-crawler';


@Injectable()
export class WebScraperService {
    constructor(
        private readonly crawler: NestCrawlerService,
      ) {}
    
      // scraping the specific page
      public async scrape(): Promise<void> {
        interface ExampleCom {
          title: string;
          info: string;
          content: string;
        }
    
        const data: ExampleCom = await this.crawler.fetch({
          target: 'https://www.property24.com/for-sale/cape-town/western-cape/432',
          fetch: {
            title: 'h1',
            info: {
              selector: 'p > a',
              attr: 'href',
            },
            content: {
              selector: '.content',
              how: 'html',
            },
          },
        });
    
        console.log(data);
        
      }
    
      // crawling multi pages is also supported
      public async crawl(): Promise<void> {
        interface HackerNewsPage {
          title: string;
        }
    
        const pages: HackerNewsPage[] = await this.crawler.fetch({
          target: {
            url: 'https://www.property24.com',
            iterator: {
              selector: 'span.age > a',
              convert: (x: string) => `https://news.ycombinator.com/${x}`,
            },
          },
          fetch: (data: any, index: number, url: string) => ({
            title: '.title > a',
          }),
        });
    
        console.log(pages);
     
      }
}