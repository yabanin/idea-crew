import { MindMapNode } from "../types";

export const sampleMindMapData: MindMapNode = {
    id: "root",
    name: "アイデア出しのフレームワーク",
    children: [
      {
        id: "1",
        name: "機能",
        children: [
          { id: "1-1", name: "ブレインストーミングツール" },
          { id: "1-2", name: "アイデア管理システム" },
          { id: "1-3", name: "フィードバックループ" },
        ]
      },
      {
        id: "2",
        name: "UI",
        children: [
          { id: "2-1", name: "インタラクティブなダッシュボード" },
          { id: "2-2", name: "カスタマイズ可能なテンプレート" },
          { id: "2-3", name: "アニメーションガイド" },
        ]
      },
      {
        id: "3",
        name: "技術",
        children: [
          { id: "3-1", name: "AIによるアイデア提案" },
          { id: "3-2", name: "クラウドベースのコラボレーション" },
          { id: "3-3", name: "データ分析ツール" },
        ]
      }
      ,
      {
        id: "4",
        name: "ビジネスモデル",
        children: [
          { id: "4-1", name: "サブスクリプションモデル" },
          { id: "4-2", name: "フリーミアムモデル" },
          { id: "5-3", name: "企業向けパッケージ" },
        ]
      }
    ]
  };