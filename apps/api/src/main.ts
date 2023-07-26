// export * from '@estate-match/api/core/feature';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CoreModule  } from '@estate-match/api/core/feature';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env['PORT'] || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on port: ${port}`
  );
}

bootstrap();