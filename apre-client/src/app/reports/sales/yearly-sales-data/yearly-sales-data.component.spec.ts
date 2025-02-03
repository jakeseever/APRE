import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { YearlySalesDataComponent } from './yearly-sales-data.component';

describe('YearlySalesDataComponent', () => {
  let component: YearlySalesDataComponent;
  let fixture: ComponentFixture<YearlySalesDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,YearlySalesDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlySalesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
