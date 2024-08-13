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
  inputDetails: string | null = null;

  detectInputs() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: 'detectInputs' },
          {},
          (response: any) => {
            console.log('hello');
            // if (response.hasPasswordInput) {
            //   this.result = "input(s) detected and icon added";
            //   this.iconAdded = true;
            //   this.inputDetails = `Password inputs: ${response.hasPasswordInput ? 'Yes' : 'No'}, Text inputs: ${response.hasTextInput ? 'Yes' : 'No'}, Email inputs: ${response.hasEmailInput ? 'Yes' : 'No'}, Total inputs: ${response.totalInputs}`;
            // } else {
            //   this.result = "No inputs detected on this page";
            //   this.iconAdded = false;
            //   this.inputDetails = null;
            // }
          }
        );
      }
    });
  }

}
