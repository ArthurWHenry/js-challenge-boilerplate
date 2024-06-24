import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

// Components
import { AlertComponent } from './alert.component';

describe('AlertComponent', (): void => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should have default variant "information"', (): void => {
    expect(component.variant).toEqual('information');
  });

  it('should update classes when variant changes', (): void => {
    component.variant = 'success';
    fixture.detectChanges();
    expect(component.classes).toContain('alert__success');
  });

  it('should display title based on variant', (): void => {
    component.variant = 'warning';
    fixture.detectChanges();
    expect(component.title).toEqual('Warning Alert');
  });

  it('should not be visible initially', (): void => {
    expect(component.isVisible).toBeFalse();
  });

  it('should become visible when show is called', (): void => {
    component.show(1000);
    expect(component.isVisible).toBeTrue();
  });

  it('should become invisible when close is called', (): void => {
    component.show(1000);
    component.close();
    expect(component.isVisible).toBeFalse();
  });

  it('should set a timeout when show is called', (): void => {
    spyOn(window, 'setTimeout');
    component.show(1000);
    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 1000);
  });

  it('should clear the timeout when close is called', (): void => {
    spyOn(window, 'clearTimeout');
    component.show(1000);
    component.close();
    expect(window.clearTimeout).toHaveBeenCalledWith(component.timeout);
  });

  it('should remove the message and title when close is called', (): void => {
    component.show(1000);
    component.close();
    expect(component.message).toBe('');
    expect(component.title).toBe('');
  });
});
