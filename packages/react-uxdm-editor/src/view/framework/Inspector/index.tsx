import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import { useEditorOperation } from '../../../interaction';
import { prefix } from '../../theme/prefix';

import './style.less';

export interface InspectorProps {
  className?: string;
  style?: CSSProperties;
}

const componentPrefix = `${prefix}-inspector`;

const Inspector: FC<InspectorProps> = () => {
  const { activeNode } = useEditorOperation();

  return (
    <div className={classNames(`${componentPrefix}-container`)}>
      <div className={`${componentPrefix}-header`}>编辑器</div>
      <div className={`${componentPrefix}-content`}>
        {activeNode && (
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
