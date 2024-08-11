import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    @if (result) {
    <button (click)="detectInputs()">Detect Inputs</button>
    <p>
    Text inputs: {{ result.textInputs }}<br>
    Password inputs: {{ result.passwordInputs }}
    </p>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {

  result: { textInputs: number; passwordInputs: number } | null = null;

  detectInputs() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: 'detectInputs' },
          (response) => {
            this.result = response;
          }
        );
      }
    });
  }
}
