import React, { FC, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { useSize } from 'ahooks';
import classNames from 'classnames';
import { shapesMap } from '../../constants';
import { NodeList, useCanvasAction } from '../../store';

import './style.less';
import { prefix } from '../../theme/prefix';

const componentPrefix = `${prefix}-canvas`;

interface CanvasProps {
  nodeList: NodeList;
}

const Canvas: FC<CanvasProps> = ({ nodeList }) => {
  const canvasContainerRef = useRef(null);
  const canvas = useSize(canvasContainerRef);
  const { nodePropsWrapper } = useCanvasAction();

  return (
    <div
      ref={canvasContainerRef}
      className={classNames(`${componentPrefix}-container`)}
    >
      <Stage
        height={canvas.height}
        width={canvas.width}
        className={`${componentPrefix}-canvas`}
      >
        <Layer>
          {nodeList?.map((shape) => {
            const Component = shapesMap[shape.type];
            const props = nodePropsWrapper(shape);
            return <Component {...props} />;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
