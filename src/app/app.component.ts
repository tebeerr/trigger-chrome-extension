import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl:'app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  result: string | null = null;

  detectPasswordInputs() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: 'detectPasswordInputs' },
          (response) => {
            this.result = response.hasPasswordInput
              ? "There's a password input in this web page"
              : "There isn't any password input in this web page";
          }
        );
      }
    });
  }
}
