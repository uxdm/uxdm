import React from 'react';
import { Circle, Layer, Rect, Stage, Text } from 'react-konva';
import { nanoid } from 'nanoid';
import cloneDeep from 'lodash/cloneDeep';

import { Actions } from './components/Actions';
import { Flex } from './components/Flex';
import { ShapeEditor } from './components/ShapeEditor/ShapeEditor';
import { useElementSize } from './hooks';

export enum ShapeTypes {
  Circle = 'Circle',
  Rectangle = 'Rect',
  Text = 'Text',
}

interface NewShape {
  label: string;
  type: ShapeTypes;
  options: {
    [key: string]: any;
  };
}

type Shape = { id: string } & NewShape;

interface SavedState {
  shapes: {
    [key: string]: Shape;
  };
  shapesOrder: string[];
}

const shapesMap = {
  [ShapeTypes.Circle]: Circle,
  [ShapeTypes.Rectangle]: Rect,
  [ShapeTypes.Text]: Text,
};

const availableShapes = {
  [ShapeTypes.Circle]: {
    label: 'Circle',
    type: ShapeTypes.Circle,
    options: {
      x: 100,
      y: 100,
      radius: 50,
      fill: 'blue',
    },
  },
  [ShapeTypes.Rectangle]: {
    label: 'Rectangle',
    type: ShapeTypes.Rectangle,
    options: {
      x: 50,
      y: 50,
      height: 100,
      width: 200,
      fill: 'red',
    },
  },
  [ShapeTypes.Text]: {
    label: 'Text',
    type: ShapeTypes.Text,
    options: {
      x: 0,
      y: 0,
      text: 'Test',
      fill: '#000000',
    },
  },
};

const App = () => {
  console.log('123');
  const sidebarWidth = 200;

  const [shapes, setShapes] = React.useState({});
  const [shapesOrder, setShapesOrder] = React.useState<string[]>([]);
  const [activeShapeId, setActiveShapeId] = React.useState<string | null>(null);
  const canvasContainerRef = React.useRef(null);
  const elementSize = useElementSize(canvasContainerRef.current);

  React.useEffect(() => {
    const savedState = localStorage.getItem('state');

    if (!savedState) {
      return;
    }

    const parsedSavedState: SavedState = JSON.parse(savedState);

    if (!parsedSavedState) {
      return;
    }

    setShapes(parsedSavedState.shapes);
    setShapesOrder(parsedSavedState.shapesOrder);
  }, []);

  function onNewShapeSelected(newShape: NewShape) {
    const shapeId = nanoid();

    setShapes({ ...shapes, [shapeId]: cloneDeep(newShape) });
    setShapesOrder([...shapesOrder, shapeId]);
  }

  function onShapeUpdated(shapeId: string, newOptions: any) {
    setShapes({
      ...shapes,
      [shapeId]: {
        ...shapes[shapeId],
        options: {
          ...shapes[shapeId].options,
          ...newOptions,
        },
      },
    });
  }

  const shapesList = React.useMemo(
    () => shapesOrder.map(shapeId => ({ ...shapes[shapeId], id: shapeId })),
    [],
  );

  return (
    <div>
      <Flex>
        <Flex>
          <div>
            {activeShapeId && (
              <div>
                {shapes[activeShapeId].label}

                <ShapeEditor
                  type={shapes[activeShapeId].type}
                  options={shapes[activeShapeId].options}
                  onChange={newOptions => {
                    onShapeUpdated(activeShapeId, newOptions);
                  }}
                />
              </div>
            )}
          </div>
        </Flex>

        <div style={{ position: 'relative' }} ref={canvasContainerRef}>
          <Stage height={elementSize.height} width={elementSize.width}>
            <Layer>
              {shapesList.map(shape => {
                const Component = shapesMap[shape.type];

                return (
                  <Component
                    key={shape.id}
                    {...shape.options}
                    draggable
                    onMouseDown={() => setActiveShapeId(shape.id)}
                    onDragEnd={({ evt }: any) => {
                      onShapeUpdated(shape.id, {
                        x: evt.dragEndNode.attrs.x,
                        y: evt.dragEndNode.attrs.y,
                      });
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
          <Actions
            onSave={() => {
              localStorage.setItem(
                'state',
                JSON.stringify({
                  shapes,
                  shapesOrder,
                }),
              );
            }}
          />
        </div>

        <div style={{ maxWidth: `${sidebarWidth}px` }}>
          <div>
            <div>Layers</div>

            {shapesList.map(shape => (
              <div key={shape.id} onClick={() => setActiveShapeId(shape.id)}>
                {shape.label}
              </div>
            ))}
          </div>
        </div>
      </Flex>
    </div>
  );
};

export default App;
