import React, { useState } from 'react';
import UXDMEditor from 'react-uxdm-editor';

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
