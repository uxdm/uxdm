# React UXDM Editor

> TODO: description

## Usage

## 架构说明

- 框架层: 包含画布的四个区域: 工具条(Toolbar) 图层面板(LayerNode) 元素视察器(Inspector) 和 画布(Canvas)
- 图形层: 允许用户添加的图形, 接受外部传入的数据和交互,进而渲染到画布中
- 交互层: 用户与界面的交互操作, 用户与编辑器的交互模式, 支持与框架中的任何元素进行交互
- 数据层: 存储编辑器状态的数据模型

### 数据层

提供底层的操作数据的能力 (low-level) 通过 hooks 对外暴露

#### 节点数据

基本的数据模型

```typescript
/**
 * 编辑器状态
 */
export interface EditorState {
  /**
   * 节点树
   */
  nodeTree: Record<string, ShapeNodeType>;
  /**
   * 图层树
   */
  layerTree: LayerTree;
}
```

### 节点操作能力 action

low-level 的节点操作能力称为 action 包含基本节点

- 添加节点
- 删除节点
- 修改节点参数
- 修改图层树节点位置关系

UXDM Editor 的 action 都以 hooks 形式提供, 会自动更新 state 值

可以组合成 high-level 的交互能力
