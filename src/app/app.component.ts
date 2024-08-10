import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  title = 'trigger-chrome-extension';
}

function checkForInputs() {
  let hasPasswordInput = document.querySelector('input[type="password"]') !== null;
  let hasTextInput = document.querySelector('input[type="text"]') !== null;

  if (hasPasswordInput || hasTextInput) {
    console.log('This page has password or text input fields.');
    // You can trigger your desired action here
  } else {
    console.log('This page does not have password or text input fields.');
  }
}

// Call the function when the page loads
window.addEventListener('load', checkForInputs);
