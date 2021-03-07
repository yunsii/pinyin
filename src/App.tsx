import * as React from 'react';
import { useLocalStorageState } from 'ahooks';

import { Registry, CharType, HanziCharConfig } from '@/core';
import { Hanzi } from '@/components';
import './schemes/XianHe';
import './texts/HelloWorld';
import './texts/Saying';
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
      <div className={styles.menu}>
        输入方式
        <select value={schemaType} onChange={(event) => setSchemaType(event.target.value)}>
          {schemaOptions.map((item) => {
            return (
              <option key={item.type} value={item.type}>
                {item.displayName}
              </option>
            );
          })}
        </select>
        输入模板
        <select
          value={textKey}
          onChange={(event) => {
            setIndex(0);
            setTextKey(event.target.value);
          }}
        >
          {textOptions.map((item) => {
            return (
              <option key={item.key} value={item.key}>
                {item.title}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => {
            setIndex(0);
            setInput('');
          }}
        >
          reset
        </button>
      </div>
      <div>
        <Hanzi
          char={currentCharConfig.char}
          original={currentPinyin}
          modified={input}
          onChange={(value) => setInput(value)}
        />
      </div>
    </div>
  );
}

export default App;
