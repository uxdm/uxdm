import React, { FC, useRef } from 'react';

import { Layer, Stage } from 'react-konva';
import { useSize } from 'ahooks';
import classNames from 'classnames';
import { NodeList } from '../../../types';
import { NodeToKonvaLayer } from '../../components';

import './style.less';
import { prefix } from '../../theme/prefix';

const componentPrefix = `${prefix}-canvas`;

interface CanvasProps {
  nodeList: NodeList;
}

const scaleBy = 1.03;

const Canvas: FC<CanvasProps> = ({ nodeList }) => {
  const canvasContainerRef = useRef(null);
  const canvas = useSize(canvasContainerRef);

  return (
    <div
      ref={canvasContainerRef}
      className={classNames(`${componentPrefix}-container`)}
    >
      <Stage
        height={canvas.height}
        width={canvas.width}
        className={`${componentPrefix}-canvas`}
        onWheel={({ evt, target }) => {
          evt.preventDefault();
          if (target instanceof Stage) {
            console.log(target);

            const oldScale = target.scaleX();

            const pointer = target.getPosition();

            const mousePointTo = {
              x: (pointer.x - target.x()) / oldScale,
              y: (pointer.y - target.y()) / oldScale,
            };

            const newScale =
              evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

            target.scale({ x: newScale, y: newScale });

            const newPos = {
              x: pointer.x - mousePointTo.x * newScale,
              y: pointer.y - mousePointTo.y * newScale,
            };
            target.position(newPos);
          }
        }}
      >
        <Layer>
          {nodeList?.map((node) => (
            <NodeToKonvaLayer key={node.id} node={node} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
