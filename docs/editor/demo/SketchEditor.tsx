import React, { useEffect } from 'react';
import { Space, Button } from 'antd';
import { fromSketchJSON, Rectangle } from '@uxdm/model-sketch';

import UXDMEditor, { useEditorOperation } from 'react-uxdm-editor';
import { example } from './sketchJSON';

const App = () => {
  const { loadFromLocalStorage, replaceNodeTree } = useEditorOperation();

  useEffect(() => {
    // loadFromLocalStorage();
  }, []);
  const showDataset = (input) => {
    const data = fromSketchJSON(input);
    console.log(data);

    // @ts-ignore
    replaceNodeTree(data);
  };

  return (
    <div>
      <UXDMEditor
        title={'Sketch Editor'}
        customToolbar={() => ({
          left: (
            <Space>
              <div>Sketch 数据集:</div>
              <Button onClick={() => showDataset(example)}>输入</Button>
            </Space>
          ),
        })}
      />
    </div>
  );
};
export default App;
