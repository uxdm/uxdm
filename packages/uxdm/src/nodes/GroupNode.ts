import {
  AbstractNodeType,
  IGroupNode,
  GroupNodeType,
  GroupNodeParams,
} from '@uxdm/schema';

import { AbstractGroupNode } from '../abstract';

/**
 * 编组节点
 * @description
 * Group Node 是一个容器，用于在语义上对相关节点进行分组。
 *
 * 可以将它们看作是layers面板中的一个文件夹。
 *
 * 它与 Frame Node 不同，后者会定义布局，在HTML中更接近于<div>。
 * @category 节点
 */
export class GroupNode extends AbstractGroupNode implements IGroupNode {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(params?: GroupNodeParams) {
    super(params);
    if (params) {
      const { name } = params;
      this.name = name || 'group';
    }
  }

  name = 'group';

  readonly type: AbstractNodeType['type'] = 'Group';

  toJSON(): GroupNodeType {
    const json = super.toJSON();
    return { ...json };
  }

  clone() {
    const { id, ...params } = this.toJSON();
    return new GroupNode(params);
  }
}
