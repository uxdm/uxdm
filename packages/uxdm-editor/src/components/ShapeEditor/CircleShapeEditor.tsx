import React from 'react';
import { EditorProps } from './ShapeEditor';

export function CircleShapeEditor(props: EditorProps) {
  return (
    <div>
      <div>
        <div>
          Colour
          <input
            value={props.options.fill}
            onChange={(e) => {
              props.onChange({ fill: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
}
