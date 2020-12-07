import React, { FC } from 'react';
import { Circle as KonvaCircle } from 'react-konva';

export interface CircleProps {
  id: string;
  radius: number;
  shapeRef: any;
}
const Circle: FC<CircleProps> = ({ radius, shapeRef, ...props }) => {
  return <KonvaCircle {...props} ref={shapeRef} radius={radius} />;
};

export default Circle;
