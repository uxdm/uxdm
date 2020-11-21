import {
  AbstractGroupNodeParams,
  AbstractGroupNodeType,
  IAbstractGroupNode,
} from '@uxdm/schema';
import { AbstractNode } from './AbstractNode';
import { ContainerLayout } from '../objects';

/**
 * 抽象组节点
 * @description
 * 组节点可以包含子级
 *
 * @category 抽象对象
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
