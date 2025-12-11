const BACKEND = "<BACKEND_URL>"; // replace this when your backend is deployed
const messagesEl = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

async function fetchMessages() {
  try {
    const res = await fetch(`${BACKEND}/api/messages`);
    const data = await res.json();
    messagesEl.innerHTML = data.map(m => `<li>${escapeHtml(m.text)}</li>`).join("");
  } catch (e) {
    messagesEl.innerHTML = "<li>Could not load messages</li>";
    console.error(e);
  }
}

function escapeHtml(str){
  return str.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;
  try {
    await fetch(`${BACKEND}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    input.value = "";
    fetchMessages();
  } catch (e) {
    alert("Error sending message");
    console.error(e);
  }
};

// load on start
fetchMessages();
