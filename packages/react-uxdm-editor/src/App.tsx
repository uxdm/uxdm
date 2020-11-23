import React, { CSSProperties, FC, useEffect } from 'react';
import { Col, Row } from 'antd';
import classnames from 'classnames';
import { useI18n } from './hooks';
import { NodeTree, useEditorState } from './store';
import { LayerPanel, Toolbar, Canvas, Inspector } from './framework';
import { IntlProvider } from './components';

import { prefix } from './theme/prefix';

export interface UXDMEditorProps {
  state?: NodeTree;
  onChange?: (state: NodeTree) => void;
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
  const { nodeList, nodeTree } = useEditorState({
    state,
    onChange,
  });
  const { locale, messages } = useI18n();

  useEffect(() => {}, []);

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
            <Inspector nodeTree={nodeTree} className={inspectorClassName} />
          </Col>
        </Row>
      </div>
    </IntlProvider>
  );
};

export default App;
