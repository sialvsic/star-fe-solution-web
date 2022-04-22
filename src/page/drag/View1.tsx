//自己实现的
import classNames from 'classnames';
import { useRef } from 'react';
import { useState } from 'react';
import styles from './index1.less';

export default function View() {
  const MOCK_LIST_DATA = new Array(10).fill(0).map((_, idx) => ({
    id: Math.random().toString(36).slice(-6),
    val: `初始顺序：${idx}`,
  }));

  const [list, setList] = useState(MOCK_LIST_DATA);
  const ref = useRef();
  const [isDragIn, setIsDragIn] = useState(false);
  const [dragId, setDragId] = useState('');

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    console.log('onDragStart', onDragStart);
    console.log(item.id);

    const sourceItemId = item.id;
    ref.current = sourceItemId;
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    console.log(e.target);
    console.log(item.id);
    setIsDragIn(true);
    setDragId(item.id);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    console.log('onDragLeave');
    setIsDragIn(false);
  };

  const onDragDrop = (e: React.DragEvent<HTMLDivElement>, item: any) => {
    console.log('onDragDrop');
    const hoverItemId = item.id;
    const newList = new Array().concat(list);
    console.log(newList);

    const sourceIndex = list.findIndex((i) => i.id === ref.current);
    const hoverIndex = list.findIndex((i) => i.id === hoverItemId);

    if (hoverIndex !== -1) {
      const sourceItem = list[sourceIndex];

      newList.splice(sourceIndex, 1);
      newList.splice(hoverIndex, 0, sourceItem);

      setIsDragIn(false);
      setList(newList);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>基于 HTML5 原生拖拽事件的拖拽列表</h1>
      {list.map((item, index) => {
        return (
          <div
            className={classNames(styles.item, {
              [styles.bottom]: isDragIn && dragId === item.id,
            })}
            draggable="true"
            key={index}
            onDragStart={(e) => onDragStart(e, item)}
            onDragOver={onDragOver}
            onDrop={(e) => onDragDrop(e, item)}
            onDragEnter={(e) => onDragEnter(e, item)}
            onDragLeave={(e) => onDragLeave(e, item)}
          >
            {item.id}
            {item.val}
          </div>
        );
      })}
    </div>
  );
}
