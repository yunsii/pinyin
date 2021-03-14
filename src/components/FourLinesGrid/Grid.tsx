import React from 'react';
import classNames from 'classnames';

import styles from './Grid.module.less';

export interface GridProps {
  capitalized?: boolean;
  cursor?: boolean;
  original?: string;
  modified?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Grid(props: GridProps) {
  const { original = '', modified = '', capitalized = true, cursor = false, style, className } = props;

  const content = React.useMemo(() => {
    const finalCharInputedIndex = modified.length - 1;

    if (original) {
      return (
        <div
          className={classNames({
            [styles.pinyin]: true,
            [styles.captialized]: !!original.charAt(1) && capitalized,
          })}
        >
          {original.split('').map((item, index) => {
            return (
              <span
                key={index}
                className={classNames({
                  [styles.char]: true,
                  [styles.charInputed]: index <= finalCharInputedIndex,
                  [styles.error]: modified[index] && original[index] !== modified[index],
                  [styles.cursor]: cursor && finalCharInputedIndex === index,
                  [styles.emptyContentCursor]: cursor && finalCharInputedIndex === -1 && index === 0,
                })}
              >
                {item}
              </span>
            );
          })}
        </div>
      );
    }
  }, [original, modified, cursor]);

  return (
    <div className={classNames(styles.hero, className)} style={style}>
      {new Array(4).fill(0).map((_, index) => (
        <div key={index} className={classNames(styles.line, styles[`line${index + 1}`])} />
      ))}
      {content}
    </div>
  );
}
