chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'detectPasswordInputs') {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    if (passwordInputs.length > 0) {
      passwordInputs.forEach(input => {
        // Create a container for the input and icon
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.display = 'inline-block';

        // Clone the input and replace it with the container
        const clone = input.cloneNode(true);
        input.parentNode.replaceChild(container, input);
        container.appendChild(clone);

        // Create and add the SVG icon
        const icon = document.createElement('img');
        icon.src = 'https://storage.googleapis.com/bazz-testing.appspot.com/48x48.png';
        icon.style.position = 'absolute';
        icon.style.right = '5px';
        icon.style.top = '50%';
        icon.style.transform = 'translateY(-50%)';
        icon.style.width = '20px';
        icon.style.height = '20px';
        icon.style.pointerEvents = 'none';
        container.appendChild(icon);
      });
    }
    sendResponse({ hasPasswordInput: passwordInputs.length > 0 });
  }
});
