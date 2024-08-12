chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'detectPasswordInputs') {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    sendResponse({ hasPasswordInput: passwordInputs.length > 0 });
  }
});
