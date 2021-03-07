import * as React from 'react';
import { useBoolean, useControllableValue } from 'ahooks';

import Grid, { GridProps } from './Grid';
import styles from './index.module.less';

export interface FourLineGridProps extends GridProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function FourLineGrid(props: FourLineGridProps) {
  const { original, capitalized = true } = props;

  const [value, setValue] = useControllableValue<string>(props, {
    valuePropName: 'modified',
  });
  const [focued, { toggle }] = useBoolean(false);

  const handleChange = (nextValue = '') => {
    if (original && original.length >= nextValue.length) {
      setValue(nextValue);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.inputContainer}>
          <input
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() => toggle()}
            onBlur={() => toggle()}
          />
        </div>
        <Grid
          capitalized={capitalized}
          original={original}
          modified={value}
          cursor={focued}
          className={styles.dummyInput}
        />
      </div>
    </div>
  );
}
