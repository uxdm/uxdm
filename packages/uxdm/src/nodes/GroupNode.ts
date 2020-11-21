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
 * 可以将它们看作是一个文件夹。
 *
 * 它与 Frame Node 不同，后者会定义布局，在 HTML 中更接近于 `<div>`。
 * @category 节点
 */
export class GroupNode extends AbstractGroupNode implements IGroupNode {
  constructor(params?: GroupNodeParams) {
    super(params);
    if (params) {
      const { name } = params;
      this.name = name || 'group';
    }
  }

  /**
   * 组节点名称
   * @description 在初始化时传入 name 变量可改
   * @default group
   */
  name = 'group';

  /**
   * 节点类型为 Group
   */
  readonly type: AbstractNodeType['type'] = 'Group';

  /**
   *
   * @example
   *
   * 默认值
   * ``` json
   * {
   *   id: 'id',
   *   layout: {
   *     constraints: {
   *       horizontal: 'MIN',
   *       vertical: 'MIN',
   *     },
   *     flexbox: {
   *       align: 'STRETCH',
   *       arrange: 'START',
   *       direction: 'HORIZONTAL',
   *       wrap: 'NONE',
   *     },
   *     horizontalPadding: 0,
   *     id: 'id',
   *     itemSpacing: 0,
   *     layoutMode: 'FREE',
   *     verticalPadding: 0,
   *   },
   *   locked: false,
   *   name: 'group',
   *   type: 'Group',
   *   visible: true,
   *   children: [],
   *   bounding: { x: 0, y: 0, width: 0, height: 0, rotation: 0 },
   * }
   *
   * ```
   */
  toJSON(): GroupNodeType {
    const json = super.toJSON();
    return { ...json };
  }

  clone() {
    const { id, ...params } = this.toJSON();
    return new GroupNode(params);
  }

  toParams(): GroupNodeParams {
    const params = super.toParams();
    const { name } = this;
    return {
      ...params,
      name: name === 'group' ? undefined : name,
    };
  }
}
