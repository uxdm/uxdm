import { PositionParams, ShapeNode } from 'uxdm';

import { useEditorStore } from '../../store';

export const useManipulateNodeTree = () => {
  const { setLayerTree, setNodeTree } = useEditorStore();

  return {
    /**
     * 添加节点
     * @param newNode
     */
    addNode: (newNode: ShapeNode) => {
      setNodeTree((state) => {
        state[newNode.id] = newNode;
      });

      setLayerTree((state) => {
        state.push(newNode.id);
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
     * 更新节点位置
     * @param nodeId
     * @param position
     */
    updateNodePosition: (nodeId: string, position: PositionParams) => {
      setNodeTree((state) => {
        state[nodeId].setPosition(position);
      });
    },
    /**
     * 重置节点
     */
    resetNodeTree: () => {
      setNodeTree({});
      setLayerTree([]);
    },
  };
};
