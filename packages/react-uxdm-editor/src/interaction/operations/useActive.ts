import { useEditorStore } from '../../store';

export const useActive = () => {
  const { activeNode: id, setActiveNode, nodeTree } = useEditorStore();

  return {
    activeNode: nodeTree[id],
    /**
     * 激活节点
     * @param nodeId
     */
    activateNode: (nodeId) => {
      console.time('active');
      setActiveNode(nodeId);
      console.timeEnd('active');
    },
    /**
     * 取消激活
     */
    deactivate: () => {
      setActiveNode('');
    },
  };
};
