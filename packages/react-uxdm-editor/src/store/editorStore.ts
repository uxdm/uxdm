import { useStore } from 'stook';
import { EditorStore, LayerTree, NodeTree } from '../types';
import { EditorStateKey } from './storeKey';

/**
 * 包含有所有 editor state 的参数
 * @param state 初始化状态
 */
export const useEditorStore = (state?: Partial<EditorStore>) => {
  const [nodes, setNodes] = useStore<NodeTree>(
    EditorStateKey.nodes,
    state?.nodes || {},
  );
  const [layerTree, setLayerTree] = useStore<LayerTree>(
    EditorStateKey.layerTree,
    state?.layerTree || [],
  );

  return {
    /**
     * 所有显示的节点
     */
    nodes,
    setNodes,
    /**
     * 在图层面板中以树状显示的节点
     */
    layerTree,
    setLayerTree,
  };
};
