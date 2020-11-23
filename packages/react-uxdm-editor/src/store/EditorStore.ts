import { useStore } from 'stook';
import { EditorStore, LayerTree, NodeTree } from '../types';
import { EditorStateKey } from './storeKey';

/**
 * 包含有所有 editor state 的参数
 * @param state 初始化状态
 */
export const useEditorStore = (state?: Partial<EditorStore>) => {
  const [activeNode, setActiveNode] = useStore<string>(
    EditorStateKey.activeNode,
    state?.activeNode || '',
  );

  const [nodeTree, setNodeTree] = useStore<NodeTree>(
    EditorStateKey.nodeTree,
    state?.nodeTree || {},
  );
  const [layerTree, setLayerTree] = useStore<LayerTree>(
    EditorStateKey.layerTree,
    state?.layerTree || [],
  );

  return {
    /**
     * 保存在节点中的
     */
    nodeTree,
    setNodeTree,
    /**
     * 节点排序
     */
    layerTree,
    setLayerTree,

    /**
     * 激活的节点 id
     */
    activeNode,
    setActiveNode,
  };
};
