function setupConverter(config) {
  const input = document.getElementById(config.inputId);
  const output = document.getElementById(config.outputId);
  const copyBtn = document.getElementById(config.copyBtnId);
  const clearBtn = document.getElementById(config.clearBtnId);
  const status = document.getElementById(config.statusId);
  const count = document.getElementById(config.countId);

  function getParts() {
    return input.value
      .split(/[\s,;]+/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  function update() {
    const parts = getParts();
    output.textContent = config.format(parts);
    count.textContent = parts.length + (parts.length === 1 ? ' angka' : ' angka');
  }

  input.addEventListener('input', update);

  copyBtn.addEventListener('click', async function () {
    const text = output.textContent;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showStatus();
    } catch (e) {
      const range = document.createRange();
      range.selectNode(output);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      showStatus();
    }
  });

  clearBtn.addEventListener('click', function () {
    input.value = '';
    update();
    input.focus();
  });

  function showStatus() {
    status.textContent = 'Tersalin';
    setTimeout(function () {
      status.textContent = '';
    }, 1500);
  }

  update();
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
