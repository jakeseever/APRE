/**
 * Author: Jake Seever
 * Date: 25 January 2025
 * File: agent-performance-by-team.spec.js
 * Description: Test the agent performance by team API
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgentPerformanceByTeamComponent } from './agent-performance-by-team.component';

describe('AgentPerformanceByTeamComponent', () => {
  let component: AgentPerformanceByTeamComponent;
  let fixture: ComponentFixture<AgentPerformanceByTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,AgentPerformanceByTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPerformanceByTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the teamForm with a null value', () => { // See if a team value has been selected. 
    const teamControl = component.teamForm.controls['team'];
    expect(teamControl.value).toBeNull(); //Set the team control value to null.
    expect(teamControl.valid).toBeFalse();
  });

  it('should display the title "Agent Performance by Team"', () => { //Check if the title is correct
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1'); // Grab the H1 element to compare.
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Agent Performance by Team'); //See if it matches this title.
  });

  it('should not submit the form if no team is selected', () => {
    spyOn(component, 'onSubmit').and.callThrough(); // Spy on the submit button

    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.form__actions button');  //Create a test click on the submit button.
    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.teamForm.valid).toBeFalse();// Set the teamform to invalid if no team has been selected. 
  });
});
