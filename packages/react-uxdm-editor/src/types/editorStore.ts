import { LayerTree, NodeTree } from './node';
import { SupportedLocales } from './language';

/**
 * 编辑器状态
 */
export interface EditorStore {
  /**
   * 节点树
   */
  nodeTree: NodeTree;
  /**
   * 图层树
   */
  layerTree: LayerTree;
  /**
   * 选中的节点
   */
  activeNode: string;
  /**
   * 语言
   */
  language: SupportedLocales;
}
