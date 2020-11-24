import React, { CSSProperties, FC } from 'react';
import { Col, Row } from 'antd';
import classnames from 'classnames';
import Skeleton from '@ant-design/pro-skeleton';

import { EditorState } from './types';
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

export interface UXDMEditorProps {
  state?: EditorState;
  onChange?: (state: EditorState) => void;
  toolbarClassName?: string;
  layerPanelClassName?: string;
  inspectorClassName?: string;
  className?: string;
  style?: CSSProperties;
  /**
   * 自定义 Toolbar
   */
  customToolbar?: CustomToolbar;
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
}) => {
  useEditorState({ state, onChange });

  const { nodeList } = useEditorUtils();
  const { locale, messages } = useI18n();

  return !messages ? (
    <Skeleton />
  ) : (
    <IntlProvider locale={locale} defaultLocale="en-US" messages={messages}>
      <div className={classnames(`${prefix}`, className)} style={style}>
        <Toolbar className={toolbarClassName} customToolbar={customToolbar} />
        <Row wrap={false}>
          <Col flex={1}>
            <LayerPanel nodeList={nodeList} className={layerPanelClassName} />
          </Col>
          <Col flex={1}>
            <Canvas nodeList={nodeList} />
          </Col>
          <Col flex={1}>
            <Inspector className={inspectorClassName} />
          </Col>
        </Row>
      </div>
    </IntlProvider>
  );
};

export default App;
