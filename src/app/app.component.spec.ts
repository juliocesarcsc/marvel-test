import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
    });
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Find Hero by ID'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Find Hero by ID');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header > h1').textContent).toContain('Find Hero by ID');
  }));

  it(`should set alertText to 'someText'`, async(() => {
    comp.showMsg('someText');
    expect(comp.alertText).toBe('someText');
    expect(comp.alertClass).toBe('danger');
    expect(comp.showAlert).toBeTruthy();
  }));

  it(`should set alertClass to 'info'`, async(() => {
    comp.showMsg('someText', false);
    expect(comp.alertText).toBe('someText');
    expect(comp.alertClass).toBe('info');
    expect(comp.showAlert).toBeTruthy();
  }));

  it(`should set alertMsg to 'Service offline' on handle error status 0`, async(() => {
    comp.handleError(new HttpErrorResponse({status: 0}));
    expect(comp.alertText).toBe('Service offline');
    expect(comp.alertClass).toBe('danger');
    expect(comp.showAlert).toBeTruthy();
  }));

  it(`should set alertMsg to error status value on handle api error`, async(() => {
    comp.handleError(new HttpErrorResponse({status: 404, error: {status: 'We couldn\'t find that character'}}));
    expect(comp.alertText).toBe('We couldn\'t find that character');
    expect(comp.alertClass).toBe('danger');
    expect(comp.showAlert).toBeTruthy();
  }));

  it(`should set alertMsg to error message value on handle api error`, async(() => {
    comp.handleError(new HttpErrorResponse({status: 401, error: {message: 'Invalid credentials'}}));
    expect(comp.alertText).toBe('Invalid credentials');
    expect(comp.alertClass).toBe('danger');
    expect(comp.showAlert).toBeTruthy();
  }));

  it(`should set alertMsg to 'An unexpected error occurred.' on handle unknow error`, async(() => {
    comp.handleError(new HttpErrorResponse({status: 500}));
    expect(comp.alertText).toBe('An unexpected error occurred.');
    expect(comp.alertClass).toBe('danger');
    expect(comp.showAlert).toBeTruthy();
  }));
});
