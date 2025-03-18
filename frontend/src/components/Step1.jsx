import { useState } from "react";

export default function Step1({ onNext }) {
  const [formData, setFormData] = useState({
    who: "",
    what: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onNext(formData); // Step2にデータを渡す
  };

  return (
    <div className="p-4">
      <header className="mb-4">
        <img src="image_1.png" alt="IdeaCrew Logo" className="h-12" />
      </header>

      <h1 className="text-xl font-bold mb-4">Step1</h1>

      <div className="input-container mb-4">
        <label htmlFor="who" className="block font-bold">誰のため？</label>
        <input
          type="text"
          name="who"
          value={formData.who}
          onChange={handleChange}
          placeholder="例: ハッカソン参加者"
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="input-container mb-4">
        <label htmlFor="what" className="block font-bold">何を解決する？</label>
        <input
          type="text"
          name="what"
          value={formData.what}
          onChange={handleChange}
          placeholder="例: アイデア出しの手助け"
          className="border p-2 rounded w-full"
        />
      </div>

      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        次へ
      </button>
    </div>
  );
}
