import { mutate, useStore } from 'stook';
import { fromJSON, PositionParams, ShapeNode, ShapeNodeType } from 'uxdm';
import { useEffect, useMemo } from 'react';
import { mapValues } from 'lodash';

const localStorageKey = 'UXDM_EDITOR_LOCAL_STORAGE';

interface EditorState {
  nodeTree: Record<string, ShapeNodeType>;
  nodesOrder: string[];
}

export type NodeTree = Record<string, ShapeNode>;

export type NodeList = Array<ShapeNode>;

export const useNodeTree = () => {
  const [nodeTree, setNodes] = useStore<NodeTree>('NodeTree', {});
  const [nodesOrder, setNodeOrder] = useStore<string[]>('NodeTreeOrder', []);

  // 从本地初始化订阅状态树
  useEffect(() => {
    const savedState = localStorage.getItem(localStorageKey);
    if (!savedState) return;

    const parsedSavedState: EditorState = JSON.parse(savedState);
    if (!parsedSavedState) return;

    mutate('NodeTreeOrder', parsedSavedState.nodesOrder);
    mutate('NodeTree', mapValues(parsedSavedState.nodeTree, fromJSON));
  }, []);

  const saveState = () => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        nodesOrder,
        nodeTree: mapValues(nodeTree, (node) => {
          return node.toJSON();
        }),
      }),
    );
  };
  /**
   * 添加节点
   * @param newNode
   */
  const addNode = (newNode: ShapeNode) => {
    setNodes((state) => {
      state[newNode.id] = newNode;
    });

    setNodeOrder((state) => {
      state.push(newNode.id);
    });
  };

  const updateNodePosition = (nodeId: string, position: PositionParams) => {
    setNodes((state) => {
      state[nodeId].setPosition(position);
    });
  };

  const resetNodeTree = () => {
    setNodes({});
    setNodeOrder([]);
  };

  const nodeList = useMemo(
    () => nodesOrder?.map((shapeId) => nodeTree[shapeId]),
    [nodesOrder, nodeTree],
  );

  return {
    /**
     * 添加节点
     */
    addNode,
    /**
     * 更新节点位置
     */
    updateNodePosition,
    nodeTree,
    nodesOrder,
    saveState,
    resetNodeTree,
    nodeList,
  };
};
