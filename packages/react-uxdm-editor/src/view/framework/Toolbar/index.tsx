import React, { CSSProperties, FC, isValidElement, ReactNode } from 'react';
import { Button, Col, Dropdown, Menu, Row, Space } from 'antd';
import { NodeEnum } from 'uxdm';
import cls from 'classnames';
import { DownOutlined } from '@ant-design/icons';

import { prefix } from '../../theme/prefix';
import { availableShapes } from '../../nodes';
import { useEditorOperation } from '../../../services';
import './style.less';
import { useFormatMessage } from '../../components';
import { BaseComponentProps } from '../../../types';

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

interface ToolbarProps extends BaseComponentProps {
  className?: string;
  style?: CSSProperties;
  customToolbar?: CustomToolbar;
  /**
   * 标题
   */
  title?: string;
}

const availableNodeList = Object.entries(availableShapes);

const { Item } = Menu;

const Toolbar: FC<ToolbarProps> = ({ className, customToolbar, title }) => {
  const { saveToLocalStorage, resetNodeTree, addNode } = useEditorOperation();
  const f = useFormatMessage();

  const save = () => {
    saveToLocalStorage();
  };

  const LeftToolbar = () => (
    <Space>
      <Dropdown.Button
        onClick={() => {
          const initRect = availableShapes[NodeEnum.Rectangle];
          addNode(initRect());
        }}
        icon={<DownOutlined />}
        overlay={
          <Menu>
            {availableNodeList.map((node) => {
              const [key, initNode] = node;
              return (
                <Item key={key} onClick={() => addNode(initNode())}>
                  {key}
                </Item>
              );
            })}
          </Menu>
        }
      >
        Rect
      </Dropdown.Button>
    </Space>
  );
  const RightToolbar = () => (
    <Space>
      <Button onClick={save}>{f('toolbar.right.save')}</Button>
      <Button onClick={resetNodeTree}>{f('toolbar.right.clear')}</Button>
    </Space>
  );
  const CenterToolbar = () => <div>{title || f('toolbar.center.title')}</div>;

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
