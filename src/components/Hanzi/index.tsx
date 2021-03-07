import * as React from 'react';

import { FourLineGrid } from '@/components';
import type { FourLineGridProps } from '@/components/FourLineGrid';
import styles from './index.module.less';

export interface HanziProps extends Omit<FourLineGridProps, 'disabled'> {
  char?: string;
}

export default function Hanzi(props: HanziProps) {
  const { char, ...rest } = props;

  return (
    <div className={styles.container}>
      <div className={styles.char}>{char}</div>
      <FourLineGrid {...rest} />
    </div>
  );
}
