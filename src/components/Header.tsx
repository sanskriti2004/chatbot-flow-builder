import { useFlowStore } from "../hooks/useFlowStore";
import { validateFlow } from "../utils/validation";

export function Header() {
    const nodes = useFlowStore((s) => s.nodes);
    const edges = useFlowStore((s) => s.edges);
    const addToast = useFlowStore((s) => s.addToast);
    const toasts = useFlowStore((s) => s.toasts);
    const removeToast = useFlowStore((s) => s.removeToast);

    const handleSave = () => {
        const result = validateFlow(nodes, edges);
        addToast(result.message, result.valid ? "success" : "error");
    };

    return (
        <>
            <header className="header">
                <div className="header__left">
                    <h1 className="header__title">Chatbot Flow Builder</h1>
                </div>
                <div className="header__right">
                    <button className="header__save-btn" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </header>

            <div className="toast-container">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast toast--${toast.type}`}
                        onClick={() => removeToast(toast.id)}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </>
    );
}
