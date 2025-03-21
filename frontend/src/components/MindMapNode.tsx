import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Edit2, Trash2 } from 'lucide-react';

interface MindMapNodeProps {
  data: {
    label: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
  };
  id: string;
}

const MindMapNode = ({ data, id }: MindMapNodeProps) => {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-gray-200">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{data.label}</span>
        <div className="flex gap-1">
          <button
            onClick={() => data.onEdit?.(id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => data.onDelete?.(id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(MindMapNode);