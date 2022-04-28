import { Link } from 'umi';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>示例</h1>
      <ul>
        <li>
          <Link to="/download">文件下载</Link>
        </li>
        <li>
          <Link to="/upload">文件上传</Link>
        </li>
        <li>
          <Link to="/event/drag">拖拽</Link>
        </li>
        <li>
          <Link to="/lib/react">react</Link>
        </li>
        <li>
          <Link to="/lib/react-dnd">react dnd</Link>
        </li>
      </ul>
    </div>
  );
}
