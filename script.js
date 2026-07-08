const input = document.getElementById('input');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const status = document.getElementById('status');

function update() {
  const raw = input.value;
  const parts = raw
    .split(/[\s,;]+/)
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
  output.textContent = parts.join(';');
}

input.addEventListener('input', update);
update();

copyBtn.addEventListener('click', async function () {
  const text = output.textContent;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showStatus('Tersalin');
  } catch (e) {
    const range = document.createRange();
    range.selectNode(output);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    showStatus('Tersalin');
  }
});

clearBtn.addEventListener('click', function () {
  input.value = '';
  update();
  input.focus();
});

function showStatus(msg) {
  status.textContent = msg;
  setTimeout(function () {
    status.textContent = '';
  }, 1500);
}
