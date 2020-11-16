import { Border } from '../../src/styles';

describe('Border 类', () => {
  it('toSketchJSON', () => {
    const borderOptions = new Border();
    expect(borderOptions.toSketchJSON()).toStrictEqual({
      _class: 'borderOptions',
      isEnabled: true,
      dashPattern: [1, 1],
      lineCapStyle: 0,
      lineJoinStyle: 0,
    });
  });
});
