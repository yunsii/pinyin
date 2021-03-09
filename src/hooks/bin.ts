import { useRequest } from 'ahooks';
import { message } from 'antd';

const BASE_URL = 'https://api.jsonbin.io/v3';

export interface Data {
  name: string;
  progress: {
    'input-pinyin': string;
    'input-text-index': number;
    'schema-type': string;
    'text-key': string;
  };
}

export interface Result {
  metadata: {
    collectionId: string;
    createdAt: string;
    id: string;
    private: boolean;
  };
  record: Data;
}

export function useBin() {
  return useRequest<Result, [string], Data, Data>((theBinId) => `${BASE_URL}/b/${theBinId}/latest`, {
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
  return useRequest<Result, [string, Data]>(
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
