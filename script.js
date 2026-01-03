async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (input.value.trim() === "") return;

  chatBox.innerHTML += `<div class="user">${input.value}</div>`;

  const userText = input.value;
  input.value = "";

  chatBox.innerHTML += `<div class="bot">Thinking...</div>`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "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"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: userText }]
    })
  });

  const data = await response.json();

  chatBox.lastChild.remove();
  chatBox.innerHTML += `<div class="bot">${data.choices[0].message.content}</div>`;
}
