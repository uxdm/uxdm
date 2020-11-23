import React, { useState } from 'react';
import UXDMEditor from 'react-uxdm-editor';
// import UXDMEditor from '../../../packages/react-uxdm-editor/lib';
import { devtools } from 'stook-devtools';

if (process.env.NODE_ENV !== 'production') {
  devtools.init();
}

const App = () => {
  const [tree, setState] = useState({});

  return (
    <UXDMEditor
      state={tree}
      onChange={(state) => {
        setState(state);
      }}
    />
  );
};
export default App;
