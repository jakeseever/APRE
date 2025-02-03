import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerFeedbackByTypeComponent } from './customer-feedback-by-type.component';

describe('CustomerFeedbackByTypeComponent', () => {
  let component: CustomerFeedbackByTypeComponent;
  let fixture: ComponentFixture<CustomerFeedbackByTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,CustomerFeedbackByTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFeedbackByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify the title is correct.
  it('should display the title "Customer Feedback by Type - Tabular"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Customer Feedback by Type - Tabular');
  });

  // Verify the Feedback Type form is null when initialized.
  it('should initialize the feedbackTypeForm with a null value', () => {
    const feedbackTypeControl = component.feedbackTypeForm.controls['feedbackType'];
    expect(feedbackTypeControl.value).toBeNull();
    expect(feedbackTypeControl.valid).toBeFalse();
  });

  // Don't allow the feeback type form to be submitted it no option is selected.
  it('should not submit the form if no feedback type is selected', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.form__actions button');
    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.feedbackTypeForm.valid).toBeFalse();
  });

});
