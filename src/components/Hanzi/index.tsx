import React from 'react';
import { Typography } from 'antd';

import { FourLineGrid } from '@/components';
import type { FourLinesGridProps } from '@/components/FourLinesGrid';
import styles from './index.module.less';

export interface HanziProps extends Omit<FourLinesGridProps, 'disabled'> {
  char?: string;
}

export default function Hanzi(props: HanziProps) {
  const { char, ...rest } = props;

  return (
    <div className={styles.container}>
      <Typography className={styles.char}>{char}</Typography>
      <FourLineGrid {...rest} />
    </div>
  );
}
