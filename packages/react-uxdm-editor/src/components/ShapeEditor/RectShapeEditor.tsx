import React from 'react';
import { EditorProps } from './ShapeEditor';

export function RectShapeEditor(props: EditorProps) {
  return (
    <div>
      <input
        value={props.options.fill}
        onChange={e => {
          props.onChange({ fill: e.target.value });
        }}
      />
    </div>
  );
}
