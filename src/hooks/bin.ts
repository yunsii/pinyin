import { useRequest } from 'ahooks'
import { message } from 'antd'

const BASE_URL = 'https://api.jsonbin.io/v3'

export interface BinRecord {
  name?: string
  progress?: {
    textKey: string
    schemaType: string
    inputTextIndex: number
    inputPinyin: string
  }
}

export interface Result {
  metadata: {
    collectionId: string
    createdAt: string
    id: string
    private: boolean
  }
  record: BinRecord
}

export function useBin() {
  return useRequest<Result, [string]>(
    async (theBinId) => {
      const result = await fetch(`${BASE_URL}/b/${theBinId}/latest`)
      return result.json()
    },
    {
      manual: true,
      onSuccess(data) {
        if (data?.record?.name) {
          message.success(`你好，${data?.record?.name} 😃`)
        } else {
          message.warn('数据异常，请稍候重试 ☹️')
        }
      },
      onError() {
        message.error('网络异常，请稍候重试 ☹️')
      },
    },
  )
}

export function useUpdateBin() {
  return useRequest<Result, [string, BinRecord]>(
    async (id, bin) => {
      const result = await fetch(`${BASE_URL}/b/${id}`, {
        method: 'PUT',
        body: JSON.stringify(bin),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return result.json()
    },
    {
      manual: true,
      onSuccess() {
        message.success(`已同步本地数据 😃`)
      },
      onError() {
        message.warn('同步失败，请稍后重试 ☹️')
      },
    },
  )
}
