import { type Edge, type Connection } from "@xyflow/react";
import { generateEdgeId } from "./idGenerator";

export function resolveConnection(
    edges: Edge[],
    connection: Connection
): Edge[] {
    const filtered = edges.filter(
        (e) =>
            !(
                e.source === connection.source &&
                e.sourceHandle === connection.sourceHandle
            )
    );

    const newEdge: Edge = {
        id: generateEdgeId(connection.source!, connection.target!),
        source: connection.source!,
        target: connection.target!,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
    };

    return [...filtered, newEdge];
}
