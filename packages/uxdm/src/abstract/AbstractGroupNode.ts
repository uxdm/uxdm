import {
  AbstractGroupNodeParams,
  AbstractGroupNodeType,
  IAbstractGroupNode,
} from '@uxdm/schema';
import { AbstractNode } from './AbstractNode';
import { ContainerLayout } from '../objects';

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
      this.children = params.children || [];

      // this.clipsContent = params.clipsContent || false;
      if (params.layout) {
        this.layout = new ContainerLayout(params.layout);
      }
    }
  }

  children: Array<unknown> = [];

  layout: ContainerLayout = new ContainerLayout();

  toJSON(): AbstractGroupNodeType {
    const json = super.toJSON();
    return {
      ...json,
      children: this.children,
      layout: this.layout.toJSON(),
    };
  }

  clipsContent: boolean = false;
}
