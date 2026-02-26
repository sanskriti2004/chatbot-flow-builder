# Chatbot Flow Builder

A visual chatbot flow builder built with React, React Flow and TypeScript. Design conversational flows by dragging, dropping and connecting message nodes on an interactive canvas.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- Drag-and-drop node creation from the sidebar
- Text message nodes with editable content
- Visual edge connections between nodes
- Single outgoing edge per source handle (automatically replaces)
- Flow validation on save (checks for disconnected nodes)
- Toast notifications for save feedback
- Keyboard shortcuts (Delete/Backspace to remove nodes)
- Extensible node type registry

## Deployment

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to Vercel, Netlify, or any static hosting.
