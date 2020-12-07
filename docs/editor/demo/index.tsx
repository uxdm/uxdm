import React, { useEffect } from 'react';

import UXDMEditor, { useEditorOperation } from 'react-uxdm-editor';

import { devtools } from 'stook-devtools';
if (process.env.NODE_ENV !== 'production') {
  devtools.init();
}

const App = () => {
  const { loadFromLocalStorage, replaceNodeTree } = useEditorOperation();

  useEffect(() => {
    // loadFromLocalStorage();
  }, []);

  return (
    <div>
      <UXDMEditor inspectorPanel={false} />
    </div>
  );
};
export default App;
