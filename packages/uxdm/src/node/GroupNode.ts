import {
  AbstractNodeType,
  IGroupNode,
  GroupNodeType,
  GroupNodeParams,
  NodeType,
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
 */
export class GroupNode extends AbstractGroupNode implements IGroupNode {
  constructor(params: GroupNodeParams) {
    super(params);

    if (params) {
      this.testGroup = params.testGroup;
    }
  }

  readonly type: AbstractNodeType['type'] = NodeType.Group;

  testGroup: string;

  toJSON(): GroupNodeType {
    const json = super.toJSON();
    return { ...json, testGroup: this.testGroup };
  }

  clone() {
    const { id, ...params } = this.toJSON();
    return new GroupNode(params);
  }
}
