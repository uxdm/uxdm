import React, { useState } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import { useActive, useManipulateNodeTree } from '../../../services';
import { componentPrefix } from './index';
import './style.less';

const useEditNodeName = () => {
  const [editNodeId, setEditKey] = useState('');

  // useClickAway(() => {
  //   setEditKey('');
  // }, targetDOM);

  return {
    editNodeId,
    setEditNode: (id) => setEditKey(id),
    isEditing: editNodeId !== '',
    isEditingNode: (id) => editNodeId === id,
  };
};

const LayerItem = ({ node }) => {
  const { activateNode, isActiveNode } = useActive();
  const { updateNode } = useManipulateNodeTree();

  const { setEditNode, isEditingNode } = useEditNodeName();

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
      <div>
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
