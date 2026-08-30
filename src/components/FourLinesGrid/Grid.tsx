import React from 'react'

import styles from './Grid.module.css'

import { cn } from '@/lib/utils'

export interface GridProps {
  capitalized?: boolean
  cursor?: boolean
  original?: string
  modified?: string
  style?: React.CSSProperties
  className?: string
}

export default function Grid(props: GridProps) {
  const {
    original = '',
    modified = '',
    capitalized = true,
    cursor = false,
    style,
    className,
  } = props

  const content = React.useMemo(() => {
    const finalCharInputedIndex = modified.length - 1

    if (original) {
      return (
        <div
          className={cn(styles.pinyin, {
            [styles.captialized]: !!original.charAt(1) && capitalized,
          })}
        >
          {original.split('').map((item, index) => {
            return (
              <span
                key={index}
                className={cn({
                  [styles.char]: true,
                  [styles.charInputed]: index <= finalCharInputedIndex,
                  [styles.error]:
                    modified[index] && original[index] !== modified[index],
                  [styles.cursor]: cursor && finalCharInputedIndex === index,
                  [styles.emptyContentCursor]:
                    cursor && finalCharInputedIndex === -1 && index === 0,
                })}
              >
                {item}
              </span>
            )
          })}
        </div>
      )
    }
  }, [original, modified, cursor, capitalized])

  return (
    <div className={cn(styles.hero, className)} style={style}>
      {new Array(4).fill(0).map((_, index) => (
        <div
          key={index}
          className={cn(
            styles.line,
            styles[`line${index + 1}` as keyof typeof styles],
          )}
        />
      ))}
      {content}
    </div>
  )
}
