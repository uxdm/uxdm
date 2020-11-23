import React, { FC } from 'react';
import classNames from 'classnames';
import { NodeList, useActive } from '../../store';
import { prefix } from '../../theme/prefix';

import './style.less';

interface LayPanelProps {
  nodeTree: NodeList;
}

const componentPrefix = `${prefix}-layer-panel`;

const LayPanel: FC<LayPanelProps> = ({ nodeTree }) => {
  const { activeNode } = useActive();

  return (
    <div className={classNames(`${componentPrefix}-container`)}>
      <div className={`${componentPrefix}-header`}>Layers</div>
      <div className={`${componentPrefix}-content`}>
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
