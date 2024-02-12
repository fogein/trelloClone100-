import React, { ReactNode } from 'react';

const MainContentLayout = ({ children }: { children: ReactNode }) => {
  return <div className="w-full h-full overflow-hidden overflow-x-auto px-[40px]">{children}</div>;
};

export default MainContentLayout;
