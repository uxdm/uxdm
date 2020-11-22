import { GroupNode, Style, GroupNodeParams, GroupNodeType } from 'uxdm';

describe('GroupNode 类', () => {
  it('无参数', () => {
    const group = new GroupNode();
    expect(group.id).toBe('id');
    expect(group.name).toBe('group');

    expect(group.locked).toBe(false);
    expect(group.visible).toBe(true);
  });

  it('满参数', () => {
    const group = new GroupNode({
      id: '234',
      name: 'test',
      locked: true,
      visible: false,
      layout: {
        layoutMode: 'FLEXBOX',
        horizontalPadding: 10,
      },
      constraints: { horizontal: 'CENTER' },
      rotation: 12,
      x: 222,
      width: 123,
      height: 34,
      y: 24,
    });
    expect(group.id).toBe('234');
    expect(group.name).toBe('test');
    expect(group.locked).toBe(true);
    expect(group.visible).toBe(false);
    expect(group.constraints.horizontal).toBe('CENTER');
    expect(group.layout.layoutMode).toBe('FLEXBOX');
    expect(group.layout.horizontalPadding).toBe(10);
    expect(group.x).toEqual(222);
    expect(group.width).toEqual(123);
    expect(group.y).toEqual(24);
    expect(group.height).toEqual(34);
    expect(group.rotation).toEqual(12);
  });

  it('缺参数', () => {
    const group = new GroupNode({});
    expect(group.id).toBe('id');
    expect(group.name).toBe('group');
    expect(group.locked).toBe(false);
    expect(group.visible).toBe(true);
  });

  describe('相关方法', () => {
    it('toJSON', () => {
      const json: GroupNodeType = {
        id: 'id',
        layout: {
          constraints: {
            horizontal: 'MIN',
            vertical: 'MIN',
          },
          flexbox: {
            align: 'STRETCH',
            arrange: 'START',
            direction: 'HORIZONTAL',
            wrap: 'NONE',
          },
          horizontalPadding: 0,
          id: 'id',
          itemSpacing: 0,
          layoutMode: 'FREE',
          verticalPadding: 0,
          selfFlexboxAlign: 'AUTO',
          selfFlexboxGrow: 0,
          selfFlexboxOrder: 0,
          selfFlexboxShrink: 0,
          selfLayoutMode: 'AUTO',
        },
        locked: false,
        name: 'group',
        type: 'Group',
        visible: true,
        children: [],
        bounding: { x: 0, y: 0, width: 0, height: 0, rotation: 0 },
        style: {
          blendMode: 'NORMAL',
          borderOptions: {
            align: 'INSIDE',
            dashPattern: [],
            enabled: true,
            lineCap: 'NONE',
            lineJoin: 'MITER',
          },
          borders: [],
          fills: [],
          id: 'id',
          innerShadows: [],
          opacity: 1,
          shadows: [],
        },
      };
      const group = new GroupNode();

      expect(JSON.parse(JSON.stringify(group.toJSON()))).toStrictEqual(json);
    });
    it('clone', () => {
      const group = new GroupNode({});
      const newGroup = group.clone();
      expect(newGroup).toBeInstanceOf(GroupNode);
    });
    it('toString', () => {
      const group = new GroupNode();

      expect(typeof group.toString()).toBe('string');
    });
    describe('toParams', () => {
      it('无参数', () => {
        const group = new GroupNode();
        expect(group.toParams()).toEqual({ id: 'id' });
      });
      it('空参数', () => {
        const group = new GroupNode({});
        expect(group.toParams()).toEqual({ id: 'id' });
      });
      it('带有参数', () => {
        const params: GroupNodeParams = {
          constraints: { vertical: 'MAX', horizontal: 'STRETCH' },
          height: 100,
          width: 100,
          visible: false,
          locked: true,
          x: 10,
          y: 20,
          rotation: 30,
          id: '123',
          name: '3333',
        };
        const group = new GroupNode(params);

        expect(group.toParams()).toEqual(params);
      });
    });
    describe('部分样式属性', () => {
      it('不透明度', () => {
        const group = new GroupNode();
        expect(group.opacity).toEqual(1);
        group.opacity = 0.2;
        expect(group.opacity).toEqual(0.2);
      });
      it('混合模式', () => {
        const group = new GroupNode();
        expect(group.blendMode).toBe('NORMAL');
        group.blendMode = 'LIGHTEN';
        expect(group.blendMode).toBe('LIGHTEN');
      });
    });
  });

  //   it('蒙版正常', () => {
  //     const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
  //     rect.hasClippingMask = true;
  //
  //     const json = rect.toSketchJSON();
  //     expect(json.hasClippingMask).toBeTruthy();
  //   });
  // });

  describe('参数设计', () => {
    it('可以传入 width 和 height 作为参数', () => {
      const group = new GroupNode({ width: 100, height: 50 });
      expect(group.width).toBe(100);
      expect(group.height).toBe(50);
    });
    it('可以传入 constraints 作为参数', () => {
      const group = new GroupNode({ constraints: {} });

      expect(group.constraints.horizontal).toBe('MIN');
      expect(group.constraints.vertical).toBe('MIN');

      group.setConstraints({ horizontal: 'CENTER', vertical: 'SCALE' });
      expect(group.constraints.horizontal).toBe('CENTER');
      expect(group.constraints.vertical).toBe('SCALE');
    });

    describe('传入样式', () => {
      it('可以传入样式参数', () => {
        const group = new GroupNode({ style: { opacity: 0.4 } });
        expect(group.opacity).toEqual(0.4);
      });
      it('可以传入样式对象', () => {
        const style = new Style({ blendMode: 'SATURATION' });
        const group = new GroupNode({ style });
        expect(group.blendMode).toBe('SATURATION');
      });
    });
  });
});
