import React, { CSSProperties, FC } from 'react';
import classNames from 'classnames';
import { useEditorOperation } from '../../../interaction';
import { prefix } from '../../theme/prefix';

import './style.less';
import { useFormatMessage } from '../../components';

export interface InspectorProps {
  className?: string;
  style?: CSSProperties;
}

const componentPrefix = `${prefix}-inspector`;

const Inspector: FC<InspectorProps> = () => {
  const { activeNode } = useEditorOperation();
  const f = useFormatMessage();

  return (
    <div className={classNames(`${componentPrefix}-container`)}>
      <div className={`${componentPrefix}-header`}>
        {f('inspector.header.edit')}
      </div>
      <div className={`${componentPrefix}-content`}>
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
