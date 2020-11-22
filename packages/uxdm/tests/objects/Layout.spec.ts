import { Layout, LayoutParams, LayoutType } from 'uxdm';

describe('Layout', () => {
  it('无参数', () => {
    const layout = new Layout();
    expect(layout.toJSON()).toEqual({
      constraints: {
        horizontal: 'MIN',
        vertical: 'MIN',
      },
      id: 'id',
      selfFlexboxAlign: 'AUTO',
      selfFlexboxGrow: 0,
      selfFlexboxOrder: 0,
      selfFlexboxShrink: 0,
      selfLayoutMode: 'AUTO',
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
    describe('fromJSON', () => {
      const json: LayoutType = {
        constraints: {
          horizontal: 'SCALE',
          vertical: 'STRETCH',
        },
        id: '123',
        selfFlexboxOrder: 2,
        selfFlexboxShrink: 1,
        selfFlexboxAlign: 'END',
        selfFlexboxGrow: 3,
        selfLayoutMode: 'FREE',
      };
      const layout = Layout.fromJSON(json);
      expect(layout.toJSON()).toEqual(json);
    });
  });
});
