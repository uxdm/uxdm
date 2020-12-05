import React, { useEffect } from 'react';
import { Space, Button } from 'antd';

import UXDMEditor, { useEditorOperation } from 'react-uxdm-editor';
import { fromGridsJSON } from './function';
import { input, output1, output2, output3 } from './data';

import { devtools } from 'stook-devtools';
if (process.env.NODE_ENV !== 'production') {
  devtools.init();
}

const App = () => {
  const { loadFromLocalStorage, replaceNodeTree } = useEditorOperation();

  useEffect(() => {
    // loadFromLocalStorage();
  }, []);
  const showDataset = (input) => {
    const data = fromGridsJSON(input);
    replaceNodeTree(data);
  };

  return (
    <div>
      <UXDMEditor
        customToolbar={() => ({
          left: (
            <Space>
              <div>数据集:</div>
              <Button onClick={() => showDataset(input)}>输入</Button>
              <Button onClick={() => showDataset(output1)}>输出 1</Button>
              <Button onClick={() => showDataset(output2)}>输出 2</Button>
              <Button onClick={() => showDataset(output3)}>输出 3</Button>
            </Space>
          ),
        })}
        layerPanel={false}
        inspectorPanel={false}
      />
    </div>
  );
};
export default App;
