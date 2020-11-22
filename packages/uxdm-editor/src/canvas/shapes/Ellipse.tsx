import React, { FC } from 'react';
import { Ellipse as KonvaEllipse } from 'react-konva';

interface EllipseProps {
  id: string;
  rx: number;
  ry: number;
}
const Ellipse: FC<EllipseProps> = ({ rx, ry, ...props }) => {
  return <KonvaEllipse {...props} radiusX={rx} radiusY={ry} />;
};

export default Ellipse;
