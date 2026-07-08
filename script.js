const input = document.getElementById('input');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const status = document.getElementById('status');

const output2 = document.getElementById('output2');
const copyBtn2 = document.getElementById('copyBtn2');
const status2 = document.getElementById('status2');

function getParts() {
  const raw = input.value;
  return raw
    .split(/[\s,;]+/)
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
}

function update() {
  const parts = getParts();
  output.textContent = parts.join(';');
  output2.textContent = parts.map(function (p) { return "'" + p + "'"; }).join(', ');
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

copyBtn2.addEventListener('click', async function () {
  const text = output2.textContent;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    showStatus2('Tersalin');
  } catch (e) {
    const range = document.createRange();
    range.selectNode(output2);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    showStatus2('Tersalin');
  }
});

function showStatus(msg) {
  status.textContent = msg;
  setTimeout(function () {
    status.textContent = '';
  }, 1500);
}

function showStatus2(msg) {
  status2.textContent = msg;
  setTimeout(function () {
    status2.textContent = '';
  }, 1500);
}
