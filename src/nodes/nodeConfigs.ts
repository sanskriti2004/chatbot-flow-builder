import type { NodeConfig } from "../types";

export const nodeConfigs: NodeConfig[] = [
    {
        type: "textNode",
        label: "Message",
        icon: "chat",
        defaultData: {
            label: "Message",
            message: "",
        },
    },
    // add new node types:
    // {
    //   type: "imageNode",
    //   label: "Image",
    //   icon: "image",
    //   defaultData: { label: "Image", url: "" },
    // },
];
