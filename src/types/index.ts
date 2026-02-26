import { type Node } from "@xyflow/react";

export interface BaseNodeData extends Record<string, unknown> {
  label: string;
}

export interface TextNodeData extends BaseNodeData {
  message: string;
}

export type AppNodeData = TextNodeData;

export type AppNode = Node<AppNodeData>;

export interface NodeConfig {
  type: string;
  label: string;
  icon: string;
  defaultData: AppNodeData;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}
