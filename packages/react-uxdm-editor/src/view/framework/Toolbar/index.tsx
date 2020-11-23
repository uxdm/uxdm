import React, { CSSProperties, FC } from 'react';
import { Button, Col, Row, Space } from 'antd';
import cls from 'classnames';
import { prefix } from '../../theme/prefix';
import { availableShapes } from '../../nodes';
import { useEditorOperation } from '../../../interaction';
import './style.less';

const componentPrefix = `${prefix}-toolbar`;

interface ToolbarProps {
  className?: string;
  style?: CSSProperties;
}
const availableNodeList = Object.entries(availableShapes);

const Toolbar: FC<ToolbarProps> = ({ className }) => {
  const { saveToLocalStorage, resetNodeTree, addNode } = useEditorOperation();

  const addFn = (node) => () => {
    addNode(node);
  };
  const save = () => {
    saveToLocalStorage();
  };

  return (
    <Row
      justify="space-between"
      className={cls(`${componentPrefix}-container`, className)}
    >
      <Col className={`${componentPrefix}-nodes`}>
        <Space>
          {availableNodeList.map((node) => {
            const [key, initNode] = node;

            return (
              <Button key={key} onClick={addFn(initNode())}>
                {key}
              </Button>
            );
          })}
        </Space>
      </Col>
      <Col>
        <Space>
          <Button>导入/导出</Button>
          <Button>显示元数据</Button>
          <Button onClick={save}>保存</Button>
          <Button onClick={resetNodeTree}>清空</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default Toolbar;
