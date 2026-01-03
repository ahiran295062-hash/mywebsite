async function askAI() {
  const replyBox = document.getElementById("reply");

  replyBox.innerText = "सोच रहा हूँ...";

  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    replyBox.innerText = data.content;
  } catch (err) {
    replyBox.innerText = "Error आया, फिर से try करो";
  }
}
