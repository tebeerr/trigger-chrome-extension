import {
  ComponentFixture, fakeAsync,
  TestBed, tick,
} from '@angular/core/testing';
import {AppComponent} from "./app.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],

    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the app', async () => {
    await fixture.whenStable();
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.result).toBeNull();
    expect(component.iconAdded).toBeFalse();
    expect(component.inputDetails).toBeNull();
  });

  describe('detectInputs', () => {
    let chromeTabsSpy: jasmine.SpyObj<any>;

    beforeEach(() => {
      chromeTabsSpy = jasmine.createSpyObj('chrome.tabs', ['query', 'sendMessage']);
      (window as any).chrome = {
        tabs: chromeTabsSpy
      };
    });

    afterEach(() => {
      delete (window as any).chrome;
    });

    it('should update component properties when inputs are detected', fakeAsync(() => {
      const mockTab = {id: 1};
      const mockResponse = {
        hasPasswordInput: true,
        hasTextInput: true,
        hasEmailInput: true,
        totalInputs: 3
      };

      chromeTabsSpy.query.and.callFake((queryInfo: any, callback?: (result: any[]) => void) => {
        if (callback) {
          callback([mockTab]);
        }
        return Promise.resolve([mockTab]);
      });

      chromeTabsSpy.sendMessage.and.callFake((tabId: number, message: any, options: any, callback?: (response: any) => void) => {
        if (callback) {
          callback(mockResponse);
        }
        return Promise.resolve(mockResponse);
      });

      component.detectInputs();
      tick();

      expect(component.result).toBe("input(s) detected and icon added");
      expect(component.iconAdded).toBeTrue();
      expect(component.inputDetails).toBe("Password inputs: Yes, Text inputs: Yes, Email inputs: Yes, Total inputs: 3");
    }));

    it('should update component properties when no inputs are detected', fakeAsync(() => {
      const mockTab = {id: 1};
      const mockResponse = {
        hasPasswordInput: false,
        hasTextInput: false,
        hasEmailInput: false,
        totalInputs: 0
      };

      chromeTabsSpy.query.and.callFake((queryInfo: any, callback: (result: any[]) => void) => {
        callback([mockTab]);
      });

      chromeTabsSpy.sendMessage.and.callFake((tabId: number, message: any, callback: (response: any) => void) => {
        callback(mockResponse);
      });

      component.detectInputs();
      tick();

      expect(component.result).toBe("No inputs detected on this page");
      expect(component.iconAdded).toBeFalse();
      expect(component.inputDetails).toBeNull();
    }));
  });
});
