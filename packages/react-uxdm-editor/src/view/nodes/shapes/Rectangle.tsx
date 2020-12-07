import React, { FC } from 'react';
import { Rect } from 'react-konva';

export interface RectangleProps {
  id: string;
  shapeRef: any;
}

const Rectangle: FC<RectangleProps> = ({ id, shapeRef, ...props }) => {
  return <Rect key={id} ref={shapeRef} {...props} />;
};

export default Rectangle;
