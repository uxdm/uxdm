import { useEffect, useRef } from 'react';
import { useActive } from '../services';

/**
 * 选择节点的对象
 * @param node
 */
export const useNodeSelector = (node) => {
  const targetRef = useRef();
  const transformerRef = useRef(null);

  const { activeNodeId } = useActive();
  const isSelected = node.id === activeNodeId || false;

  /**
   * 被选中时进行激活
   */
  useEffect(() => {
    if (isSelected) {
      // 需要手动将节点 attach 上去
      transformerRef.current.nodes([targetRef.current]);

      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return {
    /**
     * transformer 的容器
     */
    transformerRef,
    /**
     * 目标对象的容器
     */
    targetRef,
    /**
     * 判断是否选中
     */
    isSelected,
  };
};

export const useNodeTransformer = () => {
  const { deactivateNode, activateNode } = useActive();

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      deactivateNode();
    }
  };
  return {
    checkDeselect,
    selectNode: (nodeId) => {
      activateNode(nodeId);
    },
  };
};
