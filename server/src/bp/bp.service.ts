import {Injectable} from '@nestjs/common';
import axios from 'axios';
import BP, {IBpRecord} from 'bp-api';

interface IOrderPayload {
  comment: string,
  status: string
}

@Injectable()
export class BpService {
  private readonly domain = 'very-test-address.bpium.ru';
  private readonly login = process.env.BP_LOGIN;
  private readonly password = process.env.BP_PASSWORD;

  private readonly VALUE_FIELD = 2;
  private readonly COMMENT_FIELD_ID = 3;

  private readonly bp = new BP(this.domain, this.login, this.password);
  private readonly messageUrl = 'https://test.bpium.ru/api/webrequest/request';

  private async getMessage(): Promise<any> {
    const response = await axios.get(this.messageUrl);
    return response.data?.value;
  }

  async changeRecordHandler(payload: any): Promise<void> {
    const {catalogId, recordId} = payload;

    if (!payload.values[this.VALUE_FIELD]) {
      return;
    }

    const message = await this.getMessage();

    if (message === undefined) {
      throw new Error('Value is undefined');
    }

    const response = await this.bp.patchRecord(catalogId, recordId, {
      [this.COMMENT_FIELD_ID]: message,
    });

    console.log('changeRecordHandler', response);
  }

  async createNewOrderRecord(payload: IOrderPayload, catalogId: string): Promise<IBpRecord> {
    const values = {
      '2': [payload.status.toString()],
      '3': payload.comment,
    }

    return await this.bp.postRecord(catalogId, values);
  }

  async createRecordHandler(payload: any, catalogId: string): Promise<void> {
    const comment = payload.values['3'];

    const values = {
      '2': new Date().toISOString(),
      '4': comment,
    };

    const fieldId = 3;
    const availableRecords = await this.bp.getAvailableRecords(catalogId, fieldId, {
      title: comment ?? '',
    });

    values['3'] = availableRecords.filter((record) => record.recordId === payload.recordId);

    const response = await this.bp.postRecord(catalogId, values);

    console.log('createRecordHandler', response);
  }

  async getAllRecords(categoryId: string) {
    const records = await this.bp.getAllRecords(categoryId);
    return records;
  }
}
