import React, { CSSProperties, FC } from 'react';
import { Button, Col, Row, Space } from 'antd';
import cls from 'classnames';
import { useEditorState } from '../../store';
import { prefix } from '../../theme/prefix';
import { availableShapes } from '../../constants';
import './style.less';

const componentPrefix = `${prefix}-toolbar`;

interface ToolbarProps {
  className?: string;
  style?: CSSProperties;
}
const Toolbar: FC<ToolbarProps> = ({ className }) => {
  const { addNode, saveToLocalStorage, resetNodeTree } = useEditorState();

  const availableNodeList = Object.entries(availableShapes);
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
              <Button
                key={key}
                onClick={() => {
                  addNode(initNode());
                }}
              >
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
