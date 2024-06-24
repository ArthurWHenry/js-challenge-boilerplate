import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { ButtonComponent } from './button.component';

describe('ButtonComponent', (): void => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should have the default text', (): void => {
    const defaultText = 'Submit';
    expect(component.text).toEqual(defaultText);
  });

  it('should update the text when input changes', (): void => {
    const newText = 'Click Me';
    component.text = newText;
    fixture.detectChanges();
    expect(component.text).toEqual(newText);
  });

  it('should have the primary variant by default', (): void => {
    const defaultVariant = 'primary';
    expect(component.variant).toEqual(defaultVariant);
  });

  it('should have the disabled property set to false by default', (): void => {
    const defaultDisabled = false;
    expect(component.disabled).toEqual(defaultDisabled);
  });

  it('should update the disabled state when input changes', (): void => {
    component.disabled = true;
    fixture.detectChanges();
    expect(component.disabled).toBeTruthy();
  });

  it('should render the button with the correct variant class', (): void => {
    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    const expectedClass = 'button__primary';
    expect(buttonElement.classList.contains(expectedClass)).toBeTruthy();
  });

  it('should reflect the correct class when variant changes', (): void => {
    component.variant = 'secondary';
    fixture.detectChanges();
    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    expect(component.variant).toEqual('secondary');
    expect(buttonElement.classList.contains('button__secondary')).toBeTruthy();
  });

  it('should emit an event when clicked', (): void => {
    let clicked: boolean = false;
    component.onClick = (): void => {
      clicked = true;
    };

    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(clicked).toBeTruthy();
  });

  it('should not emit an event when clicked if disabled', (): void => {
    let clicked: boolean = false;
    component.onClick = (): void => {
      clicked = true;
    };
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    buttonElement.click();

    expect(clicked).toBeFalsy();
  });
});
