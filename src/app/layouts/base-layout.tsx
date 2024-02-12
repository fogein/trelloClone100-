import React from 'react';
// import { Header } from '@shared/ui';
// import { Navigation } from '@widgets/navigation/ui';

import { TaskBoards } from '@widgets/task-boards/ui';

import MainContentLayout from './main-content-layout';
function BaseLayout() {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 border-l-[3px] border-orange-700 h-screen w-screen overflow-hidden">
      {/*<Header />*/}
      <div className="w-full h-full flex">
        {/*<Navigation />*/}
        <div className="flex w-full flex-col h-screen flex-1 relative overflow-hidden">
          <MainContentLayout>
            <TaskBoards />
          </MainContentLayout>
        </div>
      </div>
    </div>
  );
}

export default BaseLayout;
