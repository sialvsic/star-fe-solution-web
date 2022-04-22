import React, { useState } from 'react';
import { cloneDeep, findIndex, isEqual } from 'lodash';
// import update from 'immutability-helper';
import './index.less';

const MOCK_LIST_DATA = new Array(10).fill(0).map((_, idx) => ({
  id: Math.random().toString(36).slice(-6),
  val: `初始顺序：${idx}`,
}));

interface ItemProps {
  index: string;
  val: string;
  handleDragStart: React.DragEventHandler<HTMLDivElement>;
  handleDragOver: React.DragEventHandler<HTMLDivElement>;
  handleDrag: React.DragEventHandler<HTMLDivElement>;
  handleDragEnd: React.DragEventHandler<HTMLDivElement>;
}

const Item: React.FC<ItemProps> = React.memo((props) => {
  const {
    index,
    val,
    handleDrag,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
  } = props;

  return (
    <div
      className="item"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove('border-top');
      }}
      data-index={index}
    >
      <div>ID: {index}</div>
      <div>{val}</div>
    </div>
  );
});

const SortableListPage = () => {
  const [listData, setListData] = useState(MOCK_LIST_DATA);
  const [dragId, setDragId] = useState<string | undefined>('');

  const move = (dragId?: string, dropId?: string) => {
    if (!dragId || !dropId) return;
    const dragIndex = findIndex(listData, (i) => i.id === dragId);
    const dropIndex = findIndex(listData, (i) => i.id === dropId);
    const originItem = listData[dragIndex];
    if (!originItem) return;

    const listDataClone = cloneDeep(listData);

    listDataClone.splice(dragIndex, 1);
    listDataClone.splice(dropIndex, 0, originItem);
    const newListData = listDataClone;

    if (!isEqual(listData, newListData)) setListData(newListData);
  };

  // 源对象开始拖拽
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    setDragId(e.currentTarget.dataset.index);
  };

  // 源对象在目标对象上方时
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // 允许放置，阻止默认事件
    // 设置动画
    const dropId = e.currentTarget.dataset.index;
    const dragIndex = findIndex(listData, (i) => i.id === dragId);
    const dropIndex = findIndex(listData, (i) => i.id === dropId);
    e.currentTarget.classList.remove('drop-up', 'drop-down');
    if (dragIndex < dropIndex) {
      e.currentTarget.classList.add('drop-down');
    } else if (dragIndex > dropIndex) {
      e.currentTarget.classList.add('drop-up');
    }
    move(dragId, dropId);
  };

  // 源对象被拖拽过程中
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '0';
  };

  // 源对象被放置完成时
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div className="sortable-page">
      <h1>基于 HTML5 原生拖拽事件的拖拽列表</h1>
      <div className="list-container">
        {listData.map((i) => {
          return (
            <Item
              key={i.id}
              index={i.id}
              val={i.val}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrag={handleDrag}
              handleDragEnd={handleDragEnd}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SortableListPage;
