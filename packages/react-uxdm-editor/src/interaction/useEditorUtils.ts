import { useCallback, useMemo } from 'react';

import { GroupNode, LayerNode } from 'uxdm';
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
    nodePropsWrapper: useCallback((layerNode: LayerNode) => {
      const baseProps = (node: LayerNode) => ({
        /**
         * 将 bounding 参数透传给 konva shape
         */
        ...node.bounding.toJSON?.(),
        /**
         * key
         */
        key: node.id,

        /**
         * 填色
         */
        fill: node.fill instanceof Array ? undefined : node.fill?.hex,
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
      });

      if (layerNode instanceof GroupNode) {
        const { children, ...layerProps } = layerNode.toJSON();
        return {
          ...baseProps(layerNode),
          ...layerProps,
          children: layerNode.children,
        };
      }

      return {
        ...baseProps(layerNode),
        /**
         * 将节点所有参数都透传给 konva shape
         */
        ...layerNode?.toJSON(),
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
