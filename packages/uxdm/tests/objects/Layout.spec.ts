import { Layout } from 'uxdm';
import { LayoutParams } from '@uxdm/schema';

describe('Layout', () => {
  it('无参数', () => {
    const layout = new Layout();
    expect(layout.toJSON()).toEqual({
      constraints: {
        horizontal: 'MIN',
        vertical: 'MIN',
      },
      id: 'id',
    });
  });

  describe('方法属性', () => {
    describe('toParams', () => {
      it('无参数 ', () => {
        const layout = new Layout();
        expect(layout.toParams()).toBeUndefined();
      });
      it('默认参数 ', () => {
        const layout = new Layout({});
        expect(layout.toParams()).toBeUndefined();
      });
      it('自定参数', () => {
        const params: LayoutParams = {
          constraints: { vertical: 'CENTER', horizontal: 'MAX' },
          selfLayoutMode: 'FREE',
          selfFlexboxOrder: 12,
          selfFlexboxGrow: 3,
          selfFlexboxShrink: 2,
          selfFlexboxAlign: 'END',
          id: '123',
        };
        const layout = new Layout(params);
        expect(layout.toParams()).toEqual(params);
      });
    });
  });
});
