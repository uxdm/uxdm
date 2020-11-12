import {
  AbstractGroupNodeParams,
  AbstractGroupNodeType,
  IAbstractGroupNode,
} from '@uxdm/schema';
import { AbstractNode } from './AbstractNode';

/**
 * 抽象节点
 * @description
 * 在 UXDM 中，节点是表示图层的基础类型。
 * UXDM 会包含有许多不同类型的节点，每种都有自己的属性集。
 */
export abstract class AbstractGroupNode
  extends AbstractNode
  implements IAbstractGroupNode {
  protected constructor(params?: AbstractGroupNodeParams) {
    super(params);
    if (params) {
      this.children = params.children;
    }
  }

  children: Array<unknown>;

  toJSON(): AbstractGroupNodeType {
    const json = super.toJSON();
    return {
      ...json,
      children: this.children,
    };
  }
}
