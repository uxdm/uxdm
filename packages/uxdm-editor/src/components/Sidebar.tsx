import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

function Sidebar(props: SidebarProps) {
  return (
    <div>
      <div>{props.children}</div>
    </div>
  );
}

export { Sidebar };
