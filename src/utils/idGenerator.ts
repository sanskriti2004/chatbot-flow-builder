let nodeCounter = 0;
let edgeCounter = 0;

export function generateNodeId(): string {
    nodeCounter += 1;
    return `node_${nodeCounter}`;
}

export function generateEdgeId(source: string, target: string): string {
    edgeCounter += 1;
    return `edge_${source}_${target}_${edgeCounter}`;
}
