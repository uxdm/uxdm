import { mutate, useStore } from 'stook';
import { fromJSON, PositionParams, ShapeNode, ShapeNodeType } from 'uxdm';
import { useEffect, useMemo } from 'react';
import { mapValues } from 'lodash';
import { useUpdate } from 'ahooks';
import { localStorageKey } from './constants';

export type LayerNode = string | [string, LayerNode[]];
export type LayerTree = LayerNode[];
/**
 *
 */
export type NodeTree = Record<string, ShapeNode>;

export type NodeList = Array<ShapeNode>;

/**
 * 编辑器状态
 */
export interface EditorState {
  /**
   * 节点树
   */
  nodeTree: Record<string, ShapeNodeType>;
  /**
   * 图层树
   */
  layerTree: LayerTree;
}

export const EditorStateKey: Record<keyof EditorState, string> = {
  nodeTree: 'UXDM_NODE_TREE',
  layerTree: 'UXDM_LAYER_TREE',
};

/**
 * 提供给外界的获取 state 值
 * @param props
 */
export const useEditorState = (props?: {
  state: NodeTree;
  onChange?: (state: NodeTree) => void;
}) => {
  const update = useUpdate();
  const [nodeTree, setNodes] = useStore<NodeTree>(
    EditorStateKey.nodeTree,
    props?.state || {},
  );
  const [layerTree, setLayerTree] = useStore<string[]>(
    EditorStateKey.layerTree,
    [],
  );

  useEffect(() => {
    if (props?.onChange) {
      props?.onChange(nodeTree);
    }
  }, [nodeTree, props?.onChange]);

  /**
   * 从本地初始化订阅状态树
   * @param key
   */
  const loadFromLocalStorage = (key: string = localStorageKey) => {
    const savedState = localStorage.getItem(key);
    if (!savedState) return;

    const parsedSavedState: EditorState = JSON.parse(savedState);
    if (!parsedSavedState) return;

    mutate(
      EditorStateKey.nodeTree,
      mapValues(parsedSavedState[EditorStateKey.nodeTree], fromJSON),
    );
    mutate(
      EditorStateKey.layerTree,
      parsedSavedState[EditorStateKey.layerTree],
    );
  };

  /**
   * 保存状态到本地 localStorage
   * @param key
   */
  const saveToLocalStorage = (key: string = localStorageKey) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        [EditorStateKey.layerTree]: layerTree,
        [EditorStateKey.nodeTree]: mapValues(nodeTree, (node) => {
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

    setLayerTree((state) => {
      state.push(newNode.id);
    });
  };

  const updateNodePosition = (nodeId: string, position: PositionParams) => {
    setNodes((state) => {
      state[nodeId].setPosition(position);
    });
    update();
  };

  const resetNodeTree = () => {
    setNodes({});
    setLayerTree([]);
  };

  const nodeList = useMemo(
    () => layerTree?.map((shapeId) => nodeTree[shapeId]),
    [layerTree, nodeTree],
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
    /**
     * 重置节点树
     */
    resetNodeTree,
    /**
     * 保存到本地
     */
    saveToLocalStorage,
    /**
     * 从本地获取数据
     */
    loadFromLocalStorage,
    /**
     * 保存在节点中的
     */
    nodeTree,
    /**
     * 节点排序
     */
    layerTree,
    /**
     * 用于渲染的节点列表
     */
    nodeList,
  };
};
