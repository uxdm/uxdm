import React, { CSSProperties, FC, useEffect } from 'react';
import { Col, Row } from 'antd';
import classnames from 'classnames';
import { useI18n } from './hooks';
import { NodeTree, useNodeTree } from './store';
import { LayerPanel, Toolbar, IntlProvider } from './components';
import Canvas from './canvas';
import { prefix } from './theme/prefix';

export interface UXDMEditorProps {
  state?: NodeTree;
  onChange?: (state: NodeTree) => void;
  className?: string;
  style?: CSSProperties;
}

const App: FC<UXDMEditorProps> = ({ state, onChange, className, style }) => {
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
      <div className={classnames(`${prefix}`, className)} style={style}>
        <Toolbar />
        <Row wrap={false}>
          <Col>
            <LayerPanel nodeTree={nodeList} />
          </Col>
          <Col flex={1}>
            <Canvas nodeList={nodeList} />
          </Col>
        </Row>
      </div>
    </IntlProvider>
  );
};

export default App;
