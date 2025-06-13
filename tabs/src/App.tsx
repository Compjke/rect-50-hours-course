import { Panel, PanelGroup } from 'react-resizable-panels';
import { Profile } from './components/Profile';
import { SideBar } from './components/SideBar';

export const App = () => {
  return (
    <PanelGroup
      direction="horizontal"
      autoSaveId="sidebar-layout"
      id="sidebar-group"
    >
      <SideBar />
      <Panel defaultSize={95} minSize={50} maxSize={95} className="h-screen">
        <main className="w-full h-full overflow-auto">
          <Profile />
        </main>
      </Panel>
    </PanelGroup>
  );
};
