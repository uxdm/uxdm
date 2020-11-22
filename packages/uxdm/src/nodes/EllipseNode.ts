import {
  EllipseNodeParams,
  EllipseNodeType,
  IEllipseNode,
  NodeType,
  ShapeNodeType,
} from '../types';
import { AbstractNode } from '../abstract';
import { Bounding, Layout } from '../objects';
import { Style } from '../styles';

/**
 * 椭圆图形
 * @category 节点
 */
export class EllipseNode extends AbstractNode implements IEllipseNode {
  constructor(params?: EllipseNodeParams) {
    super(params);

    if (params) {
      const { cx, cy, rx, ry, name } = params;
      if (rx) {
        this.rx = rx;
      }
      if (ry) {
        this.ry = ry;
      }
      if (cx) {
        this.centerX = cx;
      }
      if (cy) {
        this.centerY = cy;
      }

      this.name = name || 'ellipse';
    }
  }

  /**
   * 类型
   */
  readonly type: NodeType = 'Ellipse';

  /**
   * x 轴半径
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

  get rx() {
    return this.width / 2;
  }

  set rx(rx: number) {
    this.left = this.x + (this.width / 2 - rx);
    this.width = rx * 2;
  }

  /**
   * Y 轴半径
   */
  get ry() {
    return this.height / 2;
  }

  set ry(ry: number) {
    this.top = this.x + (this.height / 2 - ry);
    this.height = ry * 2;
  }

  clone() {
    return this;
  }

  toJSON(): EllipseNodeType {
    const json = super.toJSON();
    return {
      ...json,
      rx: this.rx,
      ry: this.ry,
    };
  }

  /**
   * 从符合 Shape 的
   * @param json
   */
  static fromJSON(json: ShapeNodeType): EllipseNode {
    const { style, layout, bounding, visible, locked, id, name } = json;
    return new EllipseNode({
      layout: Layout.fromJSON(layout),
      style: Style.fromJSON(style),
      bounding: Bounding.fromJSON(bounding),
      visible,
      locked,
      id,
      name,
    });
  }
}
