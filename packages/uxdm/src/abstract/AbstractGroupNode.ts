import {
  AbstractGroupNodeParams,
  AbstractGroupNodeType,
  AbstractNodeParams,
  ChildNode,
  ChildNodeType,
  IAbstractGroupNode,
} from '../types';
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
    super(params as AbstractNodeParams);
    if (params) {
      const { children, layout, constraints } = params;

      if (children) {
        children.forEach((childNode) => {
          // @ts-ignore
          this.children.push(childNode);
        });
      }

      // this.clipsContent = params.clipsContent || false;
      if (layout) {
        this.layout = new ContainerLayout(params.layout);
      }

      if (constraints) {
        this.setConstraints({
          horizontal: constraints.horizontal,
          vertical: constraints.vertical,
        });
      }
    }
  }

  children: Array<ChildNode> = [];

  layout: ContainerLayout = new ContainerLayout();

  clipsContent: boolean = false;

  toJSON(): AbstractGroupNodeType {
    const json = super.toJSON();
    return {
      ...json,
      children: this.children.map((node) => node.toJSON() as ChildNodeType),
      layout: this.layout.toJSON(),
    };
  }
}
