import React, { ReactElement } from 'react';
import { Helmet, Link } from 'umi';
import styles from './index.module.less';

interface Props {
  title: string;
  children: ReactElement;
}

export default function View({ title = '', children }: Props) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ul>
        <Link to="/">首页</Link>
      </ul>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
