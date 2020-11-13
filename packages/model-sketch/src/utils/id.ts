import { v4 as uuidv4 } from 'uuid';

declare global {
  interface Window {
    IS_TEST_ENV: boolean;
  }
}
/**
 * 生成 uuid
 */
export const uuid = () => {
  // 专门为测试环境使用
  if (window.IS_TEST_ENV) {
    return 'UUID';
  }
  return uuidv4().toUpperCase();
};
