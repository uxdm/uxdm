import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import { useClickAway } from 'ahooks';
import { useEditorOperation } from '../../../interaction';
import { componentPrefix } from './index';
import './style.less';

const useEditNodeName = (targetDOM) => {
  const [editNodeId, setEditKey] = useState('');

  useClickAway(() => {
    setEditKey('');
  }, targetDOM);

  return {
    editNodeId,
    setEditNode: (id) => setEditKey(id),
    isEditing: editNodeId !== '',
    isEditingNode: (id) => editNodeId === id,
  };
};

const LayerItem = ({ node }) => {
  const { updateNode, activateNode, isActiveNode } = useEditorOperation();
  const containerRef = useRef();

  const { setEditNode, isEditingNode } = useEditNodeName(containerRef);

  const isActive = isEditingNode(node.id) || isActiveNode(node.id);

  return (
    <div
      onClick={() => activateNode(node.id)}
      onDoubleClick={() => {
        setEditNode(node.id);
      }}
      className={classNames(
        `${componentPrefix}-layer`,
        isActive ? `${componentPrefix}-layer-active` : '',
      )}
    >
      <div ref={containerRef}>
        {isEditingNode(node.id) ? (
          <Input
            className={`${componentPrefix}-layer-input`}
            size="small"
            value={node?.name}
            onChange={(e) => {
              const newName = e.target.value;
              updateNode(node.id, { name: newName });
            }}
          />
        ) : (
          <div className={`${componentPrefix}-layer-text`}>{node.name}</div>
        )}
      </div>
    </div>
  );
};
export default LayerItem;
