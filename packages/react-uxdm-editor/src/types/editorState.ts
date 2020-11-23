import { EditorStore } from './editorStore';

/**
 * 编辑器对外暴露的状态
 */
export type EditorState = Omit<EditorStore, 'language' | 'activeNode'>;
