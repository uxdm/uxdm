import React, { FC, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { useSize } from 'ahooks';
import { shapesMap } from '@rue/constants';
import { NodeList } from '../store';
import { useCanvasAction } from '../hooks';

import styles from './style.less';

interface CanvasProps {
  nodeList: NodeList;
}

const Canvas: FC<CanvasProps> = ({ nodeList }) => {
  const canvasContainerRef = useRef(null);
  const canvas = useSize(canvasContainerRef);
  const { nodePropsWrapper } = useCanvasAction();

  return (
    <div ref={canvasContainerRef} className={styles.container}>
      <Stage
        height={canvas.height}
        width={canvas.width}
        className={styles.canvas}
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
