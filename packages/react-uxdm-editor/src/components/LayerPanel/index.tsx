import React, { FC } from 'react';
import { NodeList, useActive } from '../../store';
import style from './style.less';

interface LayPanelProps {
  nodeTree: NodeList;
}

const LayPanel: FC<LayPanelProps> = ({ nodeTree }) => {
  const { activeNode } = useActive();

  return (
    <div className={style.container}>
      <div className={style.header}>Layers</div>
      <div className={style.content}>
        {nodeTree?.map((node) => (
          <div key={node.id} onClick={() => activeNode(node.id)}>
            {node.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayPanel;
