const copyToBufferFallback = (text: string) => {
  const textArea = document.createElement('textarea');

  textArea.value = text;
  textArea.readOnly = true;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';

  document.body.append(textArea);
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, text.length);

  const isCopied = document.execCommand('copy');

  textArea.remove();

  if (!isCopied) {
    throw new Error('Не удалось скопировать текст');
  }
};

export const copyToBuffer = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    }
    catch {
      copyToBufferFallback(text);
      return;
    }
  }

  copyToBufferFallback(text);
};
