import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogOverviewExampleDialogComponent } from './delete-dialog-overview-example-dialog.component';

describe('DeleteDialogOverviewExampleDialogComponent', () => {
  let component: DeleteDialogOverviewExampleDialogComponent;
  let fixture: ComponentFixture<DeleteDialogOverviewExampleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogOverviewExampleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDialogOverviewExampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
