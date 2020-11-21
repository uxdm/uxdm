import { EllipseNodeParams, IEllipseNode, NodeType } from '../types';
import { AbstractNode } from '../abstract';

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
        this.cx = cx;
      }
      if (cy) {
        this.cy = cy;
      }

      this.name = name || 'ellipse';
    }
  }

  /**
   * 类型
   */
  readonly type: NodeType = 'Ellipse';

  /**
   * 获取 x 中点值
   */
  get cx() {
    return (this.left + this.right) / 2;
  }

  set cx(cx) {
    this.left = cx - this.width / 2;
    this.right = cx + this.width / 2;
  }

  /**
   * 获取 y 中点值
   */
  get cy() {
    return (this.top + this.bottom) / 2;
  }

  set cy(cy) {
    this.top = cy - this.height / 2;
    this.bottom = cy + this.height / 2;
  }

  get rx() {
    return this.width / 2;
  }

  set rx(rx: number) {
    this.left = this.x + (this.width / 2 - rx);
    this.width = rx * 2;
  }

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
}
