import React from 'react';
import UXDMEditor from 'react-uxdm-editor';

const App = () => {
  return (
    <UXDMEditor
      onChange={(state) => {
        console.log(state);
      }}
    />
  );
};
export default App;
