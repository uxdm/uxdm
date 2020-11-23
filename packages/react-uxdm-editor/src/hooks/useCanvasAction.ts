import { ShapeNode } from 'uxdm';
import { useActive, useNodeTree } from '../store';

export const useCanvasAction = () => {
  const { updateNodePosition } = useNodeTree();
  const { activeNode } = useActive();

  return {
    nodePropsWrapper: (node: ShapeNode) => {
      const { fill } = node;

      return {
        /**
         * key
         */
        key: node.id,
        /**
         * 将节点所有参数都透传给 konva shape
         */
        ...node.toJSON(),
        /**
         * 将 bounding 参数透传给 konva shape
         */
        ...node.bounding.toJSON(),
        /**
         * 填色
         */
        fill: fill instanceof Array ? undefined : fill?.hex,
        /**
         * 允许拖拽
         */
        draggable: true,
        /**
         * 拖拽响应方法
         * @param target
         */
        onDragEnd: ({ target }) => {
          updateNodePosition(node.id, {
            x: target.attrs.x,
            y: target.attrs.y,
          });
        },
        onMouseDown: () => activeNode(node.id),
      };
    },
  };
};
