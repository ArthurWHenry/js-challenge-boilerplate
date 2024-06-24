import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should have the primary variant by default', (): void => {
    const defaultVariant = 'primary';
    expect(component.variant).toEqual(defaultVariant);
  });

  it('should have the disabled property set to false by default', (): void => {
    const defaultDisabled = false;
    expect(component.disabled).toEqual(defaultDisabled);
  });

  it('should render the button with the correct variant class', (): void => {
    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    const expectedClass = 'button__primary';
    expect(buttonElement.classList.contains(expectedClass)).toBeTruthy();
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
});
