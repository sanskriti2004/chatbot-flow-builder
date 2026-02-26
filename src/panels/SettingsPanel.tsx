import { type ChangeEvent } from "react";
import { useFlowStore } from "../hooks/useFlowStore";

export function SettingsPanel() {
    const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
    const nodes = useFlowStore((s) => s.nodes);
    const updateNodeData = useFlowStore((s) => s.updateNodeData);
    const setSelectedNode = useFlowStore((s) => s.setSelectedNode);
    const deleteNode = useFlowStore((s) => s.deleteNode);

    const selectedNode = nodes.find((n) => n.id === selectedNodeId);

    if (!selectedNode) return null;

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        updateNodeData(selectedNode.id, { message: e.target.value });
    };

    const handleBack = () => {
        setSelectedNode(null);
    };

    const handleDelete = () => {
        deleteNode(selectedNode.id);
    };

    return (
        <div className="settings-panel">
            <div className="settings-panel__header">
                <button
                    className="settings-panel__back"
                    onClick={handleBack}
                    aria-label="Back to nodes panel"
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <h3 className="settings-panel__title">
                    {selectedNode.data.label as string}
                </h3>
            </div>

            <div className="settings-panel__body">
                {selectedNode.type === "textNode" && (
                    <div className="settings-panel__field">
                        <label
                            className="settings-panel__label"
                            htmlFor="node-message"
                        >
                            Text
                        </label>
                        <textarea
                            id="node-message"
                            className="settings-panel__textarea"
                            value={(selectedNode.data as { message?: string }).message ?? ""}
                            onChange={handleMessageChange}
                            placeholder="Type your message here..."
                            rows={4}
                        />
                    </div>
                )}

            </div>

            <div className="settings-panel__footer">
                <button
                    className="settings-panel__delete"
                    onClick={handleDelete}
                >
                    Delete Node
                </button>
            </div>
        </div>
    );
}
