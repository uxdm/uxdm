import React from 'react';
import { Col, Row } from 'antd';

import { useNodeTree } from './store';

import { LayerPanel, Toolbar } from './components';
import Canvas from './canvas';

import './global';

const App = () => {
  const { nodeList } = useNodeTree();

  return (
    <div>
      <Toolbar />
      <Row>
        <Col>
          <LayerPanel nodeTree={nodeList} />
        </Col>
        <Col flex={1}>
          <Canvas />
        </Col>
      </Row>
    </div>
  );
};

export default App;
