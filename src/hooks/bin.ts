import { useRequest } from 'ahooks';
import { message } from 'antd';

const BASE_URL = 'https://api.jsonbin.io/v3';

export interface BinRecord {
  name?: string;
  progress: {
    inputPinyin: string;
    inputTextIndex: number;
    schemaType: string;
    textKey: string;
  };
}

export interface Result {
  metadata: {
    collectionId: string;
    createdAt: string;
    id: string;
    private: boolean;
  };
  record: BinRecord;
}

export function useBin() {
  return useRequest<Result, [string], BinRecord, BinRecord>((theBinId) => `${BASE_URL}/b/${theBinId}/latest`, {
    manual: true,
    onSuccess(data) {
      if (data?.name) {
        message.success(`你好，${data.name} 😃`);
      } else {
        message.warn('数据异常，请稍候重试 ☹️');
      }
    },
    onError() {
      message.error('网络异常，请稍候重试 ☹️');
    },
    formatResult(result) {
      return result?.record;
    },
  });
}

export function useUpdateBin() {
  return useRequest<Result, [string, BinRecord]>(
    (id, bin) => ({
      url: `${BASE_URL}/b/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bin),
    }),
    {
      manual: true,
      onSuccess() {
        message.success(`已同步本地数据 😃`);
      },
      onError() {
        message.warn('同步失败，请稍后重试 ☹️');
      },
    }
  );
}
