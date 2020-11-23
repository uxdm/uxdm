import React, { CSSProperties, FC } from 'react';

import classNames from 'classnames';
import { NodeList, useActive } from '../../store';
import { prefix } from '../../theme/prefix';

import './style.less';

export interface LayPanelProps {
  nodeList: NodeList;
  className?: string;
  style?: CSSProperties;
}

const componentPrefix = `${prefix}-layer-panel`;

const LayPanel: FC<LayPanelProps> = ({ nodeList }) => {
  const { activeNode } = useActive();

  return (
    <div className={classNames(`${componentPrefix}-container`)}>
      <div className={`${componentPrefix}-header`}>Layers</div>
      <div className={`${componentPrefix}-content`}>
        {nodeList?.map((node) => (
          <div key={node.id} onClick={() => activeNode(node.id)}>
            {node.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayPanel;
