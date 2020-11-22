import {
  CircleNodeParams,
  CircleNodeType,
  ICircleNode,
  NodeType,
} from '../types';
import { AbstractNode } from '../abstract';
import { Bounding, Layout } from '../objects';
import { Style } from '../styles';

/**
 * 椭圆图形
 * @category 节点
 */
export class CircleNode extends AbstractNode implements ICircleNode {
  constructor(params?: CircleNodeParams) {
    super(params);

    if (params) {
      const { cx, cy, radius, name } = params;

      // 从圆心创建
      if (radius) {
        this.radius = radius;
      }

      if (typeof cx === 'number' && typeof cy === 'number') {
        if (cx) {
          this.centerX = cx;
        }
        if (cy) {
          this.centerY = cy;
        }
      }

      this.name = name || 'circle';
    } else {
      this.radius = 0;
    }
  }

  name = 'circle';

  /**
   * 类型
   */
  readonly type: NodeType = 'Circle';

  /**
   * x 轴中点
   */
  get cx() {
    return this.centerX;
  }

  set cx(cx) {
    this.centerX = cx;
  }

  /**
   * 获取 y 中点值
   */
  get cy() {
    return this.centerY;
  }

  set cy(cy) {
    this.centerY = cy;
  }

  /**
   * 获取半径
   */
  get radius() {
    return this.width / 2;
  }

  /**
   * 更新半径
   * @param radius
   */
  set radius(radius) {
    this.width = radius * 2;
    this.height = radius * 2;
  }

  clone() {
    return this;
  }

  toJSON(): CircleNodeType {
    const json = super.toJSON();
    return {
      ...json,
      radius: this.radius,
    };
  }

  /**
   * 从符合 Shape 的
   * @param json
   */
  static fromJSON(json: CircleNodeType): CircleNode {
    const { style, layout, bounding, visible, locked, id, name, radius } = json;
    return new CircleNode({
      layout: Layout.fromJSON(layout),
      style: Style.fromJSON(style),
      bounding: Bounding.fromJSON(bounding),
      visible,
      locked,
      id,
      name,
      radius,
    });
  }
}
