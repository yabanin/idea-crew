import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
} from 'reactflow';
import { Plus } from 'lucide-react';
import 'reactflow/dist/style.css';

import MindMapNode from './MindMapNode';
import { MindMapNode as MindMapNodeType } from '../types';

const nodeTypes = {
  mindmap: MindMapNode,
};

const initialNodes: MindMapNodeType[] = [
  {
    id: '1',
    type: 'mindmap',
    data: { label: 'Main Topic' },
    position: { x: 0, y: 0 },
  },
];
 
export default function MindMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleAddNode = useCallback(() => {
    const newNode: MindMapNodeType = {
      id: `${Date.now()}`,
      type: 'mindmap',
      data: { label: 'New Topic' },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const handleEditNode = useCallback(
    (id: string) => {
      const label = prompt('Enter new label:');
      if (label) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id ? { ...node, data: { ...node.data, label } } : node,
          ),
        );
      }
    },
    [setNodes],
  );

  const handleDeleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    },
    [setNodes, setEdges],
  );

  return (
    <div className="w-screen h-screen bg-gray-50">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onEdit: handleEditNode,
            onDelete: handleDeleteNode,
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>

      <button
        onClick={handleAddNode}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}