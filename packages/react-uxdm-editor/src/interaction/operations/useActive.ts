import { useActiveNode } from '../../store';

export const useActive = () => {
  const { activeNode, setActiveNode } = useActiveNode();

  return {
    activeNode,
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
    deactivate: () => {
      setActiveNode('');
    },
  };
};
