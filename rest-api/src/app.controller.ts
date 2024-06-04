import { Controller, Get } from '@nestjs/common';
import { AppService, IInfo } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IInfo {
    return this.appService.getHello();
  }
}
