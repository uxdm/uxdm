import { Group, Rectangle, SketchFormat } from '@uxdm/model-sketch';

describe('Group', () => {
  it('无参数', () => {
    const group = new Group();
    expect(group).toBeInstanceOf(Group);
  });
  it('layout 参数', () => {
    const group = new Group({ layout: { constraints: { horizontal: 'MIN' } } });
    expect(group.layout.constraints.horizontal).toEqual('MIN');
  });
  describe('相关方法', () => {
    const group = new Group();
    it('boundingSize', () => {
      let boundingSize;
      boundingSize = group.boundingSize;
      expect(boundingSize.height).toEqual(0);
      expect(boundingSize.width).toEqual(0);

      const rect2 = new Rectangle({ x: 0, y: 0, width: 50, height: 80 });
      const rect1 = new Rectangle({ x: 0, y: 0, width: 200, height: 100 });
      group.addLayer(rect1);
      group.addLayer(rect2);
      boundingSize = group.boundingSize;
      expect(boundingSize.height).toEqual(100);
      expect(boundingSize.width).toEqual(200);

      group.width = 50;
      group.height = 50;
      boundingSize = group.boundingSize;
      expect(boundingSize.height).toEqual(50);
      expect(boundingSize.width).toEqual(50);

      group.width = 250;
      group.height = 150;
      boundingSize = group.boundingSize;
      expect(boundingSize.width).toEqual(250);
      expect(boundingSize.height).toEqual(150);
    });
    it('groupLayout', () => {
      expect(group.groupLayout).toEqual({
        _class: SketchFormat.ClassValue.MSImmutableFreeformGroupLayout,
      });
      group.setGroupLayout('LEFT_TO_RIGHT');
      expect(group.groupLayout).toEqual({
        _class: SketchFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: 0,
        layoutAnchor: 0,
      });
    });
  });
  it('toSketchJSON', () => {
    const group = new Group({ x: 0, y: 50, width: 200, height: 100 });

    const json = group.toSketchJSON();

    expect(json._class).toBe('group');
    expect(json.frame.width).toEqual(200);
    expect(json.frame.height).toEqual(100);
    expect(json.frame.x).toEqual(0);
    expect(json.frame.y).toEqual(50);
  });

  it('添加子级', () => {
    const rect = new Rectangle();
    const group = new Group({ children: [rect] });

    const json = group.toSketchJSON();
    expect(json.layers.length).toEqual(1);
  });
});
