import React, { CSSProperties, FC, isValidElement, ReactNode } from 'react';
import { Button, Col, Row, Space } from 'antd';
import cls from 'classnames';
import { prefix } from '../../theme/prefix';
import { availableShapes } from '../../nodes';
import { useEditorOperation } from '../../../interaction';
import './style.less';
import { useFormatMessage } from '../../components';

const componentPrefix = `${prefix}-toolbar`;

/**
 * 自定义 Toolbar 的创建方法
 */
export type CustomToolbar = (dom: TToolbar) => ReactNode | TToolbar;

/**
 * 默认工具条定义
 */
export type TToolbar = {
  /**
   * 左侧工具条
   */
  left: JSX.Element;
  /**
   * 中间的工具条
   */
  right: JSX.Element;
  /**
   * 右侧工具条
   */
  center: JSX.Element;
};

interface ToolbarProps {
  className?: string;
  style?: CSSProperties;
  customToolbar?: CustomToolbar;
}

const availableNodeList = Object.entries(availableShapes);

const Toolbar: FC<ToolbarProps> = ({ className, customToolbar }) => {
  const { saveToLocalStorage, resetNodeTree, addNode } = useEditorOperation();
  const f = useFormatMessage();

  const addFn = (node) => () => {
    addNode(node);
  };
  const save = () => {
    saveToLocalStorage();
  };
  const LeftToolbar = () => (
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
  );
  const RightToolbar = () => (
    <Space>
      <Button>{f('toolbar.right.import')}</Button>
      <Button>{f('toolbar.right.export')}</Button>
      <Button>{f('toolbar.right.meta')}</Button>
      <Button onClick={save}>{f('toolbar.right.save')}</Button>
      <Button onClick={resetNodeTree}>{f('toolbar.right.clear')}</Button>
    </Space>
  );
  const CenterToolbar = () => <div>{f('toolbar.center.title')}</div>;

  const CustomToolbar = customToolbar?.({
    left: <LeftToolbar />,
    right: <RightToolbar />,
    center: <CenterToolbar />,
  });

  return isValidElement(CustomToolbar) ? (
    <div className={cls(`${componentPrefix}-container`, className)}>
      {CustomToolbar}
    </div>
  ) : (
    <Row
      justify="space-between"
      className={cls(`${componentPrefix}-container`, className)}
    >
      <Col className={`${componentPrefix}-left`}>
        {(CustomToolbar as TToolbar)?.left || <LeftToolbar />}
      </Col>
      <Col className={`${componentPrefix}-center`}>
        {(CustomToolbar as TToolbar)?.center || <CenterToolbar />}
      </Col>
      <Col className={`${componentPrefix}-right`}>
        {(CustomToolbar as TToolbar)?.right || <RightToolbar />}
      </Col>
    </Row>
  );
};

export default Toolbar;
