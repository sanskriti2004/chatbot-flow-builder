import { type DragEvent } from "react";
import { nodeConfigs } from "../nodes/nodeConfigs";

export function NodesPanel() {
    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="nodes-panel">
            <h3 className="nodes-panel__title">Nodes</h3>
            <div className="nodes-panel__list">
                {nodeConfigs.map((config) => (
                    <div
                        key={config.type}
                        className="nodes-panel__item"
                        draggable
                        onDragStart={(e) => onDragStart(e, config.type)}
                    >
                        <NodeIcon icon={config.icon} />
                        <span>{config.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function NodeIcon({ icon }: { icon: string }) {
    switch (icon) {
        case "chat":
            return (
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            );
        default:
            return (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
            );
    }
}
