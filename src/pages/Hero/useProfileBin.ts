import React from 'react'
import { message } from 'antd'
import { useLocalStorageState } from 'ahooks'
import { get } from 'lodash-es'

import type { BinRecord } from '@/hooks/bin'

import { useBin, useUpdateBin } from '@/hooks'

export default function useProfileBin(defaultProgress: BinRecord['progress']) {
  const [binId, setBinId] = useLocalStorageState<string | void>('bin-id')
  const [bin, setBin] = useLocalStorageState<BinRecord | void>('bin', {
    defaultValue: {
      progress: defaultProgress,
    },
  })

  const processedBin = React.useMemo(() => {
    return {
      name: bin?.name,
      schemaType: (bin?.progress || defaultProgress)?.schemaType,
      textKey: (bin?.progress || defaultProgress)?.textKey,
      inputTextIndex: (bin?.progress || defaultProgress)?.inputTextIndex,
      inputPinyin: (bin?.progress || defaultProgress)?.inputPinyin,
    }
  }, [bin])

  const onChangeBin = (nextBin: Partial<typeof processedBin>) => {
    const { name: nextName, ...nextProgress } = nextBin
    setBin((prevBin) => {
      const prevProgress = get(prevBin, 'progress', defaultProgress)
      return {
        name: nextName || prevBin?.name,
        progress: {
          ...prevProgress,
          ...nextProgress,
        },
      }
    })
  }

  const { runAsync: runDetail, loading: detailLoading } = useBin()
  const { runAsync: runUpdate, loading: updateLoading } = useUpdateBin()

  const download = async (theBinId: string) => {
    return await runDetail(theBinId)
  }

  const upload = (_binId: string, name: string) => {
    return runUpdate(_binId, {
      name,
      progress: bin?.progress,
    })
  }

  React.useEffect(() => {
    if (binId && !bin) {
      download(binId).then((result) => setBin(result.record))
    }
    if (bin && bin.name) {
      message.success(`你好，${bin.name} 😃`)
    }
  }, [])

  const onSignIn = async (
    theBinId: string,
    name: string,
    options?: {
      onOk?: () => void
    },
  ) => {
    const data = await download(theBinId)
    if (data?.record?.name) {
      setBinId(theBinId)
      setBin(data.record)
      options?.onOk?.()
      return
    }

    try {
      await upload(theBinId, name)
      setBinId(theBinId)
      setBin({
        name,
        progress: bin?.progress,
      })
      options?.onOk?.()
    } catch (error) {
      message.warn('初始化数据失败，请稍后重试 😢')
    }
  }

  const onUpload = (fallback?: () => void) => {
    if (binId && bin?.name) {
      upload(binId, bin.name)
      return
    }
    fallback?.()
  }

  const onDownload = (fallback?: () => void) => {
    if (binId) {
      download(binId).then((result) => setBin(result.record))
      return
    }
    fallback?.()
  }

  const onClearCache = () => {
    setBin()
    setBinId()
    message.success('已清空缓存')
  }

  return {
    binId,
    setBinId,
    bin: processedBin,
    onChangeBin,
    detailLoading,
    updateLoading,
    onSignIn,
    onUpload,
    onDownload,
    onClearCache,
  }
}
