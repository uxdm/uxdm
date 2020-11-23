import React, { useEffect, useState } from 'react';
import UXDMEditor, { useEditorState } from 'react-uxdm-editor';

import { devtools } from 'stook-devtools';

if (process.env.NODE_ENV !== 'production') {
  devtools.init();
}

const App = () => {
  // const [tree, setState] = useState({});
  const { loadFromLocalStorage, nodeTree } = useEditorState();

  useEffect(() => {
    loadFromLocalStorage();
  }, []);
  return <UXDMEditor />;
};
export default App;
