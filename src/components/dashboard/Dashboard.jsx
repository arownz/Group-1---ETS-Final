import React from 'react';
import TopNavigation from './TopNavigation';
import LeftSideNavigation from './LeftSideNavigation';

function Dashboard() {
  const activePageTitle = 'Dashboard'; // This will be dynamic based on the current page

  return (
    <div>
      <TopNavigation activePageTitle={activePageTitle} />
      <div className="d-flex">
        <LeftSideNavigation />
        <main className="flex-grow-1">
          {/* Main content will go here */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;