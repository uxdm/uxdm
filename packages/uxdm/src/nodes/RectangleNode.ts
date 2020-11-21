import {
  AbstractNodeType,
  IRectangleNode,
  RectangleNodeType,
  RectangleNodeParams,
} from '@uxdm/schema';

import { AbstractNode } from '../abstract';
import { Layout } from '../objects';

/**
 * 基础矩形节点
 * @description
 *
 * 可以将它们看作是layers面板中的一个文件夹。
 * @category 节点
 */
export class RectangleNode extends AbstractNode implements IRectangleNode {
  constructor(params?: RectangleNodeParams) {
    super(params);

    if (params) {
      const { cornerRadius, name, layout } = params;
      this.cornerRadius = cornerRadius || 0;
      this.name = name || 'rectangle';

      if (layout) {
        this.layout = new Layout(layout);
      }
    }
  }

  name = 'rectangle';

  cornerRadius: number = 0;

  readonly type: AbstractNodeType['type'] = 'Rectangle';

  toJSON(): RectangleNodeType {
    const json = super.toJSON();
    return { ...json, cornerRadius: this.cornerRadius };
  }

  clone() {
    const { id, ...params } = this.toJSON();
    return new RectangleNode(params);
  }
}
