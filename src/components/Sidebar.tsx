import { useFlowStore } from "../hooks/useFlowStore";
import { NodesPanel } from "../panels/NodesPanel";
import { SettingsPanel } from "../panels/SettingsPanel";

export function Sidebar() {
    const selectedNodeId = useFlowStore((s) => s.selectedNodeId);

    return (
        <aside className="sidebar">
            {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
        </aside>
    );
}
