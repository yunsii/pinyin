import { Quanpin } from '../Pinyin';
import { QuanpinSchemaConfig } from '.';

export const type = 'QuanPin';

export default {
  type,
  displayName: '全拼',
  map: Quanpin,
} as QuanpinSchemaConfig;
