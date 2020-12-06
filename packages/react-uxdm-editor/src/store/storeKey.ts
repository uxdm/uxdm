import { EditorStore } from '../types';

export const EditorStateKey: Record<keyof EditorStore, string> = {
  nodes: 'UXDM_NODE_TREE',
  layerTree: 'UXDM_LAYER_TREE',
  activeNode: 'UXDM_ACTIVE_NODE',
  language: 'UXDM_LANGUAGE',
};
