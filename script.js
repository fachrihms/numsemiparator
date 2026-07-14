/* ---- Navigasi sidebar ---- */
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(function (item) {
  item.addEventListener('click', function () {
    navItems.forEach(function (n) { n.classList.remove('active'); });
    pages.forEach(function (p) { p.classList.remove('active'); });
    item.classList.add('active');
    document.getElementById(item.getAttribute('data-target')).classList.add('active');
  });
});

function parseList(raw) {
  return raw
    .split(/[\r\n,;]+/)
    .map(function (s) { return s.trim().replace(/^['"]+|['"]+$/g, '').trim(); })
    .filter(Boolean);
}

function setupConverter(config) {
  const input = document.getElementById(config.inputId);
  const output = document.getElementById(config.outputId);
  const copyBtn = document.getElementById(config.copyBtnId);
  const clearBtn = document.getElementById(config.clearBtnId);
  const status = document.getElementById(config.statusId);
  const count = document.getElementById(config.countId);

  function update() {
    const parts = parseList(input.value);
    output.textContent = config.format(parts);
    count.textContent = parts.length + ' angka';
  }

  input.addEventListener('input', update);

  copyBtn.addEventListener('click', async function () {
    const text = output.textContent;
    if (!text) return;
    await copyText(text, output);
    showStatus(status);
  });

  clearBtn.addEventListener('click', function () {
    input.value = '';
    update();
    input.focus();
  });

  update();
}

async function copyText(text, fallbackEl) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    const range = document.createRange();
    range.selectNode(fallbackEl);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }
}

function showStatus(el) {
  el.textContent = 'Tersalin';
  setTimeout(function () {
    el.textContent = '';
  }, 1500);
}

setupConverter({
  inputId: 'input1',
  outputId: 'output1',
  copyBtnId: 'copyBtn1',
  clearBtnId: 'clearBtn1',
  statusId: 'status1',
  countId: 'count1',
  format: function (parts) { return parts.join(';'); }
});

setupConverter({
  inputId: 'input2',
  outputId: 'output2',
  copyBtnId: 'copyBtn2',
  clearBtnId: 'clearBtn2',
  statusId: 'status2',
  countId: 'count2',
  format: function (parts) {
    return parts.map(function (p) { return "'" + p + "'"; }).join(', ');
  }
});

/* ---- Bandingkan dua daftar ---- */
const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');
const countA = document.getElementById('countA');
const countB = document.getElementById('countB');

const matchList = document.getElementById('matchList');
const onlyAList = document.getElementById('onlyAList');
const onlyBList = document.getElementById('onlyBList');
const countMatch = document.getElementById('countMatch');
const countOnlyA = document.getElementById('countOnlyA');
const countOnlyB = document.getElementById('countOnlyB');
const statusCompare = document.getElementById('statusCompare');

function updateCompare() {
  const listA = parseList(inputA.value);
  const listB = parseList(inputB.value);

  countA.textContent = listA.length + ' angka';
  countB.textContent = listB.length + ' angka';

  const setA = new Set(listA);
  const setB = new Set(listB);

  // Preserve order, dedupe within each result
  const seenMatch = new Set();
  const match = [];
  listA.forEach(function (v) {
    if (setB.has(v) && !seenMatch.has(v)) {
      match.push(v);
      seenMatch.add(v);
    }
  });

  const seenOnlyA = new Set();
  const onlyA = [];
  listA.forEach(function (v) {
    if (!setB.has(v) && !seenOnlyA.has(v)) {
      onlyA.push(v);
      seenOnlyA.add(v);
    }
  });

  const seenOnlyB = new Set();
  const onlyB = [];
  listB.forEach(function (v) {
    if (!setA.has(v) && !seenOnlyB.has(v)) {
      onlyB.push(v);
      seenOnlyB.add(v);
    }
  });

  matchList.textContent = match.join('\n');
  onlyAList.textContent = onlyA.join('\n');
  onlyBList.textContent = onlyB.join('\n');

  countMatch.textContent = match.length;
  countOnlyA.textContent = onlyA.length;
  countOnlyB.textContent = onlyB.length;
}

inputA.addEventListener('input', updateCompare);
inputB.addEventListener('input', updateCompare);
updateCompare();

document.getElementById('copyMatch').addEventListener('click', async function () {
  if (!matchList.textContent) return;
  await copyText(matchList.textContent, matchList);
  showStatus(statusCompare);
});
document.getElementById('copyOnlyA').addEventListener('click', async function () {
  if (!onlyAList.textContent) return;
  await copyText(onlyAList.textContent, onlyAList);
  showStatus(statusCompare);
});
document.getElementById('copyOnlyB').addEventListener('click', async function () {
  if (!onlyBList.textContent) return;
  await copyText(onlyBList.textContent, onlyBList);
  showStatus(statusCompare);
});

/* ---- Template pesan ---- */
const opening = document.getElementById('opening');
const body = document.getElementById('body');
const closingBtns = document.querySelectorAll('.closing-btn');
const closingPreview = document.getElementById('closingPreview');
const outputTemplate = document.getElementById('outputTemplate');
const copyTemplateBtn = document.getElementById('copyTemplate');
const clearTemplateBtn = document.getElementById('clearTemplate');
const statusTemplate = document.getElementById('statusTemplate');

let selectedClosing = closingBtns[0].getAttribute('data-closing');
closingBtns[0].classList.add('active');
closingPreview.textContent = selectedClosing;

closingBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    closingBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    selectedClosing = btn.getAttribute('data-closing');
    closingPreview.textContent = selectedClosing;
    updateTemplate();
  });
});

function updateTemplate() {
  const parts = [];
  if (opening.value.trim()) parts.push(opening.value.trim());
  if (body.value.trim()) parts.push(body.value.trim());
  if (selectedClosing) parts.push(selectedClosing);
  outputTemplate.textContent = parts.join('\n\n');
}

opening.addEventListener('input', updateTemplate);
body.addEventListener('input', updateTemplate);
updateTemplate();

copyTemplateBtn.addEventListener('click', async function () {
  const text = outputTemplate.textContent;
  if (!text) return;
  await copyText(text, outputTemplate);
  showStatus(statusTemplate);
});

clearTemplateBtn.addEventListener('click', function () {
  body.value = '';
  updateTemplate();
  body.focus();
});

/* ---- Template siap pakai ---- */
const genPengecekanBtn = document.getElementById('genPengecekan');
const outputQuick = document.getElementById('outputQuick');
const copyQuickBtn = document.getElementById('copyQuick');
const statusQuick = document.getElementById('statusQuick');

const TEMPLATE_PENGECEKAN = 'Kepada Yth. Bapak/ Ibu,\n\nTerkait kendala yang dialami sedang kami lakukan pengecekan terlebih dahulu, sehingga mohon kesediaannya untuk menunggu informasi lebih lanjut dari kami kembali.\n\nAtas perhatian dan kerja samanya kami ucapkan terima kasih.';

genPengecekanBtn.addEventListener('click', function () {
  outputQuick.textContent = TEMPLATE_PENGECEKAN;
});

copyQuickBtn.addEventListener('click', async function () {
  const text = outputQuick.textContent;
  if (!text) return;
  await copyText(text, outputQuick);
  showStatus(statusQuick);
});
