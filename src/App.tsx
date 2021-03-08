import * as React from 'react';
import { useLocalStorageState } from 'ahooks';
import { Select, Button, Input } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

import { Registry, CharType, HanziCharConfig } from '@/core';
import { Hanzi } from '@/components';
import './schemes';
import './texts';
import styles from './App.module.less';

function App() {
  const schemaOptions = Registry.schema.getShemaOptions();
  const textOptions = Registry.text.getTextOptions();

  const [schemaType, setSchemaType] = useLocalStorageState('schema-type', schemaOptions?.[0]?.type);
  const [textKey, setTextKey] = useLocalStorageState('text-key', textOptions?.[0]?.key);
  const [index, setIndex] = useLocalStorageState('current-index', 0);
  const [input, setInput] = React.useState('');

  const textConfig = React.useMemo(() => {
    return Registry.text.getTextConfig(textKey!);
  }, [textKey]);

  const currentCharConfig = React.useMemo(() => {
    const text = textConfig?.text.filter((item) => item.type === CharType.Hanzi);
    return text?.[index! % text?.length] as HanziCharConfig;
  }, [textConfig, index]);

  const currentPinyin = React.useMemo(() => {
    if (currentCharConfig) {
      return Registry.schema.getPinyin(schemaType!, currentCharConfig.quanpin);
    }
  }, [currentCharConfig, schemaType]);

  React.useEffect(() => {
    if (input && input === currentPinyin) {
      setIndex((prevIndex) => prevIndex! + 1);
      setInput('');
    }
  }, [currentPinyin, input]);

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
              setIndex(0);
              setTextKey(value);
            }}
          />
          <Button
            onClick={() => {
              setIndex(0);
              setInput('');
            }}
            icon={<RedoOutlined />}
          />
        </Input.Group>
      </div>
    </div>
  );
}

export default App;
