import { useCallback, useMemo } from 'react';

import { ShapeNode } from 'uxdm';
import { useEditorOperation } from './index';
import { useEditorStore } from '../store';

/**
 * Editor 的辅助函数
 */
export const useEditorUtils = () => {
  const { updateNodePosition, activateNode } = useEditorOperation();
  const { nodeTree, layerTree } = useEditorStore();

  return {
    /**
     * 给每个 node 都包裹一层 props
     */
    nodePropsWrapper: useCallback((node: ShapeNode) => {
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
        onMouseDown: () => {
          activateNode(node.id);
        },
      };
    }, []),
    /**
     * 生成给框架消费的 NodeList
     */
    nodeList: useMemo(() => layerTree?.map((layer) => nodeTree[layer]), [
      layerTree,
      nodeTree,
    ]),
  };
};
