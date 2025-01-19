import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from './../../../shared/table/table.component';



@Component({
  selector: 'app-sales-data',
  standalone: true,
  imports: [TableComponent],
  template: `
   <h1>Sales Data</h1>
   <div class="sales-data-container">
  <!--  @if (errorMessage){ 
     <div class="message message--error"> {{ errorMessage }}</div> 
} -->
     <div class="card table-card">
       <app-table
          [title]="'Sales Data - TabularView'"
          [data]="salesData"
          [recordsPerPage]="50"
          [headers]="['region', 'product', 'category', 'channel', 'amount']"
          [sortableColumns]="['region', 'product', 'category', 'channel', 'amount']"     
           >
          <p>test</p>
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
        width: 50%;
        margin: 20px 0;
        padding: 10px;
      }

      app-table {
        padding: 50px;
      }
  `
})
export class SalesDataComponent {
  salesData: any[] = [];
  //errorMessage: string;

  constructor(private http: HttpClient) {
     this.http.get(`${environment.apiBaseUrl}/reports/sales/sales-data`).subscribe({
      next: (data: any) => {
        this.salesData = data;
       // this.errorMessage = '';
        console.log(this.salesData);
      },
      error: (err) => {
       // this.errorMessage = 'Error fethcing sales data from the server.';
        console.error('Error fetching sales data', err);
      }
     });
  }
}
