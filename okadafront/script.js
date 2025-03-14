function fetchCompletion(inputId, field) {
    let inputText = document.getElementById(inputId).value;
    if (inputText.length < 5) return;

    let requestData = { text: inputText, field: field };  // ✅ `field` を含める
    console.log("📤 送信データ:", requestData);  // 🔍 デバッグ用

    fetch("http://127.0.0.1:8000/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        console.log("📥 APIレスポンス:", response);
        return response.json();
    })
    .then(data => {
        console.log("📩 受信データ:", data);  // ✅ APIの返却データを確認
        let suggestionId = inputId + "Suggestion";  // ✅ 補完を表示する要素の ID
        let suggestionElement = document.getElementById(suggestionId);

        if (data.補完) {
            if (suggestionElement) {
                suggestionElement.textContent = data.補完;
                console.log("✅ 補完適用:", data.補完);
            } else {
                console.error("❌ 補完対象の要素が見つかりません:", suggestionId);
            }
        } else {
            console.error("⚠️ APIの補完データがありません:", data);
        }
    })
    .catch(error => console.error("⚠️ fetch でエラー発生:", error));
}

// ✅ Step2へ移動
function goToStep2() {
  console.log("➡️ Step2へ移動");
  window.location.href = "step2.html";
}
