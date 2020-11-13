import { GroupNode } from 'uxdm';
import { GroupNodeType } from '@uxdm/schema';

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
      layout: { layoutMode: 'FLEXBOX', horizontalPadding: 10 },
    });
    expect(group.id).toBe('234');
    expect(group.name).toBe('test');
    expect(group.locked).toBe(true);
    expect(group.visible).toBe(false);
    expect(group.layout.layoutMode).toBe('FLEXBOX');
    expect(group.layout.horizontalPadding).toBe(10);
  });

  it('缺参数', () => {
    const group = new GroupNode({});
    expect(group.id).toBe('id');
    expect(group.name).toBe('group');
    expect(group.locked).toBe(false);
    expect(group.visible).toBe(true);
  });

  it('toJSON', () => {
    const json: GroupNodeType = {
      clipsContent: false,
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
      },
      locked: false,
      name: 'group',
      type: 'GROUP',
      visible: true,
      children: [],
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
  //   it('蒙版正常', () => {
  //     const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
  //     rect.hasClippingMask = true;
  //
  //     const json = rect.toSketchJSON();
  //     expect(json.hasClippingMask).toBeTruthy();
  //   });
  // });
});
