import { DynamicModule, HttpStatus, Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { HttpAdapterHost } from '@nestjs/core';
import { Express } from 'express';
import { readFileSync } from 'fs';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';

import { VUE_UNIVERSAL_OPTIONS } from './vue-universal.contants';
import { VueUniversalOptions } from './vue-universal-options.interface';

@Module({})
export class VueUniversalModule implements OnModuleInit {
  constructor(
    @Inject(VUE_UNIVERSAL_OPTIONS)
    private readonly vueOptions: VueUniversalOptions,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  static forRoot(options: VueUniversalOptions): DynamicModule {
    const context = options.context ? options.context : {};
    const placeholder = options.placeholder ? options.placeholder : 'vue';
    const renderPath = options.renderPath ? options.renderPath : '*';
    const rootStaticPath = options.rootStaticPath ? options.rootStaticPath : 'views';

    return {
      module: VueUniversalModule,
      providers: [
        {
          provide: VUE_UNIVERSAL_OPTIONS,
          useValue: { ...options, context, placeholder, renderPath, rootStaticPath },
        },
      ],
    };
  }

  async onModuleInit() {
    if (!this.httpAdapterHost) {
      return;
    }
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    if (!httpAdapter) {
      return;
    }
    const server: Express = httpAdapter.getInstance();
    server.get(this.vueOptions.renderPath, async (req, res) => {
      try {
        const app = await this.getBundle(req.url);
        const render = await this.getPage(app);
        res.status(HttpStatus.OK).send(render);
      } catch (error) {
        const err = new Error(error);
        Logger.error(err.message);
        res.status(HttpStatus.BAD_REQUEST).send({ status: HttpStatus.BAD_REQUEST, message: err.message });
      }
    });
  }

  private async getBundle(route: string): Promise<Vue> {
    const vue = loadPackage(this.vueOptions.bundlePath, 'Vue Bundle');
    Logger.log(route);
    try {
      const bundle = vue.bundle ? vue.bundle : vue.default;

      return bundle({ url: route });
    } catch (error) {
      const err = new Error(error);
      Logger.error(err.message);

      throw err;
    }
  }

  private getPage(app: Vue) {
    const template = readFileSync(this.vueOptions.templatePath, { encoding: 'utf-8' });
    const renderer = createRenderer({
      inject: true,
      template,
    });

    return new Promise((resolve, reject) => {
      renderer.renderToString(app, this.vueOptions.context, (err, html) => {
        if (err) {
          reject(err);
        }

        resolve(html);
      });
    });
  }
}
