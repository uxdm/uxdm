import { useLocalStorage } from './useLocalStorage';
import { useManipulateNodeTree } from './useManipulateNodeTree';
import { useActive } from './useActive';

/**
 * 收集有 Editor 所有可用的 operation
 * @description low-level 操作数据的方法
 */
export const useEditorOperation = () => {
  return { ...useLocalStorage(), ...useManipulateNodeTree(), ...useActive() };
};

export * from './useActive';
export * from './useLocalStorage';
export * from './useManipulateNodeTree';
