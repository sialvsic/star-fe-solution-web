import { Link } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <ul>
        <li>
          <Link to="/download">文件下载</Link>
        </li>
      </ul>
    </div>
  );
}
