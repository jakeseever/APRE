/**
 * Author: Jake Seever
 * Date: 29 January 2025
 * File: customer-feedback-by-type.js
 * Description: The customer feedback by feedback type Tablular Component.
 */

import { AfterViewInit, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/table/table.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-feedback-by-type',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule, CommonModule],
  template: `
    <h1>Customer Feedback by Type - Tabular</h1>
    <div class="feedback-type-container">
      <form class="form" [formGroup]="feedbackTypeForm" (ngSubmit)="onSubmit()">
        <div class="form__group">
          <label class="label" for="feedbackType">Feedback Type</label>
          <select class="select" formControlName="feedbackType" id="feedbackType" name="feedbackType">
            @for(feedbackType of feedbackTypes; track feedbackType) {
              <option value="{{ feedbackType }}">{{ feedbackType }}</option>
            }
          </select>
        </div>
        <div class="form__actions">
          <button class="button button--primary" type="submit">Submit</button>
        </div>
      </form>

      @if (customerFeedback.length > 0) {
        <div class="card chart-card">
          <app-table
            [title]="'Customer Feedback by Type - Tabular'"
            [data]="customerFeedback"
            [headers]="['Feedback Sentiment', 'Feedback Text', 'Rating']"
            [sortableColumns]="['Feedback Sentiment', 'Feedback Text', 'Rating']"
            [headerBackground]="'secondary'"
            >
          </app-table>
        </div>
      }
    </div>
  `,
  styles: `
      .feedback-type-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form, .chart-card {
      width: 70%;
      margin: 20px 0;
      padding: 10px;
    }

    app-table {
      padding: 50px;
    }
  `
})

export class CustomerFeedbackByTypeComponent implements AfterViewInit{
  customerFeedback: any[] = [];
  feedbackTypes: any[] = [];


  feedbackTypeForm = this.fb.group({
    feedbackType: [null, Validators.compose([Validators.required])]
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.http.get(`${environment.apiBaseUrl}/reports/customer-feedback/feedbackTypes`).subscribe({
       next: (data: any) => {
        this.feedbackTypes = data;
        console.log(this.feedbackTypes);
      },
      error: (err) => {
        console.error('Error fetching feedback types:', err);
      }
    });
  }

  ngAfterViewInit(): void {
    // No need to create the table here, it will be handled by tableComponent
  }

  // When the submit button is clicked. Diplay the feedback by type data for the selected value.
  onSubmit() {
    const feedbackType = this.feedbackTypeForm.controls['feedbackType'].value;
    this.http.get(`${environment.apiBaseUrl}/reports/customer-feedback/feedbackTypes/${feedbackType}`).subscribe({
      next: (data: any) => {
        this.customerFeedback = data;
          for (let data of this.customerFeedback) {
            data['Feedback Sentiment'] = data['feedbackSentiment']; //Add the feedback sentiment for the document.
            data['Feedback Text'] = data['feedbackText']; //Add the feedback text for the document.
            data['Rating'] = data['rating']; //Add the reating for the document.
            }
      }
    })
  }
}
