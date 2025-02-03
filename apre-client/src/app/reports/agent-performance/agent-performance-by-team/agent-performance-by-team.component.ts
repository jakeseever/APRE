/**
 * Author: Jake Seever
 * Date: 25 January 2025
 * File: agent-performance-by-team.js
 * Description: The agent performance by team component
 */


import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule} from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from '../../../shared/table/table.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agent-performance-by-team',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent, CommonModule],
  template: `
    <h1>Agent Performance by Team</h1>
    <div class="team-container">
      <form class="form" [formGroup]="teamForm" (ngSubmit)="onSubmit()">
        <div class="form__group">
          <label class="label" for="team">Team</label>
          <select class="select" formControlName="team" id="team" name="team">
            @for(team of teams; track team) {
              <option value="{{ team }}">{{ team }}</option>
            }
          </select>
        </div>
        <div class="form__actions">
          <button class="button button--primary" type="submit">Submit</button>
        </div>
      </form>

      @if(agentData.length > 0) {
        <div class="card chart-card">
          <app-table
            [title]="'Agent Performance by Team'"
            [data]="agentData"
            [headers]="['Team', 'Call Duration', 'Customer Feedback','Resolution Time']"
            [sortableColumns]="['Call Duration', 'Customer Feedback', 'Resolution Time']"
            [headerBackground]="'secondary'"
          >
          </app-table>
        </div>
      }
    </div>
  `, 
  styles: [`
    .team-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form, .chart-card {
      width: 80%;
      margin: 20px 0;
      padding: 20px;
    }

    app-table {
      padding: 50px;
    }    
  `]
  }) 
export class AgentPerformanceByTeamComponent implements AfterViewInit {
  teams: string[] = [];
  agentData: [] = [];
  teamData: [] = [];

  teamForm = this.fb.group({
    team: [null, Validators.compose([Validators.required])]
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.http.get(`${environment.apiBaseUrl}/reports/agent-performance/teams`).subscribe({ 
      next: (data: any) => {
        this.teams = data;
        console.log(this.teams); //Console log the list of teams
      },
      error: (err) => {
        console.error('Error fetching teams:', err); // Throw an error if the teams couldn't be fetched.
      }
    });
  }
  ngAfterViewInit(): void {
    // No need to create the table here, it will be handled by tableComponent
  }
  onSubmit() {
    const team = this.teamForm.controls['team'].value;

    this.http.get(`${environment.apiBaseUrl}/reports/agent-performance/teams/${team}`).subscribe({
        next: (data: any) => {
          this.agentData = data;
          for (let data of this.agentData) { // Loop over the agent data and display the data in the  agent perfomance by team table.
              data['Team'] = data['team'];
              data['Call Duration'] = data['callDuration'];
              data['Customer Feedback'] = data['customerFeedback'];
              data['Resolution Time'] = data['resolutionTime'];
            }         
        }
    })
  }
}
