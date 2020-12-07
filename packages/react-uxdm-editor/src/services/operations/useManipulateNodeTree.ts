import { useMemo } from 'react';
import {
  BoundingParams,
  LayerNode,
  PositionParams,
  ShapeNodeType,
  SizeParams,
} from 'uxdm';

import { useEditorStore } from '../../store';

export const useManipulateNodeTree = () => {
  const { setLayerTree, setNodes } = useEditorStore();

  return useMemo(
    () => ({
      /**
       * 添加节点
       * @param newNode
       */
      addNode: (newNode: LayerNode) => {
        setNodes((state) => {
          state[newNode.id] = newNode;
        });

        setLayerTree((state) => {
          state.push(newNode.id);
        });
      },
      /**
       * 更新节点信息
       * @param id
       * @param payload 入参是一个对象 包含了待修改的参数
       */
      updateNode: (id: string, payload: Partial<ShapeNodeType>) => {
        Object.entries(payload).forEach((entry) => {
          if (!entry) return;

          const [key, value] = entry;
          console.log('更新', key);
          setNodes((nodeTree) => {
            const node = nodeTree[id];

            // TODO 需要添加值校验
            if (key in node) {
              node[key] = value;
            }
          });
        });
      },
      /**
       * 删除节点
       * @param nodeId
       */
      removeNode: (nodeId: string) => {
        // setNodeTree((state) => {
        //   // state[newNode.id] = newNode;
        // });

        setLayerTree((layerTree) => {
          layerTree.filter((layerId) => layerId !== nodeId);
        });
      },
      /**
       * 传入节点全量替换已有的节点树
       */
      replaceNodeTree: (node: LayerNode | LayerNode[]) => {
        if (node instanceof Array) {
          const newNodeTree = {};

          node.forEach((n) => {
            newNodeTree[n.id] = n;
          });
          setNodes(newNodeTree);
          setLayerTree(node.map((n) => n.id));
        } else {
          setNodes({ [node.id]: node });
          setLayerTree([node.id]);
        }
      },
      /**
       * 更新节点位置
       * @param nodeId
       * @param position
       */
      updateNodePosition: (nodeId: string, position: PositionParams) => {
        setNodes((state) => {
          state[nodeId]?.setPosition(position);
        });
      },
      /**
       * 更新节点尺寸
       * @param nodeId
       * @param size
       */
      updateNodeSize: (nodeId: string, size: SizeParams) => {
        setNodes((state) => {
          state[nodeId]?.setSize(size);
        });
      },
      /**
       * 更新节点尺寸
       * @param nodeId
       * @param bounding
       */
      updateNodeBounding: (nodeId: string, bounding: BoundingParams) => {
        setNodes((state) => {
          state[nodeId]?.setBounding(bounding);
        });
      },
      /**
       * 重置节点
       */
      resetNodeTree: () => {
        setNodes({});
        setLayerTree([]);
      },
    }),
    [],
  );
};
