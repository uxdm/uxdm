import React from "react";import { ShapeTypes } from "../../index";
import { CircleShapeEditor } from "./CircleShapeEditor";
import { RectShapeEditor } from "./RectShapeEditor";
import { TextShapeEditor } from "./TextShapeEditor";

export interface EditorProps {
  options: {
    [key: string]: any;
  };
  onChange: (newOptions: { [key: string]: any }) => void;
}

type ShapeEditorProps = EditorProps & { type: ShapeTypes };

export function ShapeEditor(props: ShapeEditorProps) {
  const { type, ...rest } = props;

  const shapeToEditorMap = {
    [ShapeTypes.Circle]: CircleShapeEditor,
    [ShapeTypes.Rectangle]: RectShapeEditor,
    [ShapeTypes.Text]: TextShapeEditor
  };

  const Editor = shapeToEditorMap[props.type];

  return <Editor {...rest} />;
}
