import { type Node, type Edge } from "@xyflow/react";
import type { ValidationResult } from "../types";

export function validateFlow(
    nodes: Node[],
    edges: Edge[]
): ValidationResult {
    if (nodes.length === 0) {
        return { valid: false, message: "Cannot save an empty flow." };
    }

    if (nodes.length === 1) {
        return { valid: true, message: "Flow saved successfully." };
    }

    const targetIds = new Set(edges.map((e) => e.target));
    const nodesWithoutTarget = nodes.filter((n) => !targetIds.has(n.id));

    if (nodesWithoutTarget.length > 1) {
        return {
            valid: false,
            message: "Cannot save flow: more than one node has an empty target handle.",
        };
    }

    return { valid: true, message: "Flow saved successfully." };
}
