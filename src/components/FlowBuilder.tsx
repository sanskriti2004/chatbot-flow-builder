import { Canvas } from "./Canvas";
import { Sidebar } from "./Sidebar";

export function FlowBuilder() {
    return (
        <div className="flow-builder">
            <Canvas />
            <Sidebar />
        </div>
    );
}
