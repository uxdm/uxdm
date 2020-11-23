import { mutate } from 'stook';
import { mapValues } from 'lodash';
import { fromJSON } from 'uxdm';
import { EditorStateKey, useEditorStore } from '../../store';
import { EditorState } from '../../types';

const localStorageKey = 'UXDM_EDITOR_LOCAL_STORAGE';

export const useLocalStorage = () => {
  const { nodeTree, layerTree } = useEditorStore();

  return {
    /**
     * 保存状态到本地 localStorage
     * @param key
     */
    saveToLocalStorage: (key: string = localStorageKey) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          [EditorStateKey.layerTree]: layerTree,
          [EditorStateKey.nodeTree]: mapValues(nodeTree, (node) => {
            return node.toJSON();
          }),
        }),
      );
    },
    /**
     * 从本地初始化订阅状态树
     * @param key
     */
    loadFromLocalStorage: (key: string = localStorageKey) => {
      const savedState = localStorage.getItem(key);
      if (!savedState) return;

      const parsedSavedState: EditorState = JSON.parse(savedState);
      if (!parsedSavedState) return;

      mutate(
        EditorStateKey.nodeTree,
        mapValues(parsedSavedState[EditorStateKey.nodeTree], fromJSON),
      );
      mutate(
        EditorStateKey.layerTree,
        parsedSavedState[EditorStateKey.layerTree],
      );
    },
  };
};
