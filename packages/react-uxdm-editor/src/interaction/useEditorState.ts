import { useEffect } from 'react';
import { EditorState } from '../types';
import { useEditorStore } from '../store';

/**
 * 返回 UXDM Editor 的状态对象
 *
 * editor 的操作方法进行执行
 * 都会反应到视图上
 */
export const useEditorState = (props?: {
  state: EditorState;
  onChange?: (state: EditorState) => void;
}) => {
  const { nodes, layerTree } = useEditorStore(props?.state);

  useEffect(() => {
    if (props?.onChange) {
      props?.onChange({ nodes, layerTree });
    }
  }, [nodes, layerTree, props?.onChange]);

  return { nodes, layerTree };
};
