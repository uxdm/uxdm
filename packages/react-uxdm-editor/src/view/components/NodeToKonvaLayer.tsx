import React, { FC } from 'react';
import { LayerNode } from 'uxdm';
import { nodesMap } from '../nodes';
import { useEditorUtils } from '../../interaction';

interface NodeToKonvaLayerProps {
  node: LayerNode;
}

const NodeToKonvaLayer: FC<NodeToKonvaLayerProps> = ({ node }) => {
  const { nodePropsWrapper } = useEditorUtils();
  const Component = nodesMap[node.type];

  const props = nodePropsWrapper(node);
  return <Component {...props} />;
};

export default NodeToKonvaLayer;
