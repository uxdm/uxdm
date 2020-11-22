import React from 'react';

interface ShapeMenuProps {
  children: React.ReactNode;
  leftOffset: number;
}

const ShapeMenuItem = () => <div />;

function ShapeMenu(props: ShapeMenuProps) {
  return <div {...props}>{props.children}</div>;
}

ShapeMenu.Item = ShapeMenuItem;

export { ShapeMenu };
