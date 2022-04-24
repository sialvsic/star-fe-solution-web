import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants';
import styles from './Knight.module.less';

interface Props {
  x: number;
  y: number;
}

export default function Knight(props: Props) {
  const { x, y } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
    canDrag: () => {
      return true;
    },
  }));

  return (
    <div
      ref={drag}
      className={styles.imgBox}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <img
        src="https://alvinzhoutest.cn/blog/knight.png"
        alt=""
        className={styles.img}
      />
    </div>
  );
}
