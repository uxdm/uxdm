---
title: 服务层架构
order: 3
---

## 服务层架构

服务层绑定 store 和 view, 做三件事情:

- 给 App 提供操作 store 层数据的服务, 以 operation 和 action 的形式提供操作接口;
- 给 View 提供绑定 store 数据的服务, 将 store 中的 node 数据 map 到 Canvas 中,以 nodePropsWrapper 的形式提供;
- 给 Canvas 提供响应用户交互行为的服务,

### 为什么这么做?

一个服务代表了 Editor 的某种能力, 需要包含即从数据到视图,再到交互的整个生命周期

## store 层数据服务

## view 层数据绑定服务
