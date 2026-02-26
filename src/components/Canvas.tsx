import { useCallback, useRef, type DragEvent } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    type Edge,
    type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useFlowStore } from "../hooks/useFlowStore";
import { nodeTypes } from "../nodes/nodeTypes";
import { nodeConfigs } from "../nodes/nodeConfigs";
import type { AppNode } from "../types";

export function Canvas() {
    const nodes = useFlowStore((s) => s.nodes);
    const edges = useFlowStore((s) => s.edges);
    const onNodesChange = useFlowStore((s) => s.onNodesChange);
    const onEdgesChange = useFlowStore((s) => s.onEdgesChange);
    const onConnect = useFlowStore((s) => s.onConnect);
    const addNode = useFlowStore((s) => s.addNode);
    const setSelectedNode = useFlowStore((s) => s.setSelectedNode);
    const deleteNode = useFlowStore((s) => s.deleteNode);
    const selectedNodeId = useFlowStore((s) => s.selectedNodeId);

    const reactFlowInstance = useRef<ReactFlowInstance<AppNode, Edge> | null>(null);

    const onDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");
            if (!type || !reactFlowInstance.current) return;

            const position = reactFlowInstance.current.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const config = nodeConfigs.find((c) => c.type === type);
            if (!config) return;

            addNode(type, position, { ...config.defaultData });
        },
        [addNode]
    );

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onNodeClick = useCallback(
        (_: React.MouseEvent, node: { id: string }) => {
            setSelectedNode(node.id);
        },
        [setSelectedNode]
    );

    const onPaneClick = useCallback(() => {
        setSelectedNode(null);
    }, [setSelectedNode]);

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (
                (event.key === "Delete" || event.key === "Backspace") &&
                selectedNodeId
            ) {
                deleteNode(selectedNodeId);
            }
        },
        [selectedNodeId, deleteNode]
    );

    return (
        <div
            className="canvas"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onKeyDown={onKeyDown}
            tabIndex={0}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={(instance) => {
                    reactFlowInstance.current = instance;
                }}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
            >
                <Background gap={16} size={1} />
                <Controls />
            </ReactFlow>
        </div>
    );
}
