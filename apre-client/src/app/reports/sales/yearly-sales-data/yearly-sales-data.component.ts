import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from './../../../shared/table/table.component';

@Component({
  selector: 'app-yearly-sales-data',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule],
  template: `
   <h1>Yearly Sales Data</h1>
   <div class="sales-data-container">
  <!--  @if (errorMessage){ 
     <div class="message message--error"> {{ errorMessage }}</div> 
} -->
     <!-- Create the Yearly Sales Table -->
     <div class="card table-card">
      <!-- Set the headers and data to be displayed in the table -->
       <app-table
          [title]="'Yearly Sales Data - Tabular View'"
          [data]="yearlySalesData"
          [recordsPerPage]="25"
          [headers]="['date','region', 'product', 'category', 'customer', 'channel', 'amount']" 
          [sortableColumns]="['date','region', 'product', 'category', 'customer', 'channel', 'amount']"  
           >
       </app-table>
     </div>
   </div>
  `,
  styles: `
     .sales-data-container {
       display: flex;
       flex-direction: column;
       align-items: center;
     }

      .table-card {
        width: 75%;
        margin: 20px 0;
        padding: 10px;
      }

      app-table {
        padding: 50px;
      }
  `
})

// Exporting the yearly sales data component
export class YearlySalesDataComponent {
  yearlySalesData: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get(`${environment.apiBaseUrl}/reports/sales/yearly-sales-data`).subscribe({
      next: (data: any) => {
        this.yearlySalesData = data; // Set the yearly sales data to the data parameter.
        console.log(this.yearlySalesData); // Display the yearly sales data in the console.
      },
      error: (err) => {
        console.error('Error fetching yearly sales data', err); //Throw an error if the yearly sales data is not fetched.
      }
    });
  }
}
