import React from 'react';
import { EditorProps } from './ShapeEditor';

export function TextShapeEditor(props: EditorProps) {
  return (
    <div>
      <input
        value={props.options.text}
        onChange={e => {
          props.onChange({ text: e.target.value });
        }}
      />

      <input
        value={props.options.fill}
        onChange={e => {
          props.onChange({ fill: e.target.value });
        }}
      />
    </div>
  );
}
