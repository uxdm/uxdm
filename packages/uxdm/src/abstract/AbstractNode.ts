import {
  AbstractNodeParams,
  IAbstractNode,
  AbstractNodeType,
  LayoutConstraint,
  StyleParams,
  BlendModeType,
} from '../types';
import { AbstractObject } from './AbstractObject';
import { Bounding, Layout } from '../objects';
import { Style } from '../styles';

/**
 * 抽象节点
 * @description
 * 在 UXDM 中，节点是表示图层的基础类型。
 * UXDM 会包含有许多不同类型的节点，每种都有自己的属性集。
 * @category 抽象对象
 */
export abstract class AbstractNode
  extends AbstractObject
  implements IAbstractNode<AbstractNode> {
  /**
   * 构造函数
   */
  protected constructor(params?: AbstractNodeParams) {
    super(params);
    if (params) {
      const {
        constraints,
        layout,
        width,
        height,
        x,
        y,
        rotation,
        style,
      } = params;

      this.visible = params.visible ?? true;
      this.name = params.name || 'node';
      this.locked = params.locked || false;

      // ===== 布局参数 ===== //
      if (layout) {
        this.layout = new Layout(params.layout);
      }

      if (constraints) {
        this.setConstraints({
          horizontal: constraints.horizontal,
          vertical: constraints.vertical,
        });
      }

      // ===== 定界框参数 ===== //
      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 0;
      this.height = height || 0;
      this.rotation = rotation || 0;

      // ===== 样式参数 ===== //
      if (style) {
        this.style =
          style instanceof Style ? style : new Style(style as StyleParams);
      }
    }
  }

  abstract readonly type: IAbstractNode['type'];

  /**
   * 复制方法
   */
  abstract clone();

  locked: IAbstractNode['locked'] = false;

  name: IAbstractNode['name'] = 'node';

  visible: IAbstractNode['visible'] = true;

  /**
   * 布局
   */
  layout: Layout = new Layout();

  /**
   * 定界框
   */
  bounding: Bounding = new Bounding();

  /**
   * 样式
   */
  style: Style = new Style();

  /**
   * 布局约束
   * @description
   * 将布局模块里面的约束透出来
   */
  get constraints() {
    return this.layout.constraints;
  }

  /**
   * 设置约束
   * @param horizontal 横向约束
   * @param vertical 纵向约束
   */
  setConstraints({ horizontal, vertical }: Partial<LayoutConstraint>) {
    if (horizontal) {
      this.layout.constraints.horizontal = horizontal;
    }
    if (vertical) {
      this.layout.constraints.vertical = vertical;
    }
  }

  /**
   * X 坐标值
   */
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
   * 获取节点的不透明度
   */
  get opacity() {
    return this.style.opacity;
  }

  /**
   * 设置节点的不透明度
   * @param opacity
   */
  set opacity(opacity) {
    this.style.opacity = opacity;
  }

  /**
   * 获取样式的混合模式
   */
  get blendMode() {
    return this.style.blendMode;
  }

  /**
   * 设置混合模式
   * @param blendMode
   */
  set blendMode(blendMode: BlendModeType) {
    this.style.blendMode = blendMode;
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
      style: this.style.toJSON(),
    };
  }

  /**
   * 输出入参
   */
  toParams(): AbstractNodeParams {
    const params = super.toParams();

    const bounding = this.bounding.toParams();
    const { locked, visible } = this;

    const layoutParams = this.layout.toParams();
    let layout = layoutParams;
    if (layoutParams) {
      const { id, ...res } = layoutParams;
      layout = res;
    }

    return {
      ...params,
      ...bounding,
      ...layout,
      locked: locked || undefined,
      visible: visible ? undefined : visible,
      name: this.name,
    };
  }
}
