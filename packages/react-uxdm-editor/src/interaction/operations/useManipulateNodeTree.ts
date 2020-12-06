import { LayerNode, PositionParams, ShapeNodeType } from 'uxdm';

import { useEditorStore } from '../../store';

export const useManipulateNodeTree = () => {
  const { setLayerTree, setNodeTree } = useEditorStore();

  return {
    /**
     * 添加节点
     * @param newNode
     */
    addNode: (newNode: LayerNode) => {
      setNodeTree((state) => {
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
        setNodeTree((nodeTree) => {
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
        setNodeTree(newNodeTree);
        setLayerTree(node.map((n) => n.id));
      } else {
        setNodeTree({ [node.id]: node });
        setLayerTree([node.id]);
      }
    },
    /**
     * 更新节点位置
     * @param nodeId
     * @param position
     */
    updateNodePosition: (nodeId: string, position: PositionParams) => {
      setNodeTree((state) => {
        state[nodeId]?.setPosition(position);
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
