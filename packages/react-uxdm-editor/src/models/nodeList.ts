import { useMemo } from 'react';
import { useEditorStore } from '../store';

export const useNodeList = () => {
  const { nodes, layerTree } = useEditorStore();

  return {
    /**
     * 生成给框架消费的 NodeList
     */
    nodeList: useMemo(() => layerTree?.map((layer) => nodes[layer]), [
      layerTree,
      nodes,
    ]),
  };
};
