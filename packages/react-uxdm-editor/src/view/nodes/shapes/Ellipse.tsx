import React, { FC } from 'react';
import { Ellipse as KonvaEllipse } from 'react-konva';

export interface EllipseProps {
  id: string;
  rx: number;
  ry: number;
  shapeRef: any;
}
const Ellipse: FC<EllipseProps> = ({ rx, ry, shapeRef, ...props }) => {
  return <KonvaEllipse {...props} ref={shapeRef} radiusX={rx} radiusY={ry} />;
};

export default Ellipse;
