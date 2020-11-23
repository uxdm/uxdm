import React, { CSSProperties, FC } from 'react';
import { Col, Row } from 'antd';
import classnames from 'classnames';

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

export interface UXDMEditorProps {
  state?: EditorState;
  onChange?: (state: EditorState) => void;
  toolbarClassName?: string;
  layerPanelClassName?: string;
  inspectorClassName?: string;
  className?: string;
  style?: CSSProperties;
}

const App: FC<UXDMEditorProps> = ({
  state,
  onChange,
  className,
  style,
  layerPanelClassName,
  toolbarClassName,
  inspectorClassName,
}) => {
  useEditorState({ state, onChange });

  const { nodeList } = useEditorUtils();
  const { locale, messages } = useI18n();

  return (
    <IntlProvider
      locale={locale}
      defaultLocale="en-US"
      // @ts-ignore
      messages={messages || {}}
    >
      <div className={classnames(`${prefix}`, className)} style={style}>
        <Toolbar className={toolbarClassName} />
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
