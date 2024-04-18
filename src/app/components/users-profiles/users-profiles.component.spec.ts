import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProfilesComponent } from './users-profiles.component';

describe('UsersProfilesComponent', () => {
  let component: UsersProfilesComponent;
  let fixture: ComponentFixture<UsersProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersProfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
