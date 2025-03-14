import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface CanvasSection {
  title: string;
  placeholder: string;
  value: string;
}

function LeanCanvas() {
  const [sections, setSections] = useState<CanvasSection[]>([
    { title: '問題', placeholder: '解決すべき上位3つの問題は何ですか？', value: '' },
    { title: '既存の代替品', placeholder: '現在どのように問題が解決されていますか？', value: '' },
    { title: 'ユニークな価値提案', placeholder: 'なぜあなたの解決策は違いを生むのですか？', value: '' },
    { title: 'ソリューション', placeholder: '各問題に対する解決策は何ですか？', value: '' },
    { title: '主要指標', placeholder: '成功を測る重要な数値は何ですか？', value: '' },
    { title: '競争優位性', placeholder: '簡単に複製できない優位性は何ですか？', value: '' },
    { title: 'チャネル', placeholder: 'ユーザーにどのようにリーチしますか？', value: '' },
    { title: '顧客セグメント', placeholder: 'ターゲットユーザーは誰ですか？', value: '' },
    { title: 'コスト構造', placeholder: '主なコストは何ですか？', value: '' },
    { title: '収益の流れ', placeholder: '収益はどのように生み出されますか？', value: '' },
  ]);

  const handleChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index].value = value;
    setSections(newSections);
  };

  const handleSave = () => {
    console.log('保存されたデータ:', sections);
    // ここに保存のロジックを追加
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">リーンキャンバス</h1>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save size={20} />
            保存
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {section.title}
              </h2>
              <textarea
                value={section.value}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={section.placeholder}
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeanCanvas;