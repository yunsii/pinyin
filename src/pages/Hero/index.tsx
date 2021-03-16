import React from 'react';
import { Select, Button, Input, Tooltip, Modal, Form, Typography, Drawer, List } from 'antd';
import {
  RedoOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  GithubOutlined,
  LoadingOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { Registry, CharType, HanziCharConfig } from '@/core';
import { Hanzi } from '@/components';
import './data';
import useProfileBin from './useProfileBin';
import styles from './index.module.less';
import { useBoolean } from 'ahooks';

const mouseEnterDelay = 0.5;

export default function Hero() {
  const schemaOptions = Registry.schema.getShemaOptions();
  const textOptions = Registry.text.getTextOptions();

  const [formRef] = Form.useForm();
  const {
    bin,
    onChangeBin,
    detailLoading,
    udpateLoading,
    onSignIn,
    onUpload,
    onDownload,
    onClearCache,
  } = useProfileBin({
    schemaType: schemaOptions?.[0]?.type,
    textKey: textOptions?.[0]?.key,
    inputTextIndex: 0,
    inputPinyin: '',
  });
  const [visible, setVisible] = React.useState(false);
  const [settingsVisible, { toggle: toggleSettingsVisible }] = useBoolean(false);

  const textConfig = React.useMemo(() => {
    return Registry.text.getTextConfig(bin.textKey);
  }, [bin.textKey]);

  const currentCharConfig = React.useMemo(() => {
    const text = textConfig?.text.filter((item) => item.type === CharType.Hanzi)!;
    const index = bin.inputTextIndex! % text?.length;
    return text?.[index] as HanziCharConfig;
  }, [textConfig, bin.inputTextIndex]);

  const currentPinyin = React.useMemo(() => {
    if (currentCharConfig) {
      return Registry.schema.getPinyin(bin.schemaType!, currentCharConfig.quanpin);
    }
  }, [currentCharConfig, bin.schemaType]);

  React.useEffect(() => {
    if (bin.inputPinyin && bin.inputPinyin === currentPinyin) {
      // onChangeBin 需要函数式更新状态，否则后者 inputPinyin 的变化会重置
      // inputTextIndex 的变化，导致无法切换到下一个字符。
      onChangeBin('inputTextIndex', bin.inputTextIndex + 1);
      onChangeBin('inputPinyin', '');
    }
  }, [currentPinyin, bin.inputPinyin, bin.inputTextIndex]);

  return (
    <div className={styles.app}>
      <div>
        <Hanzi
          char={currentCharConfig.char}
          original={currentPinyin}
          modified={bin.inputPinyin}
          onChange={(value) => onChangeBin('inputPinyin', value)}
        />
      </div>
      <div className={styles.menu}>
        <Input.Group compact>
          <Button icon={<SettingOutlined />} onClick={() => toggleSettingsVisible()} />
          <Select
            style={{
              width: 100,
            }}
            options={schemaOptions.map((item) => ({
              value: item.type,
              label: item.displayName,
            }))}
            placeholder='拼写方案'
            value={bin.schemaType}
            onChange={(value) => onChangeBin('schemaType', value)}
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
            value={bin.textKey}
            onChange={(value) => {
              onChangeBin('inputTextIndex', 0);
              onChangeBin('textKey', value);
            }}
          />
          <Tooltip overlay='重置本地输入状态' mouseEnterDelay={mouseEnterDelay}>
            <Button
              onClick={() => {
                onChangeBin('inputTextIndex', 0);
                onChangeBin('inputPinyin', '');
              }}
              icon={<RedoOutlined />}
            />
          </Tooltip>
          <Tooltip overlay='同步本地状态到云端' mouseEnterDelay={mouseEnterDelay}>
            <Button
              icon={udpateLoading ? <LoadingOutlined /> : <CloudUploadOutlined />}
              onClick={() => {
                onUpload(() => setVisible(true));
              }}
            />
          </Tooltip>
          <Tooltip overlay='同步云端状态到本地' mouseEnterDelay={mouseEnterDelay}>
            <Button
              icon={detailLoading ? <LoadingOutlined /> : <CloudDownloadOutlined />}
              onClick={() => {
                onDownload(() => {
                  setVisible(true);
                });
              }}
            />
          </Tooltip>
        </Input.Group>
      </div>
      <Modal
        width={480}
        title='同步设置'
        visible={visible}
        cancelText='取消'
        okText='确定'
        onCancel={() => setVisible(false)}
        onOk={() => {
          const values = formRef.getFieldsValue();
          onSignIn(values.binId, values.name, {
            onOk: () => setVisible(false),
          });
        }}
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
        <Typography.Paragraph type='secondary'>
          同步功能基于&nbsp;
          <a href='https://jsonbin.io/' target='_blank'>
            JSONbin
          </a>
          &nbsp; 实现，可自行注册并创建一个公开 BIN 后将 BIN_ID 贴于此处确认即可。
        </Typography.Paragraph>
        <Typography.Text type='secondary'>
          当然，如果不想注册的话，可邮箱
          <a href='mailto:yuns.xie@qq.com' target='_blank'>
            联系我
          </a>
          为你创建 BIN_ID。
        </Typography.Text>
      </Modal>
      <Drawer
        width={360}
        title={<Typography.Title level={4}>控制面板</Typography.Title>}
        visible={settingsVisible}
        onClose={() => toggleSettingsVisible()}
      >
        <List size='small' bordered className={styles.settingsList}>
          <List.Item onClick={onClearCache}>清除缓存</List.Item>
        </List>
        <Button
          type='primary'
          icon={<GithubOutlined />}
          className={styles.github}
          href='https://github.com/theprimone/pinyin'
          target='_blank'
        >
          Star
        </Button>
      </Drawer>
    </div>
  );
}
