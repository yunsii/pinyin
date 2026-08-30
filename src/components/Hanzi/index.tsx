import styles from './index.module.css'

import type { FourLinesGridProps } from '@/components/FourLinesGrid'

import { FourLineGrid } from '@/components'

export interface HanziProps extends Omit<FourLinesGridProps, 'disabled'> {
  zi?: string
}

export default function Hanzi(props: HanziProps) {
  const { zi, ...rest } = props

  return (
    <div className={styles.container}>
      <div className={styles.zi}>{zi}</div>
      <FourLineGrid {...rest} />
    </div>
  )
}
