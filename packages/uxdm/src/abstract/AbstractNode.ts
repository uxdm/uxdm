import {
  AbstractNodeParams,
  IAbstractNode,
  AbstractNodeType,
} from '@uxdm/schema';

/**
 * 抽象节点
 * @description
 * 在 UXDM 中，节点是表示图层的基础类型。
 * UXDM 会包含有许多不同类型的节点，每种都有自己的属性集。
 */
export abstract class AbstractNode implements IAbstractNode<AbstractNode> {
  protected constructor(params?: AbstractNodeParams) {
    if (params) {
      this.visible = params.visible;
      this.name = params.name;
      this.locked = params.locked;
      this.id = params.id;
    }
  }

  abstract readonly type: IAbstractNode['type'];

  /**
   * 复制方法
   */
  abstract clone();

  id: IAbstractNode['id'];

  locked: IAbstractNode['locked'];

  name: IAbstractNode['name'];

  visible: IAbstractNode['visible'];

  toString(): string {
    const json = this.toJSON();
    return JSON.stringify(json);
  }

  /**
   * 将属性输出为 json
   */
  toJSON(): AbstractNodeType {
    return {
      type: this.type,
      id: this.id,
      locked: this.locked,
      name: this.name,
      visible: this.visible,
    };
  }
}
