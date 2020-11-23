import React from 'react';
import { EllipseNode, RectangleNode, CircleNode } from 'uxdm';
import { Button, Col, Row, Space } from 'antd';
import { ShapeTypes } from '../../utils';
import { useNodeTree } from '../../store';
import './style.less';
import { prefix } from '../../theme/prefix';

const availableShapes = {
  [ShapeTypes.Ellipse]: () =>
    new EllipseNode({
      x: 100,
      y: 100,
      rx: 100,
      ry: 50,
      fill: 'blue',
    }),
  [ShapeTypes.Circle]: () =>
    new CircleNode({
      x: 100,
      y: 100,
      radius: 50,
      fill: 'red',
    }),
  [ShapeTypes.Rectangle]: () =>
    new RectangleNode({
      x: 50,
      y: 50,
      height: 100,
      width: 200,
      fill: 'black',
    }),
};

const componentPrefix = `${prefix}-toolbar`;

const Toolbar = () => {
  const { addNode, saveToLocalStorage, resetNodeTree } = useNodeTree();

  const availableNodeList = Object.entries(availableShapes);
  return (
    <Row justify="space-between">
      <Col className={`${componentPrefix}-nodes`}>
        <Space>
          {availableNodeList.map((node) => {
            const [key, initNode] = node;

            return (
              <Button
                key={key}
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
          <Button>导入 JSON</Button>
          <Button
            onClick={() => {
              saveToLocalStorage();
            }}
          >
            保存
          </Button>
          <Button onClick={resetNodeTree}>清空</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default Toolbar;
