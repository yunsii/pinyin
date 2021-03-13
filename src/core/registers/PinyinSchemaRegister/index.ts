import { Quanpin, Shuangpin, ZeroShengmu, ShengmuList } from '../../Pinyin';
import quanPinSchema, { type as quanpinType } from './Quanpin';

export interface BaseSchemaConfig {
  type: string;
  displayName: string;
}

export interface QuanpinSchemaConfig extends BaseSchemaConfig {
  map: {
    [key in Quanpin]: string;
  };
}

export interface ShuangpinSchemaConfig extends BaseSchemaConfig {
  /** 双拼通用编码映射 */
  map: {
    [key in Shuangpin]: string;
  };
  /** 双拼零声母编码映射 */
  patchMap: {
    [key in ZeroShengmu]: string;
  };
}

export default class PinyinSchemaRegister {
  public quanPinSchema = quanPinSchema;

  public shuangPinSchemas: ShuangpinSchemaConfig[] = [];

  static getShengmu(quanpin: string) {
    const head2Quanpin = quanpin.slice(0, 2);
    if (ShengmuList.includes(head2Quanpin as any)) {
      return head2Quanpin;
    }
    if (ShengmuList.includes(quanpin.charAt(0) as any)) {
      return quanpin.charAt(0);
    }
    return undefined;
  }

  public getPinyin(schemaType: string, quanpin: string) {
    if (schemaType === quanpinType) {
      return quanpin;
    }
    const schema = this.getShuangPinSchema(schemaType)!;
    const shengmu = PinyinSchemaRegister.getShengmu(quanpin);
    if (shengmu) {
      return [schema.map[shengmu as Shuangpin], schema.map[quanpin.replace(shengmu, '') as Shuangpin]].join('');
    }
    return schema.patchMap[quanpin as ZeroShengmu];
  }

  public register(schema: ShuangpinSchemaConfig) {
    if (!schema || !schema.type) return;
    if (this.shuangPinSchemas.some(({ type }) => type === schema.type)) {
      return;
    }
    this.shuangPinSchemas.push(schema);
  }

  public getQuanPinSchema() {
    return this.quanPinSchema;
  }

  public getShuangPinSchema(schemaType: string) {
    return this.shuangPinSchemas.find(({ type }) => type === schemaType);
  }

  public getShemaOptions() {
    return [
      { type: this.quanPinSchema.type, displayName: this.quanPinSchema.displayName },
      ...this.shuangPinSchemas.map((item) => {
        return {
          type: item.type,
          displayName: item.displayName,
        };
      }),
    ];
  }
}
