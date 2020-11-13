import { AbstractNode } from 'uxdm';
import { AbstractNodeParams } from '@uxdm/schema';
import { calcResizingConstraint, defaultExportOptions, uuid } from '../utils';
import { SketchBounding } from '../objects';
import Style from '../Style/Style';
import { ResizingConstraint } from '../constants';
import { CommonSketchProperty, SketchFormat } from '../types';

const DEFAULT_USER_INFO_SCOPE = 'UXDM_SKETCH';

/**
 * 抽象的 Sketch 对象
 */
export abstract class AbstractSketchObject extends AbstractNode {
  protected constructor(params?: AbstractNodeParams) {
    super(params);

    this.id = uuid();

    this.style = new Style();

    this.setResizingConstraint(ResizingConstraint.None);

    this.bounding = new SketchBounding(params);

    if (params) {
      this.name = params.name;
    }
  }

  /**
   * sketch 的定界框
   */
  bounding: SketchBounding = new SketchBounding();

  style: Style;

  userInfo: any = {};

  resizingConstraint: ResizingConstraint = ResizingConstraint.None;

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

  isFixedToViewport: boolean = false;

  /**
   * Sketch 内部的名称为 frame
   */
  get frame() {
    return this.bounding;
  }

  layerListExpanded: SketchFormat.LayerListExpanded =
    SketchFormat.LayerListExpanded.Undecided;

  /**
   * 锁定图层名称
   * */
  nameIsFixed = false;

  /**
   * 是否忽略遮罩链
   */
  shouldBreakMaskChain: boolean = false;

  /**
   * 是否存在剪贴蒙版
   */
  hasClippingMask = false;

  setFixedWidthAndHeight() {
    this.setResizingConstraint(
      ResizingConstraint.Width,
      ResizingConstraint.Height,
    );
  }

  /**
   * 设置调整尺寸的相关参数
   * @param constraints
   */
  setResizingConstraint(...constraints: ResizingConstraint[]) {
    this.resizingConstraint = calcResizingConstraint(...constraints);
  }

  // scope defines which Sketch plugin will have access to provided data via Settings.setLayerSettingForKey
  // you should set it to the plugin ID e.g. "com.bohemiancoding.sketch.testplugin"
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

  booleanOperation: SketchFormat.BooleanOperation =
    SketchFormat.BooleanOperation.NA;

  flow;

  exportOptions = defaultExportOptions;

  resizingType: SketchFormat.ResizeType = SketchFormat.ResizeType.Stretch;

  clippingMaskMode: number = 0;

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
      resizingType: this.resizingType,
      clippingMaskMode: this.clippingMaskMode,
    };
  }
}
