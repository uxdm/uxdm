import React from 'react';
import { EllipseNode, RectangleNode } from 'uxdm';
import { Button, Col, Row, Space } from 'antd';
import { ShapeTypes } from '../../utils';
import { useNodeTree } from '../../store';
import styles from './style.less';

const availableShapes = {
  [ShapeTypes.Ellipse]: () =>
    new EllipseNode({
      x: 100,
      y: 100,
      rx: 100,
      ry: 50,
      fill: 'blue',
    }),
  // [ShapeTypes.Circle]: {
  //   label: 'Circle',
  //   type: ShapeTypes.Circle,
  //   options: {
  //     x: 100,
  //     y: 100,
  //     radius: 50,
  //   },
  // },
  [ShapeTypes.Rectangle]: () =>
    new RectangleNode({
      x: 50,
      y: 50,
      height: 100,
      width: 200,
      fill: 'black',
    }),
};

const Toolbar = () => {
  const { addNode, saveState, resetNodeTree } = useNodeTree();

  const availableNodeList = Object.entries(availableShapes);
  return (
    <Row justify="space-between">
      <Col className={styles.nodes}>
        <Space>
          {availableNodeList.map((node) => {
            const [key, initNode] = node;

            return (
              <Button
                onClick={() => {
                  addNode(initNode());
                }}
              >
                添加{key}
              </Button>
            );
          })}
        </Space>
      </Col>
      <Col>
        <Space>
          <Button onClick={saveState}>保存</Button>
          <Button onClick={resetNodeTree}>清空</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default Toolbar;
