import {
  IAbstractNode,
  IAbstractObject,
  AbstractObjectType,
  AbstractObjectParam,
} from '@uxdm/schema';
import { generateID } from '../utils';

/**
 * 抽象节点
 * @description
 * 在 UXDM 中，节点是表示图层的基础类型。
 * UXDM 会包含有许多不同类型的节点，每种都有自己的属性集。
 */
export abstract class AbstractObject implements IAbstractObject {
  protected constructor(params?: AbstractObjectParam) {
    if (params) {
      this.id = params.id || generateID();
    }
  }

  id: IAbstractNode['id'] = generateID();

  toString(): string {
    const json = this.toJSON();
    return JSON.stringify(json);
  }

  /**
   * 将属性输出为 json
   */
  toJSON(): AbstractObjectType {
    return {
      id: this.id,
    };
  }
}
