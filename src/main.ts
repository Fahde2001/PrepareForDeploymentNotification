import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer;

async function bootstrapServer() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors();
  await app.init();
  return createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context) => {
  console.log('Event: ', event);
  console.log('Context: ', context);
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  const result = proxy(cachedServer, event, context, 'PROMISE');
  console.log('Result: ', result);
  return result.promise;
};
