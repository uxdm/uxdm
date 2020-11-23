import { useEffect } from 'react';
import { EditorState } from '../types';
import { useEditorStore } from '../store';

/**
 * 返回一个 UXDMEditor 对象实体
 *
 * editor 的操作方法进行执行
 * 都会反应到视图上
 */
export const useEditorState = (props?: {
  state: EditorState;
  onChange?: (state: EditorState) => void;
}) => {
  const state = useEditorStore(props?.state);

  useEffect(() => {
    if (props?.onChange) {
      props?.onChange(state);
    }
  }, [state, props?.onChange]);

  return state;
};
