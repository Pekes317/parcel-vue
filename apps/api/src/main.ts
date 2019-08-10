import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { https } from 'firebase-functions';
import { join } from 'path';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const express = new ExpressAdapter();

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, express);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  express.useStaticAssets(join(__dirname, 'views'), {});
  if (environment.production) {
    app.init();
  } else {
    const port = process.env.port || 3333;
    await app.listen(port, () => {
      Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    });
  }
};

bootstrap();
export const server = https.onRequest(express.getInstance());
