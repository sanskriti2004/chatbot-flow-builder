import { create } from "zustand";
import {
    type Edge,
    type Connection,
    type NodeChange,
    type EdgeChange,
    applyNodeChanges,
    applyEdgeChanges,
} from "@xyflow/react";
import type { AppNode, AppNodeData, Toast } from "../types";
import { resolveConnection } from "../utils/edgeUtils";
import { generateNodeId } from "../utils/idGenerator";

interface FlowState {
    nodes: AppNode[];
    edges: Edge[];
    selectedNodeId: string | null;
    toasts: Toast[];

    addNode: (type: string, position: { x: number; y: number }, data: AppNodeData) => void;
    updateNodeData: (nodeId: string, data: Partial<AppNodeData>) => void;
    deleteNode: (nodeId: string) => void;

    setSelectedNode: (nodeId: string | null) => void;

    onNodesChange: (changes: NodeChange<AppNode>[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;

    addToast: (message: string, type: "success" | "error") => void;
    removeToast: (id: string) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNodeId: null,
    toasts: [],

    addNode: (type, position, data) => {
        const newNode: AppNode = {
            id: generateNodeId(),
            type,
            position,
            data,
        };
        set({ nodes: [...get().nodes, newNode] });
    },

    updateNodeData: (nodeId, data) => {
        set({
            nodes: get().nodes.map((node) =>
                node.id === nodeId
                    ? { ...node, data: { ...node.data, ...data } }
                    : node
            ),
        });
    },

    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter((n) => n.id !== nodeId),
            edges: get().edges.filter(
                (e) => e.source !== nodeId && e.target !== nodeId
            ),
            selectedNodeId:
                get().selectedNodeId === nodeId ? null : get().selectedNodeId,
        });
    },

    setSelectedNode: (nodeId) => {
        set({ selectedNodeId: nodeId });
    },

    onNodesChange: (changes) => {
        set({ nodes: applyNodeChanges(changes, get().nodes) });
    },

    onEdgesChange: (changes) => {
        set({ edges: applyEdgeChanges(changes, get().edges) });
    },

    onConnect: (connection) => {
        set({ edges: resolveConnection(get().edges, connection) });
    },

    addToast: (message, type) => {
        const id = `toast_${Date.now()}`;
        set({ toasts: [...get().toasts, { id, message, type }] });
        setTimeout(() => get().removeToast(id), 3000);
    },

    removeToast: (id) => {
        set({ toasts: get().toasts.filter((t) => t.id !== id) });
    },
}));
