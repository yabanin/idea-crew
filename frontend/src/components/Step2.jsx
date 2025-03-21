import { useState } from "react";

export default function Step2({ initialData, onBack }) {
  const [formData, setFormData] = useState({
    who: initialData.who || "",
    what: initialData.what || "",
    value: "",
    summary: "",
    beforeAfter: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      <img src="image_1.png" alt="IdeaCrew Logo" className="h-12" />
      <h1 className="text-xl font-bold my-4">Step2</h1>

      <div className="container space-y-4">
        {/* ✅ 「誰のため？」（Step1から引き継ぐ） */}
        <div className="input-container">
          <label>誰のため？</label>
          <input type="text" value={formData.who} className="border p-2 rounded w-full" />
        </div>

        {/* ✅ 「何を解決する？」（Step1から引き継ぐ） */}
        <div className="input-container">
          <label>何を解決する？</label>
          <input type="text" value={formData.what} className="border p-2 rounded w-full" />
        </div>

        {/* ✅ 「提供価値」 */}
        <div className="input-container">
          <label>提供価値</label>
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="例: 効率的なブレインストーミング支援"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* ✅ 「概要」 */}
        <div className="input-container">
          <label>概要</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="3"
            placeholder="例: チームのアイデア出しをスムーズにするツール"
            className="border p-2 rounded w-full"
          ></textarea>
        </div>

        {/* ✅ 「Before / After」 */}
        <div className="input-container">
          <label>Before / After</label>
          <textarea
            name="beforeAfter"
            value={formData.beforeAfter}
            onChange={handleChange}
            rows="3"
            placeholder="例: 現状の課題と、このツールを使うことでどう改善されるか"
            className="border p-2 rounded w-full"
          ></textarea>
        </div>

        {/* ✅ ボタンエリア */}
        <div className="button-container flex justify-between mt-4">
          <button onClick={onBack} className="bg-gray-500 text-white p-2 rounded">戻る</button>
          <button className="bg-blue-500 text-white p-2 rounded">次へ</button>
        </div>
      </div>
    </div>
  );
}
