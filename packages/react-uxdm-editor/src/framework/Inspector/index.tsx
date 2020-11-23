import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import { NodeTree, useActive } from '../../store';
import { prefix } from '../../theme/prefix';

import './style.less';

export interface InspectorProps {
  nodeTree: NodeTree;
  className?: string;
  style?: CSSProperties;
}

const componentPrefix = `${prefix}-inspector`;

const Inspector: FC<InspectorProps> = ({ nodeTree }) => {
  const { activeNodeId } = useActive();

  const activeNode = nodeTree[activeNodeId];
  return (
    <div className={classNames(`${componentPrefix}-container`)}>
      <div className={`${componentPrefix}-header`}>编辑器</div>
      <div className={`${componentPrefix}-content`}>
        {activeNodeId && (
          <Input
            value={activeNode?.name}
            onChange={(e) => {
              const newName = e.target.value;
              console.log(newName);
              activeNode.name = newName;
            }}
          />
        )}
        {activeNode && (
          <div>
            <div>X:{activeNode.x}</div>
            <div>Y:{activeNode.y}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspector;
