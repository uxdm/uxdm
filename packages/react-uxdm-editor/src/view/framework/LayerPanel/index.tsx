import React, { CSSProperties, FC } from 'react';

import classNames from 'classnames';
import { NodeList } from '../../../types';
import { useEditorOperation } from '../../../interaction';
import { prefix } from '../../theme/prefix';

import './style.less';

export interface LayPanelProps {
  nodeList: NodeList;
  className?: string;
  style?: CSSProperties;
}

const componentPrefix = `${prefix}-layer-panel`;

const LayerPanel: FC<LayPanelProps> = ({ nodeList }) => {
  const { activateNode } = useEditorOperation();

  return (
    <div className={classNames(`${componentPrefix}-container`)}>
      <div className={`${componentPrefix}-header`}>Layers</div>
      <div className={`${componentPrefix}-content`}>
        {nodeList?.map((node) => (
          <div key={node.id} onClick={() => activateNode(node.id)}>
            {node.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerPanel;
