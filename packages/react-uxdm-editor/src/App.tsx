import React, { FC } from 'react';
import { Col, Row } from 'antd';
import classnames from 'classnames';

import { BaseComponentProps, EditorState } from './types';
import { useEditorUtils, useEditorState } from './interaction';
import {
  LayerPanel,
  Toolbar,
  Canvas,
  Inspector,
  IntlProvider,
  useI18n,
  prefix,
} from './view';
import { CustomToolbar } from './view/framework/Toolbar';
import { isFalse } from './utils';

export interface UXDMEditorProps extends BaseComponentProps {
  state?: EditorState;
  onChange?: (state: EditorState) => void;
  /**
   * 工具条类名
   */
  toolbarClassName?: string;
  /**
   * 图层面板类名
   */
  layerPanelClassName?: string;
  /**
   * 视察器类名
   */
  inspectorClassName?: string;
  /**
   * 自定义 Toolbar
   */
  customToolbar?: CustomToolbar;
  /**
   * 图层面板配置项
   */
  layerPanel?: boolean;
  /**
   * 视察器面板
   */
  inspectorPanel?: boolean;
  /**
   * 编辑器标题
   */
  title?: string;
}

const App: FC<UXDMEditorProps> = ({
  state,
  onChange,
  className,
  style,
  layerPanelClassName,
  toolbarClassName,
  inspectorClassName,
  customToolbar,
  layerPanel,
  inspectorPanel,
  title,
}) => {
  useEditorState({ state, onChange });

  const { nodeList } = useEditorUtils();
  const { locale, messages } = useI18n();

  return !messages ? (
    <div />
  ) : (
    <IntlProvider locale={locale} defaultLocale="en-US" messages={messages}>
      <div className={classnames(`${prefix}`, className)} style={style}>
        <Toolbar
          title={title}
          className={toolbarClassName}
          customToolbar={customToolbar}
        />
        <Row wrap={false}>
          {isFalse(layerPanel) ? null : (
            <Col flex={1}>
              <LayerPanel
                nodeList={nodeList}
                className={layerPanelClassName}
                {...layerPanel}
              />
            </Col>
          )}
          <Col flex={1}>
            <Canvas nodeList={nodeList} />
          </Col>
          {isFalse(inspectorPanel) ? null : (
            <Col flex={1}>
              <Inspector className={inspectorClassName} />
            </Col>
          )}
        </Row>
      </div>
    </IntlProvider>
  );
};

export default App;
