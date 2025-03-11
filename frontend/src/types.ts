export interface MindMapNode {
    id: string;
    type: 'mindmap';
    data: {
      label: string;
    };
    position: {
      x: number;
      y: number;
    };
  }