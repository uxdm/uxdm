import { useActiveNode } from '../../store';

export const useActive = () => {
  const { activeNode, setActiveNode, activeNodeId } = useActiveNode();

  return {
    activeNode,
    activeNodeId,
    /**
     * 是否是激活节点
     * @param id
     */
    isActiveNode: (id) => activeNodeId === id,
    /**
     * 激活节点
     * @param nodeId
     */
    activateNode: (nodeId) => {
      setActiveNode(nodeId);
    },
    /**
     * 取消激活
     */
    deactivateNode: () => {
      setActiveNode('');
    },
  };
};
