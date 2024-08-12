import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: 'app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  result: string | null = null;
  iconAdded: boolean = false;

  detectPasswordInputs() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: 'detectPasswordInputs' },
          (response) => {
            if (response.hasPasswordInput) {
              this.result = "Password input(s) detected and icon added";
              this.iconAdded = true;
            } else {
              this.result = "No password inputs detected on this page";
              this.iconAdded = false;
            }
          }
        );
      }
    });
  }
}
