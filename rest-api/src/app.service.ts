import { Injectable } from '@nestjs/common';

export interface IInfo {
  name: string;
  version: string;
  description: string;
  main: string;
}

@Injectable()
export class AppService {
  getHello(): IInfo {
    return {
      name: 'rest-api',
      version: '1.0.0',
      description: 'REST API for SoftUni Forum',
      main: 'main.ts',
    };
  }
}
