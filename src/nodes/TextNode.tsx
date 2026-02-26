import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AppNode } from "../types";
import { useFlowStore } from "../hooks/useFlowStore";

export function TextNode({ id, data, selected }: NodeProps<AppNode>) {
    const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
    const isSelected = selected || selectedNodeId === id;

    return (
        <div className={`text-node ${isSelected ? "text-node--selected" : ""}`}>
            <Handle
                type="target"
                position={Position.Left}
                className="node-handle node-handle--target"
            />

            <div className="text-node__header">
                <svg
                    className="text-node__icon"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="text-node__title">Send Message</span>
            </div>

            <div className="text-node__body">
                <p className="text-node__message">
                    {(data as { message?: string }).message || "Click to edit message..."}
                </p>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="node-handle node-handle--source"
            />
        </div>
    );
}
