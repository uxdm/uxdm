import React from 'react';

interface Props {
  onSave: () => void;
}

export const Actions = (props: Props) => (
  <div>
    <button onClick={props.onSave}>Save</button>
  </div>
);
