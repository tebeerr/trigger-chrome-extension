// content.js
function detectInputs() {
  const textInputs = document.querySelectorAll('input[type="text"]');
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  return {
    textInputs: textInputs.length,
    passwordInputs: passwordInputs.length
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'detectInputs') {
    sendResponse(detectInputs());
  }
});
