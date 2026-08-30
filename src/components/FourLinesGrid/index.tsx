import React from 'react'
import { useBoolean, useControllableValue } from 'ahooks'

import Grid from './Grid'
import styles from './index.module.css'

import type { GridProps } from './Grid'

export interface FourLinesGridProps extends GridProps {
  value?: string
  onChange?: (value: string) => void
}

export default function FourLinesGrid(props: FourLinesGridProps) {
  const { original, capitalized = true } = props

  const [value, setValue] = useControllableValue<string>(props, {
    valuePropName: 'modified',
  })
  const [focused, { toggle }] = useBoolean(false)

  const handleChange = (nextValue = '') => {
    if (original && original.length >= nextValue.length) {
      setValue(nextValue.toLowerCase())
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.inputContainer}>
          <input
            id='pinyin-practice-input'
            name='pinyin'
            aria-label='拼音输入'
            autoComplete='off'
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
          cursor={focused}
          className={styles.dummyInput}
        />
      </div>
    </div>
  )
}
