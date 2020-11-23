import React, { FC, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useI18n } from './hooks';
import { NodeTree, useNodeTree } from './store';
import { LayerPanel, Toolbar, IntlProvider } from './components';
import Canvas from './canvas';

import './global';

interface UXDMEditorProps {
  state?: NodeTree;
  onChange?: (state: NodeTree) => void;
}
const App: FC<UXDMEditorProps> = ({ state, onChange }) => {
  const { nodeList, loadFromLocalStorage } = useNodeTree({
    state,
    onChange,
  });
  const { locale, messages } = useI18n();

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale="en-US"
      // @ts-ignore
      messages={messages || {}}
    >
      <Toolbar />
      <Row>
        <Col>
          <LayerPanel nodeTree={nodeList} />
        </Col>
        <Col flex={1}>
          <Canvas nodeList={nodeList} />
        </Col>
      </Row>
    </IntlProvider>
  );
};

export default App;
