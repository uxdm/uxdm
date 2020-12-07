import { GroupNode, LayerNode } from 'uxdm';
import { useEditorOperation } from '../services';
import { useNodeTransformer } from './nodeSelector';

/**
 * 将节点参数信息映射给 editor
 */
export const useNodeMapper = (node: LayerNode) => {
  const { updateNodePosition, updateNodeBounding } = useEditorOperation();
  const { selectNode } = useNodeTransformer();

  const baseProps = () => {
    const { style } = node;
    const shadow = style.shadows.filter((i) => i.visible)[0];
    const shadowProps = shadow && {
      /**
       * 阴影
       */
      shadowColor: shadow.color.hex,
      shadowBlur: shadow.blur,
      shadowOpacity: shadow.opacity,
      shadowOffset: shadow.offset,
    };

    const border = style.borders.filter((i) => i.visible)[0];
    const borderProps = border && {
      stroke: border.color.hex,
      strokeWidth: border.thickness,
      lineJoin: border.lineJoin.toLowerCase(),
    };
    return {
      /**
       * 将 bounding 参数透传给 konva shape
       */
      ...node.bounding.toJSON?.(),
      /**
       * key
       */
      key: node.id,
      /**
       * id
       */
      nodeId: node.id,
      /**
       * 填色
       */
      fill: style.fills.filter((i) => i.visible)[0]?.hex,
      /**
       * 描边
       */
      ...borderProps,
      /**
       * 阴影
       */
      ...shadowProps,

      // ====== 交互 ====== //
      /**
       * 允许拖拽
       */
      draggable: true,
      /**
       * 拖拽响应方法
       * @param target
       */
      onDragEnd: ({ target }) => {
        updateNodePosition(node.id, {
          x: target.attrs.x,
          y: target.attrs.y,
        });
      },
      onClick: () => {
        selectNode(node.id);
      },
      onTransformEnd: ({ target }) => {
        // transformer 改变了节点的缩放值而不是它的宽高
        //
        // 因此在变换结束时重置缩放
        // 并更新长宽

        const scaleX = target.scaleX();
        const scaleY = target.scaleY();

        // we will reset it back
        target.scaleX(1);
        target.scaleY(1);

        updateNodeBounding(target.attrs.nodeId, {
          width: Math.max(5, target.width() * scaleX),
          height: Math.max(target.height() * scaleY),
          x: target.x(),
          y: target.y(),
          rotation: target.rotation(),
        });
      },
    };
  };

  if (node instanceof GroupNode) {
    const { children, ...layerProps } = node.toJSON();
    return {
      ...baseProps(),
      ...layerProps,
      children: node.children,
    };
  }

  return {
    ...baseProps(),
    /**
     * 将节点所有参数都透传给 konva shape
     */
    ...node?.toJSON(),
  };
};
