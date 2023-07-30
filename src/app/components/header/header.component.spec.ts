import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app name', () =>
  {
    const appNameElement: HTMLElement = fixture.nativeElement.querySelector('.my-navbar-brand');
    expect(appNameElement.textContent).toContain('RECRUITMENT-TASK');
  });

  it('should have "Load XML" and "View XML" buttons', () => 
  {
    const loadXMLButton: HTMLElement = fixture.nativeElement.querySelector('.my-btn2.me-2[role="button"]');
    const viewXMLButton: HTMLElement = fixture.nativeElement.querySelector('.my-btn2:not(.me-2)[role="button"]');

    expect(loadXMLButton.textContent).toContain('Load XML');
    expect(viewXMLButton.textContent).toContain('View XML');
  });
});
