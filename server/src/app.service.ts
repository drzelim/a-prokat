import { Injectable } from '@nestjs/common';
import { BpService } from './bp/bp.service';

@Injectable()
export class AppService {
  constructor(private readonly bpService: BpService) {}

  private readonly STOCK_ORDER_ID = '13';
  private readonly STOCK_CATALOG_ID = '14';
  private readonly Events = {
    UPDATE: 'record.updated',
    CREATE: 'record.created'
  }

  async recordHandler(body: any): Promise<void> {
    const event = body?.hook.event;

    if (event === this.Events.UPDATE) {
      await this.bpService.changeRecordHandler(body.payload);
    }

    if (event === this.Events.CREATE) {
      await this.bpService.createRecordHandler(body.payload, this.STOCK_CATALOG_ID);
    }
  }

  async getRecords() {
    return this.bpService.getAllRecords(this.STOCK_ORDER_ID);
  }

  async createNewOrderRecord(body: any) {
    await this.bpService.createNewOrderRecord(body.record, this.STOCK_ORDER_ID)
  }
}
