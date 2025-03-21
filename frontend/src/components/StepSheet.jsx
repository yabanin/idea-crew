import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

async function fetchChatGPTCompletion(who, what) {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "あなたはビジネスアイデアのアシスタントです。" },
        { role: "user", content: `ターゲット: ${who}\n解決する課題: ${what}\nこの情報を元に以下を考えてください。\n1. 提供価値\n2. 概要\n3. Before / After` },
      ],
    }),
  });

  const data = await response.json();
  const completionText = data.choices[0].message.content.split("\n");

  return {
    value: completionText[0] || "",
    summary: completionText[1] || "",
    beforeAfter: completionText[2] || "",
  };
}

export default function StepSheet() {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState({});

  const handleNext = (data) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 initialData={step1Data} onBack={handleBack} />}
    </div>
  );
}
