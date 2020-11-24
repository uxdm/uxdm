import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import LayerItem from './LayerItem';
import { prefix } from '../../theme/prefix';
import { useFormatMessage } from '../../components';
import { NodeList } from '../../../types';

import './style.less';

export interface LayPanelProps {
  nodeList: NodeList;
  className?: string;
  style?: CSSProperties;
}

export const componentPrefix = `${prefix}-layer-panel`;

const LayerPanel: FC<LayPanelProps> = ({ nodeList }) => {
  const f = useFormatMessage();

  return (
    <div className={classNames(`${componentPrefix}-container`)}>
      <div className={`${componentPrefix}-header`}>
        {f('layer-panel.header.layer')}
      </div>
      <div className={`${componentPrefix}-content`}>
        {nodeList?.map((node) => (
          <LayerItem node={node} key={node.id} />
        ))}
      </div>
    </div>
  );
};

export default LayerPanel;
