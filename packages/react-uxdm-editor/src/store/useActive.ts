import { useStore } from 'stook';

export const useActive = () => {
  const [activeNodeId, setId] = useStore<string | null>('ActiveNode', null);

  return {
    activeNodeId,
    /**
     * 激活节点
     * @param id
     */
    activeNode: (id) => {
      setId(id);
    },
    /**
     * 取消激活
     */
    deactivate: () => {
      setId(null);
    },
  };
};
