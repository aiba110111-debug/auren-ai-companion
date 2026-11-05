const form = document.getElementById('chat-form');
const input = document.getElementById('prompt');
const messages = document.getElementById('messages');

function appendMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = `message ${role}`;

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;

  msg.appendChild(bubble);
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const prompt = input.value.trim();
  if (!prompt) return;

  appendMessage('user', prompt);
  input.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    appendMessage('bot', data.reply || 'Ошибка ответа.');
  } catch (error) {
    appendMessage('bot', 'Не удалось подключиться к серверу. Проверьте запуск приложения.');
    console.error(error);
  }
});
