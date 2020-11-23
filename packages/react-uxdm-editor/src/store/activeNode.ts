import { useStore } from 'stook';
import { EditorStateKey } from './storeKey';
import { useEditorStore } from './editorStore';

/**
 * 包含有所有 editor state 的参数
 * @param state 初始化状态
 */
export const useActiveNode = (state: string = '') => {
  const [activeNodeId, setActiveNode] = useStore<string>(
    EditorStateKey.activeNode,
    state,
  );
  const { nodeTree } = useEditorStore();

  return {
    /**
     * 激活的节点 id
     */
    activeNodeId,
    setActiveNode,
    activeNode: nodeTree[activeNodeId],
  };
};
