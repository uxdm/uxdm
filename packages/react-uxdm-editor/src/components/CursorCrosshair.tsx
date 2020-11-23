import React from 'react';
import { useMousePosition, useWindowSize } from '../hooks';

interface CursorCrosshairProps {
  colour: string;
  leftOffset: number;
  rightOffset: number;
}

export const CursorCrosshair = (props: CursorCrosshairProps) => {
  const { colour, leftOffset, rightOffset } = props;

  const { x, y } = useMousePosition();
  const windowSize = useWindowSize();

  const minX = leftOffset;
  const maxX = windowSize.width - rightOffset;

  const left = x < minX ? minX : x > maxX ? maxX : x;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left,
          height: '100%',
          width: '1px',
          backgroundColor: colour,
        }}
      >
        {/* Vertical line */}
      </div>

      <div
        style={{
          position: 'absolute',
          top: y,
          left: leftOffset,
          width: `calc(100% - ${leftOffset}px - ${rightOffset}px)`,
          height: '1px',
          backgroundColor: colour,
        }}
      >
        {/* Horizontal line */}
      </div>

      <div
        style={{
          position: 'absolute',
          top: y + 10,
          left: Math.min(left + 10, windowSize.width - rightOffset - 75),
          backgroundColor: '#eeeeee',
          color: '#333333',
          borderRadius: '8px',
          padding: '4px 6px',
          fontSize: '14px',
        }}
      >
        {left - leftOffset}, {y}
      </div>
    </>
  );
};
