import React, { ReactElement } from 'react';
import styles from './index.module.less';

interface Props {
  children: ReactElement;
}

export default function View({ children }: Props) {
  return <div className={styles.block}>{children}</div>;
}
