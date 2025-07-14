import "./App.css";
import "@xyflow/react/dist/style.css";
import ChatFlowUI from "./components/chatflow-ui";
import SettingsPanel from "./components/settings-panel";

import { useStore } from "./store";
import { ChatFlowToolbar } from "./components/chatflow-toolbar";
import Toast from "./components/toast";

function App() {
  const toast = useStore((state) => state.toast);

  return (
    <div className="">
      <ChatFlowToolbar />
      <div className="flex bg-gray-100 h-screen">
        <ChatFlowUI />
        <SettingsPanel />
      </div>
      <Toast toast={toast} />
    </div>
  );
}

export default App;
