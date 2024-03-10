import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface DBEntity {
  id?: string;
}

@Injectable()
export class DatabaseService<T extends DBEntity> {
  private recordMap: { [id: string]: T } = {};

  public create(record: Partial<T>) {
    const id = uuidv4();

    const newRecord = { ...record, id } as T;

    this.recordMap[id] = newRecord;

    return newRecord;
  }

  public findAll() {
    return Object.values(this.recordMap);
  }

  public findOne(id: string) {
    const record = this.recordMap[id];

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return record;
  }

  public update(id: string, record: Partial<T>) {
    const existingRecord = this.recordMap[id];

    if (!existingRecord) {
      throw new NotFoundException('Record not found');
    }

    this.recordMap[id] = { ...existingRecord, ...record };

    return this.recordMap[id];
  }

  public remove(id: string) {
    const record = this.recordMap[id];

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    delete this.recordMap[id];
  }
}
