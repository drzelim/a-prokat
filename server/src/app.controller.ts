import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post('a-prokat')
  async handleRequest(@Body() body: any): Promise<{ result: boolean }> {
    try {
      console.log(body)
      await this.appService.recordHandler(body);
    } catch (err) {
      console.log(err);
    }

    return {result: true};
  }

  @Get('orders')
  async getRecords() {
    try {
      return await this.appService.getRecords();
    } catch (err) {
      console.error(err);
      return {"statusCode": 500, error: err.message};
    }
  }

  @Put('orders')
  async newRecord(@Body() body: any) {
    try {
      await this.appService.createNewOrderRecord(body);
      return {result: true};
    } catch (err) {
      console.error(err)
      return {"statusCode": 500, error: err.message};
    }
  }
}
