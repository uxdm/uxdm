import React, { useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { useSize } from 'ahooks';
import { useActive, useNodeTree } from '../store';
import { Rectangle, Ellipse, Circle } from './shapes';

import { ShapeTypes } from '../utils';
import styles from './style.less';

const shapesMap = {
  [ShapeTypes.Ellipse]: Ellipse,
  [ShapeTypes.Circle]: Circle,
  [ShapeTypes.Rectangle]: Rectangle,
};

const Canvas = () => {
  const { updateNodePosition } = useNodeTree();
  const { activeNode } = useActive();
  const { nodeList } = useNodeTree();

  const canvasContainerRef = useRef(null);
  const canvas = useSize(canvasContainerRef);

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

            const { bounding } = shape;
            const { fill } = shape;

            return (
              <Component
                key={shape.id}
                fill={fill instanceof Array ? undefined : fill?.hex}
                {...shape.toJSON()}
                {...bounding.toJSON()}
                draggable
                onMouseDown={() => activeNode(shape.id)}
                onDragEnd={({ evt, target }) => {
                  console.log(evt);
                  updateNodePosition(shape.id, {
                    x: target.attrs.x,
                    y: target.attrs.y,
                  });
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
