import * as React from 'react';
import { message } from 'antd';
import { useLocalStorageState } from 'ahooks';

import { BinHooks } from '@/hooks';
import { BinRecord } from '@/hooks/bin';

export default function useProfileBin(defaultProgress: BinRecord['progress']) {
  const [binId, setBinId] = useLocalStorageState<string>('bin-id');
  const [bin, setBin] = useLocalStorageState<BinRecord>('bin', {
    progress: defaultProgress,
  });

  const processedBin = React.useMemo(() => {
    return {
      name: bin?.name,
      schemaType: (bin?.progress || defaultProgress).schemaType,
      textKey: (bin?.progress || defaultProgress).textKey,
      inputTextIndex: (bin?.progress || defaultProgress).inputTextIndex,
      inputPinyin: (bin?.progress || defaultProgress).inputPinyin,
    };
  }, [bin]);

  const onChangeBin = (name: keyof typeof processedBin, value: any) => {
    if (name === 'name') {
      setBin((prevBin) => ({
        ...prevBin!,
        [name]: value,
      }));
    } else {
      setBin((prevBin) => ({
        ...prevBin!,
        progress: {
          ...prevBin?.progress!,
          [name]: value,
        },
      }));
    }
  };

  const { run: runDetail, loading: detailLoading } = BinHooks.useBin();
  const { run: runUpdate, loading: udpateLoading } = BinHooks.useUpdateBin();

  const download = async (theBinId: string) => {
    return await runDetail(theBinId);
  };

  const upload = (theBinId: string, name: string) => {
    return runUpdate(theBinId, {
      name,
      progress: bin?.progress!,
    });
  };

  React.useEffect(() => {
    if (binId && !bin) {
      download(binId).then(setBin);
    }
    if (bin && bin.name) {
      message.success(`你好，${bin.name} 😃`);
    }
  }, []);

  const onSignIn = async (
    theBinId: string,
    name: string,
    options?: {
      onOk?: () => void;
    }
  ) => {
    const data = await download(theBinId);
    if (data?.name) {
      setBinId(theBinId);
      setBin(data);
      options?.onOk?.();
      return;
    }

    try {
      await upload(theBinId, name);
      setBinId(theBinId);
      setBin({
        name,
        progress: bin?.progress!,
      });
      options?.onOk?.();
    } catch (error) {
      message.warn('初始化数据失败，请稍后重试 ☹️');
    }
  };

  const onUpload = (fallback?: () => void) => {
    if (binId && bin?.name) {
      upload(binId, bin.name);
      return;
    }
    fallback?.();
  };

  const onDownload = (fallback?: () => void) => {
    if (binId) {
      download(binId).then(setBin);
      return;
    }
    fallback?.();
  };

  const onClearCache = () => {
    setBin(undefined);
    setBinId(undefined);
    message.success('已清空缓存');
  };

  return {
    binId,
    setBinId,
    bin: processedBin,
    onChangeBin,
    detailLoading,
    udpateLoading,
    onSignIn,
    onUpload,
    onDownload,
    onClearCache,
  };
}
