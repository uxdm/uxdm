import React, { FC } from 'react';
import { Circle as KonvaCircle } from 'react-konva';

interface CircleProps {
  id: string;
  radius: number;
}
const Circle: FC<CircleProps> = ({ radius, ...props }) => {
  return <KonvaCircle {...props} radius={radius} />;
};

export default Circle;
