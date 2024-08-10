import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InputTriggerComponent} from "./input-trigger/input-trigger.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputTriggerComponent],
  template: `
    <button (click)="detectInputs()">Detect Inputs</button>
    <p *ngIf="result">
      Text inputs: {{ result.textInputs }}<br>
      Password inputs: {{ result.passwordInputs }}
    </p>
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
