import * as React from 'react';
import { useLocalStorageState } from 'ahooks';
import { Select, Button, Input, Tooltip, Modal, Form, Typography, message } from 'antd';
import {
  RedoOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  GithubOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { Registry, CharType, HanziCharConfig } from '@/core';
import { Hanzi } from '@/components';
import { useBin, useUpdateBin } from '@/hooks';
import './schemes';
import './texts';
import styles from './App.module.less';

const mouseEnterDelay = 0.5;

function App() {
  const schemaOptions = Registry.schema.getShemaOptions();
  const textOptions = Registry.text.getTextOptions();

  const [formRef] = Form.useForm();
  const [name, setName] = useLocalStorageState<string>('name');
  const [binId, setBinId] = useLocalStorageState<string>('bin-id');
  const [schemaType, setSchemaType] = useLocalStorageState('schema-type', schemaOptions?.[0]?.type);
  const [textKey, setTextKey] = useLocalStorageState('text-key', textOptions?.[0]?.key);
  const [textIndex, setTextIndex] = useLocalStorageState('current-index', 0);
  const [input, setInput] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const { run: runDetail, loading: detailLoading } = useBin();
  const { run: runUpdate, loading: udpateLoading } = useUpdateBin();

  const sync = async (theBinId: string) => {
    if (theBinId) {
      const result = await runDetail(theBinId);
      setSchemaType(result['progress']['schema-type']);
      setTextKey(result['progress']['text-key']);
      setTextIndex(result['progress']['input-text-index']);
      setInput(result['progress']['input-pinyin']);
      return result;
    }
  };

  const upload = (theBinId: string, name: string) => {
    return runUpdate(theBinId, {
      name,
      progress: {
        'schema-type': schemaType || '',
        'text-key': textKey || '',
        'input-text-index': textIndex || 0,
        'input-pinyin': input,
      },
    });
  };

  const textConfig = React.useMemo(() => {
    return Registry.text.getTextConfig(textKey!);
  }, [textKey]);

  const currentCharConfig = React.useMemo(() => {
    const text = textConfig?.text.filter((item) => item.type === CharType.Hanzi);
    return text?.[textIndex! % text?.length] as HanziCharConfig;
  }, [textConfig, textIndex]);

  const currentPinyin = React.useMemo(() => {
    if (currentCharConfig) {
      return Registry.schema.getPinyin(schemaType!, currentCharConfig.quanpin);
    }
  }, [currentCharConfig, schemaType]);

  React.useEffect(() => {
    if (input && input === currentPinyin) {
      setTextIndex((prevTextIndex) => prevTextIndex! + 1);
      setInput('');
    }
  }, [currentPinyin, input]);

  React.useEffect(() => {
    if (binId) {
      sync(binId);
    }
  }, []);

  const handleSignIn = async () => {
    const data = await sync(formRef.getFieldValue('binId'));
    if (data?.name) {
      setBinId(formRef.getFieldValue('binId'));
      setVisible(false);
      return;
    }

    try {
      await upload(formRef.getFieldValue('binId'), formRef.getFieldValue('name'));
      setBinId(formRef.getFieldValue('binId'));
      setName(formRef.getFieldValue('name'));
      setVisible(false);
    } catch (error) {
      message.warn('初始化数据失败，请稍后重试 ☹️');
    }
  };

  const handleUpload = () => {
    if (binId && name) {
      upload(binId, name);
      return;
    }
    setVisible(true);
  };

  const handleDownload = () => {
    if (binId) {
      sync(binId);
      return;
    }
    setVisible(true);
  };

  return (
    <div className={styles.app}>
      <div>
        <Hanzi
          char={currentCharConfig.char}
          original={currentPinyin}
          modified={input}
          onChange={(value) => setInput(value)}
        />
      </div>
      <div className={styles.menu}>
        <Input.Group compact>
          <Button icon={<GithubOutlined />} href='https://github.com/theprimone/pinyin' target='_blank' />
          <Select
            style={{
              width: 100,
            }}
            options={schemaOptions.map((item) => ({
              value: item.type,
              label: item.displayName,
            }))}
            placeholder='拼写方案'
            value={schemaType}
            onChange={(value) => setSchemaType(value)}
          />
          <Select
            style={{
              width: 130,
            }}
            options={textOptions.map((item) => ({
              value: item.key,
              label: item.title,
            }))}
            placeholder='拼写模板'
            value={textKey}
            onChange={(value) => {
              setTextIndex(0);
              setTextKey(value);
            }}
          />
          <Tooltip overlay='重置本地输入状态' mouseEnterDelay={mouseEnterDelay}>
            <Button
              onClick={() => {
                setTextIndex(0);
                setInput('');
              }}
              icon={<RedoOutlined />}
            />
          </Tooltip>
          <Tooltip overlay='同步本地状态到云端' mouseEnterDelay={mouseEnterDelay}>
            <Button icon={udpateLoading ? <LoadingOutlined /> : <CloudUploadOutlined />} onClick={handleUpload} />
          </Tooltip>
          <Tooltip overlay='同步云端状态到本地' mouseEnterDelay={mouseEnterDelay}>
            <Button icon={detailLoading ? <LoadingOutlined /> : <CloudDownloadOutlined />} onClick={handleDownload} />
          </Tooltip>
        </Input.Group>
      </div>
      <Modal
        width={480}
        title='同步设置'
        visible={visible}
        cancelText='取消'
        okText='确定'
        onOk={handleSignIn}
        destroyOnClose
      >
        <Form form={formRef}>
          <Form.Item name='binId' label='BIN_ID'>
            <Input />
          </Form.Item>
          <Form.Item
            name='name'
            label='用户名'
            extra={
              <Typography.Text type='secondary'>默认使用云端用户名，如果没有用户名会根据当前值创建。</Typography.Text>
            }
          >
            <Input />
          </Form.Item>
        </Form>
        <Typography.Text type='secondary'>
          同步功能基于&nbsp;
          <a href='https://jsonbin.io/' target='_blank'>
            JSONbin
          </a>
          &nbsp; 实现，可自行注册并创建一个公开 BIN 后将 BIN_ID 贴于此处确认即可。
        </Typography.Text>
      </Modal>
    </div>
  );
}

export default App;
