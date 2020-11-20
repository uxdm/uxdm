import { matrixToRotation } from '@uxdm/model-sketch/utils';

describe('matrixToRotation', () => {
  it('矩阵转角度', () => {
    expect(matrixToRotation(0.707107, 0.707107, -0.707107, 0.707107)).toBe(45);
    expect(matrixToRotation(0, 0, 0, 0)).toBe(0);
    expect(matrixToRotation(-0.66, -0.75, -0.56, 0.86)).toBe(146);
    expect(matrixToRotation(0.66, -0.75, -0.56, 0.86)).toBe(0);
    expect(matrixToRotation(0.66, -0.75, 0.56, 0.86)).toBe(326);
  });
});
