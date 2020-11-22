import React, { FC } from 'react';
import { Rect } from 'react-konva';

interface RectangleProps {
  id: string;
}

const Rectangle: FC<RectangleProps> = ({ id, ...props }) => {
  return <Rect key={id} {...props} />;
};

export default Rectangle;
