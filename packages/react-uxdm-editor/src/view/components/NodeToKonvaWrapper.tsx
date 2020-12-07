import React, { FC } from 'react';
import { Transformer } from 'react-konva';
import { LayerNode } from 'uxdm';

import { nodesMap } from '../nodes';
import { useNodeMapper, useNodeSelector } from '../../models';

interface NodeToKonvaLayerProps {
  node: LayerNode;
}

/**
 * 将图形节点的参数映射到 KonvaLayer
 * @param node
 * @constructor
 */
const NodeToKonvaWrapper: FC<NodeToKonvaLayerProps> = ({ node }) => {
  const props = useNodeMapper(node);
  const { targetRef, transformerRef, isSelected } = useNodeSelector(node);
  const Component = nodesMap[node.type];

  return (
    <>
      <Component shapeRef={targetRef} {...props} />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          keepRatio={props.keepAspectRatio}
          anchorCornerRadius={10}
          boundBoxFunc={(oldBox, newBox) => {
            // 暂时不允许缩小到 1 以下
            if (newBox.width < 1 || newBox.height < 1) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default NodeToKonvaWrapper;
