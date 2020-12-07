import React, { FC } from 'react';
import { Group as KonvaGroup } from 'react-konva';
import { LayerNode } from 'uxdm';
import { NodeToKonvaWrapper } from '../components';

export interface GroupProps {
  id: string;
  children: LayerNode[];
}
const Group: FC<GroupProps> = ({ children, ...props }) => {
  return (
    <KonvaGroup {...props}>
      {children?.map((node) => (
        <NodeToKonvaWrapper node={node} key={node.id} />
      ))}
    </KonvaGroup>
  );
};

export default Group;
