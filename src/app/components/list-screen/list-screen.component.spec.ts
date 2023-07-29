import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ListScreenComponent } from './list-screen.component';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../header/header.component';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';

describe('ListScreenComponent', () => {
  let component: ListScreenComponent;
  let fixture: ComponentFixture<ListScreenComponent>;
  let httpMock: HttpTestingController
  let userService: UserService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListScreenComponent, HeaderComponent],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(ListScreenComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController)
    userService = TestBed.inject(UserService)
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find all users', () =>
  {
    // Given
    const response: HttpResponse<User[]> = new HttpResponse({ body: []});

    // When
    spyOn(userService, 'findAll').and.returnValue(of(response))
    spyOn(component, 'countTotalPages');
    spyOn(component, 'updateVisiblePages');
    spyOn(component, 'addMd5Hash');
    component.findAllUsers()

    // Then
    expect(component.countTotalPages).toHaveBeenCalled();
    expect(component.updateVisiblePages).toHaveBeenCalled();
    expect(component.addMd5Hash).toHaveBeenCalled();
  });

  it('should find users by name, surname or login', () =>
  {
    // Given
    const response: HttpResponse<User[]> = new HttpResponse({ body: []});

    // When
    spyOn(userService, 'findByNameOrSurnameOrLogin').and.returnValue(of(response))
    spyOn(component, 'countTotalPages');
    spyOn(component, 'updateVisiblePages');
    spyOn(component, 'addMd5Hash');
    component.findByNameOrSurnameOrLogin()

    // Then
    expect(component.countTotalPages).toHaveBeenCalled();
    expect(component.updateVisiblePages).toHaveBeenCalled();
    expect(component.addMd5Hash).toHaveBeenCalled();
  });

  it('should update visible pages', () =>
  {
    // Given
    component.totalVisiblePages = 5;
    component.setTotalPages(10);
    component.setCurrentPage(2);

    // When
    component.updateVisiblePages();

    // Then
    const visiblePages = component.getVisiblePages();
    expect(visiblePages).toEqual([0, 1, 2, 3, 4]);
  });
});
