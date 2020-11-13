import {
  AbstractNodeParams,
  IAbstractNode,
  AbstractNodeType,
  ILayout,
} from '@uxdm/schema';
import { AbstractObject } from './AbstractObject';
import { Layout } from '../objects';

/**
 * 抽象节点
 * @description
 * 在 UXDM 中，节点是表示图层的基础类型。
 * UXDM 会包含有许多不同类型的节点，每种都有自己的属性集。
 */
export abstract class AbstractNode
  extends AbstractObject
  implements IAbstractNode<AbstractNode> {
  protected constructor(params?: AbstractNodeParams) {
    super(params);
    if (params) {
      this.visible = params.visible ?? true;
      this.name = params.name || 'node';
      this.locked = params.locked || false;
      if (params.layout) {
        this.layout = new Layout(params.layout);
      }
    }
  }

  abstract readonly type: IAbstractNode['type'];

  /**
   * 复制方法
   */
  abstract clone();

  id: IAbstractNode['id'];

  locked: IAbstractNode['locked'] = false;

  name: IAbstractNode['name'] = 'node';

  visible: IAbstractNode['visible'] = true;

  layout: ILayout = new Layout();

  /**
   * 将属性输出为 json
   */
  toJSON(): AbstractNodeType {
    const json = super.toJSON();
    return {
      ...json,
      type: this.type,
      locked: this.locked,
      name: this.name,
      visible: this.visible,
      layout: this.layout.toJSON(),
    };
  }
}
