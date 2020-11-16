import { AbstractNode } from 'uxdm/abstract';
import { AbstractNodeParams } from '@uxdm/schema';
import {
  calcResizingConstraint,
  containsAllItems,
  defaultExportOptions,
  noHeight,
  noWidth,
  uuid,
} from '../utils';
import { SketchBounding } from '../objects';
import Style from '../styles/Style';
import { ResizingConstraint } from '../constants';
import { CommonSketchProperty, SketchFormat } from '../types';

const DEFAULT_USER_INFO_SCOPE = 'UXDM_SKETCH';

export type SketchLayerParams = AbstractNodeParams;

/**
 * 抽象的 Sketch 对象
 */
export abstract class AbstractSketchObject extends AbstractNode {
  protected constructor(params?: SketchLayerParams) {
    super(params);

    this.id = uuid();

    this.style = new Style();

    this.bounding = new SketchBounding(params);
  }

  /**
   * sketch 的定界框
   */
  bounding: SketchBounding = new SketchBounding();

  /**
   * 内部的名字
   */
  get frame() {
    return this.bounding;
  }

  style: Style;

  /**
   * 保存在图层里的用户信息
   */
  userInfo: Record<string, any> | undefined;

  get isLocked() {
    return this.locked;
  }

  set isLocked(locked) {
    this.locked = locked;
  }

  get isVisible() {
    return this.visible;
  }

  set isVisible(visible) {
    this.visible = visible;
  }

  /**
   * 横向翻转定界框
   */
  get isFlippedHorizontal() {
    return this.bounding.horizontalFlipped;
  }

  /**
   * 设置是否翻转定界框
   */
  set isFlippedHorizontal(horizontalFlipped: boolean) {
    this.bounding.horizontalFlipped = horizontalFlipped;
  }

  /**
   * 横向翻转定界框
   */
  get isFlippedVertical() {
    return this.bounding.verticalFlipped;
  }

  /**
   * 设置是否翻转定界框
   */
  set isFlippedVertical(verticalFlipped: boolean) {
    this.bounding.verticalFlipped = verticalFlipped;
  }

  /**
   * 在原型中固定位置
   */
  isFixedToViewport: boolean = false;

  /**
   * 展开图层
   */
  layerListExpanded: SketchFormat.LayerListExpanded =
    SketchFormat.LayerListExpanded.Undecided;

  /**
   * 锁定图层名称
   * */
  nameIsFixed = false;

  /**
   * 是否忽略遮罩链
   */
  shouldBreakMaskChain = false;

  /**
   * 是否存在剪贴蒙版
   */
  hasClippingMask = false;

  booleanOperation: SketchFormat.BooleanOperation =
    SketchFormat.BooleanOperation.NA;

  flow;

  exportOptions = defaultExportOptions;

  clippingMaskMode: number = 0;

  get resizingConstraint(): ResizingConstraint {
    const { horizontal, vertical } = this.constraints;
    let xConstraint: ResizingConstraint[];
    let yConstraint: ResizingConstraint[];
    switch (horizontal) {
      case 'MIN':
        xConstraint = [ResizingConstraint.Left, ResizingConstraint.Width];
        break;
      case 'MAX':
        xConstraint = [ResizingConstraint.Right, ResizingConstraint.Width];
        break;
      default:
      case 'SCALE':
        xConstraint = [];
        break;
      case 'CENTER':
        xConstraint = [ResizingConstraint.Width];
        break;
      case 'STRETCH':
        xConstraint = [ResizingConstraint.Left, ResizingConstraint.Right];
        break;
    }
    switch (vertical) {
      case 'MIN':
        yConstraint = [ResizingConstraint.Top, ResizingConstraint.Height];
        break;
      case 'MAX':
        yConstraint = [ResizingConstraint.Bottom, ResizingConstraint.Height];
        break;
      default:
      case 'SCALE':
        yConstraint = [];
        break;
      case 'CENTER':
        yConstraint = [ResizingConstraint.Height];
        break;
      case 'STRETCH':
        yConstraint = [ResizingConstraint.Top, ResizingConstraint.Bottom];
        break;
    }
    return calcResizingConstraint(...xConstraint, ...yConstraint);
  }

  /**
   * 设置调整尺寸的相关参数
   * @param constraints
   */
  setResizingConstraint(...constraints: ResizingConstraint[]) {
    const validValues = Object.values(ResizingConstraint);

    if (!constraints.every((arg) => validValues.includes(arg))) {
      throw new Error('Unknown resizing constraint');
    } else if (containsAllItems(noHeight, constraints)) {
      throw new Error("Can't fix height when top & bottom are fixed");
    } else if (containsAllItems(noWidth, constraints)) {
      throw new Error("Can't fix width when left & right are fixed");
    }
    // 输入 None 时自由拉伸
    if (constraints.includes(ResizingConstraint.None)) {
      this.constraints.horizontal = 'SCALE';
      this.constraints.vertical = 'SCALE';
    } else {
      // ==== 设置 X 轴 ===== //
      // 固定左右
      if (
        constraints.includes(ResizingConstraint.Right) &&
        constraints.includes(ResizingConstraint.Left)
      ) {
        this.constraints.horizontal = 'STRETCH';
      }
      // 固定右边
      else if (constraints.includes(ResizingConstraint.Right)) {
        this.constraints.horizontal = 'MAX';
      }
      // 固定左边
      else if (constraints.includes(ResizingConstraint.Left)) {
        this.constraints.horizontal = 'MIN';
      }
      // 固定宽度
      else if (constraints.includes(ResizingConstraint.Width)) {
        this.constraints.horizontal = 'CENTER';
      }

      // ==== 设置 Y 轴 ===== //

      // 固定上下
      if (
        constraints.includes(ResizingConstraint.Top) &&
        constraints.includes(ResizingConstraint.Bottom)
      ) {
        this.constraints.vertical = 'STRETCH';
      }
      // 固定底部
      else if (constraints.includes(ResizingConstraint.Bottom)) {
        this.constraints.vertical = 'MAX';
      }
      // 固定顶部
      else if (constraints.includes(ResizingConstraint.Top)) {
        this.constraints.vertical = 'MIN';
      }
      // 固定高度
      else if (constraints.includes(ResizingConstraint.Height)) {
        this.constraints.vertical = 'CENTER';
      }
    }
  }

  /**
   * @description
   *
   * scope defines which Sketch plugin will have access to provided data
   * 通过 Settings.setLayerSettingForKey 获取该值
   * 需要符合插件 id
   * 例如: "com.bohemiancoding.sketch.testplugin"
   */
  setUserInfo(
    key: string | number,
    value: any,
    scope = DEFAULT_USER_INFO_SCOPE,
  ) {
    this.userInfo = this.userInfo || {};
    this.userInfo[scope] = this.userInfo[scope] || {};
    this.userInfo[scope][key] = value;
  }

  getUserInfo(key: string | number, scope = DEFAULT_USER_INFO_SCOPE) {
    return this.userInfo && this.userInfo[scope] && this.userInfo[scope][key];
  }

  toSketchJSON(): CommonSketchProperty {
    return {
      do_objectID: this.id,
      name: this.name,
      nameIsFixed: this.nameIsFixed,
      resizingConstraint: this.resizingConstraint,
      isFixedToViewport: this.isFixedToViewport,
      isFlippedHorizontal: this.isFlippedHorizontal,
      isFlippedVertical: this.isFlippedVertical,
      userInfo: this.userInfo,
      hasClippingMask: this.hasClippingMask,
      frame: this.frame.toSketchJSON(),
      isLocked: this.isLocked,
      isVisible: this.isVisible,
      booleanOperation: this.booleanOperation,
      exportOptions: this.exportOptions,
      flow: this.flow,
      layerListExpandedType: this.layerListExpanded,
      style: this.style.toSketchJSON(),
      shouldBreakMaskChain: this.shouldBreakMaskChain,
      rotation: this.rotation,
      resizingType: SketchFormat.ResizeType.Stretch,
      clippingMaskMode: this.clippingMaskMode,
    };
  }
}

export default AbstractSketchObject;
