import { MindMapNode } from "../types";

export const sampleMindMapData: MindMapNode = {
    id: "root",
    name: "メインアイデア",
    children: [
      {
        id: "1",
        name: "トピック 1",
        children: [
          { id: "1-1", name: "サブトピック 1.1" },
          { id: "1-2", name: "サブトピック 1.2" },
          { id: "1-3", name: "サブトピック 1.3" },
        ]
      },
      {
        id: "2",
        name: "トピック 2",
        children: [
          { id: "2-1", name: "サブトピック 2.1" },
          { id: "2-2", name: "サブトピック 2.2" },
        ]
      },
      {
        id: "3",
        name: "トピック 3",
        children: [
          { id: "3-1", name: "サブトピック 3.1" },
          { id: "3-2", name: "サブトピック 3.2" },
          { id: "3-3", name: "サブトピック 3.3" },
        ]
      }
    ]
  };