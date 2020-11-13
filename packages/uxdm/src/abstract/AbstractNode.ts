import {
  AbstractNodeParams,
  IAbstractNode,
  AbstractNodeType,
} from '@uxdm/schema';
import { AbstractObject } from './AbstractObject';
import { Bounding, Layout } from '../objects';
import { generateID } from '../utils';

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

  id: IAbstractNode['id'] = generateID();

  locked: IAbstractNode['locked'] = false;

  name: IAbstractNode['name'] = 'node';

  visible: IAbstractNode['visible'] = true;

  layout: Layout = new Layout();

  bounding: Bounding = new Bounding();

  get x() {
    return this.bounding.x;
  }

  set x(x: number) {
    this.bounding.x = x;
  }

  get y() {
    return this.bounding.y;
  }

  set y(y: number) {
    this.bounding.y = y;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  set centerX(centerX) {
    this.x = centerX - this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  set centerY(centerY) {
    this.y = centerY - this.height / 2;
  }

  get width() {
    return this.bounding.width;
  }

  set width(width: number) {
    this.bounding.width = width;
  }

  get height() {
    return this.bounding.height;
  }

  set height(height: number) {
    this.bounding.height = height;
  }

  get right() {
    return this.bounding.right;
  }

  set right(right) {
    this.bounding.right = right;
  }

  get top() {
    return this.bounding.top;
  }

  set top(top) {
    this.bounding.top = top;
  }

  get bottom() {
    return this.bounding.bottom;
  }

  set bottom(bottom) {
    this.bounding.bottom = bottom;
  }

  get left() {
    return this.bounding.left;
  }

  set left(left) {
    this.bounding.left = left;
  }

  get rotation() {
    return this.bounding.rotation;
  }

  set rotation(deg) {
    this.bounding.rotation = deg;
  }

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
      bounding: this.bounding.toJSON(),
    };
  }
}
