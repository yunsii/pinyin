import React from 'react';
import { Typography } from 'antd';

import { FourLineGrid } from '@/components';
import type { FourLinesGridProps } from '@/components/FourLinesGrid';
import styles from './index.module.less';

export interface HanziProps extends Omit<FourLinesGridProps, 'disabled'> {
  zi?: string;
}

export default function Hanzi(props: HanziProps) {
  const { zi, ...rest } = props;

  return (
    <div className={styles.container}>
      <Typography className={styles.zi}>{zi}</Typography>
      <FourLineGrid {...rest} />
    </div>
  );
}
