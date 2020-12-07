import React, { FC, useRef } from 'react';

import { Layer, Stage } from 'react-konva';
import { useSize } from 'ahooks';
import classNames from 'classnames';
import { NodeList } from '../../../types';
import { NodeToKonvaWrapper } from '../../components';
import { prefix } from '../../theme/prefix';

import './style.less';
import { useNodeTransformer } from '../../../models';

const componentPrefix = `${prefix}-canvas`;

interface CanvasProps {
  nodeList: NodeList;
}

const Canvas: FC<CanvasProps> = ({ nodeList }) => {
  const canvasContainerRef = useRef(null);
  const canvas = useSize(canvasContainerRef);

  const { checkDeselect } = useNodeTransformer();

  return (
    <div
      ref={canvasContainerRef}
      className={classNames(`${componentPrefix}-container`)}
    >
      <Stage
        height={canvas.height}
        width={canvas.width}
        className={`${componentPrefix}-canvas`}
        // 确认取消选择对象
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {nodeList?.map((node) => (
            <NodeToKonvaWrapper key={node.id} node={node} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
