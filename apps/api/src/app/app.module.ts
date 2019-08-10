import { Module } from '@nestjs/common';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VueUniversalModule } from './vue-universal/vue-universal.module';

const bundlePath = join(__dirname, 'server/main.server');
const templatePath = join(__dirname, 'views/index.html');

@Module({
  imports: [
    VueUniversalModule.forRoot({
      bundlePath,
      templatePath,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
