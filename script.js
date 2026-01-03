const API_KEY = "PASTE_YOUR_GROQ_API_KEY_HERE";

async function send() {
  let input = document.getElementById("userInput");
  let text = input.value.trim();
  if (text === "") return;

  let chat = document.getElementById("chat");

  // User message
  chat.innerHTML += `<div class="msg user">${text}</div>`;
  input.value = "";

  // Loading message
  let loadingId = "loading_" + Date.now();
  chat.innerHTML += `<div class="msg bot" id="${loadingId}">सोच रहा हूँ 🤔...</div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    let res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "तुम एक मददगार हिंदी AI हो" },
          { role: "user", content: text }
        ]
      })
    });

    let data = await res.json();
    let reply = data.choices[0].message.content;

    document.getElementById(loadingId).innerHTML = reply;
    chat.scrollTop = chat.scrollHeight;

  } catch (e) {
    document.getElementById(loadingId).innerHTML =
      "❌ Error: AI से कनेक्ट नहीं हो पाया";
  }
}
