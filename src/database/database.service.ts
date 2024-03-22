import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface DBEntity {
  id?: string;
}

@Injectable()
export class DatabaseService<T extends DBEntity> {
  private recordMap: { [id: string]: T } = {};

  public create(record: Partial<T>) {
    const id = uuidv4();

    const newRecord = { id, ...record } as T;

    this.recordMap[id] = newRecord;

    return newRecord;
  }

  public findAll() {
    return Object.values(this.recordMap);
  }

  public findOne(id: string) {
    return this.recordMap[id];
  }

  public update(id: string, record: Partial<T>) {
    this.recordMap[id] = { ...this.recordMap[id], ...record };

    return this.recordMap[id];
  }

  public remove(id: string) {
    delete this.recordMap[id];
  }
}
