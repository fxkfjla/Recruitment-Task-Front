import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

import { FormScreenComponent } from './form-screen.component';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../header/header.component';
import { ToastNoAnimationModule, ToastrModule, ToastrService } from 'ngx-toastr';

describe('FormScreenComponent', () => {
  let component: FormScreenComponent;
  let fixture: ComponentFixture<FormScreenComponent>;
  let httpMock: HttpTestingController;
  let userService: UserService;
  let toastrService: ToastrService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormScreenComponent, HeaderComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, ToastNoAnimationModule.forRoot()],
      providers: [ToastrService]
    });

    fixture = TestBed.createComponent(FormScreenComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dataIsLoaded flag after successful file upload', () => 
  {
    // Given
    const mockFile = new File(['<?xml version=\"1.0\" encoding=\"UTF-8\"?>'], 'file.xml', { type: 'application/xml' });
    const fileInput = fixture.nativeElement.querySelector('input[type="file"]');
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { files: [mockFile], value: 'C:\\fakepath\\mock-data.xml' } });

    // When
    spyOn(userService, 'uploadXMLFile').and.returnValue(of('success'));
    fileInput.dispatchEvent(event);

    // Then
    expect(component.dataIsLoaded).toBeTrue();
    expect(userService.uploadXMLFile).toHaveBeenCalledWith(mockFile);
  });

  it('should show an toast on successful file upload', () =>
  {
    // Given
    const mockFile = new File(['<?xml version=\"1.0\" encoding=\"UTF-8\"?>'], 'file.xml', { type: 'application/xml' });
    const fileInput = fixture.nativeElement.querySelector('input[type="file"]');
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { files: [mockFile], value: 'C:\\fakepath\\mock-data.xml' } });

    // When
    spyOn(userService, 'uploadXMLFile').and.returnValue(of('success'));
    spyOn(toastrService, 'success');
    fileInput.dispatchEvent(event);

    // Then
    expect(component.dataIsLoaded).toBeTrue();
    expect(userService.uploadXMLFile).toHaveBeenCalledWith(mockFile);
    expect(toastrService.success).toHaveBeenCalledWith('Data imported successfully!', 'Success!', { positionClass: 'toast-top-center' });
  });

  it('should show an toast on failed file upload', () =>
  {
    // Given
    const mockFile = new File(['<?xml version=\"1.0\" encoding=\"UTF-8\"?>'], 'file.xml', { type: 'application/xml' });
    const fileInput = fixture.nativeElement.querySelector('input[type="file"]');
    const event = new Event('change');
    Object.defineProperty(event, 'target', { value: { files: [mockFile], value: 'C:\\fakepath\\mock-data.xml' } });

    // When
    spyOn(userService, 'uploadXMLFile').and.returnValue(new Observable((subscriber) => subscriber.error('error')));
    spyOn(toastrService, 'error');
    fileInput.dispatchEvent(event);

    // Then
    expect(component.dataIsLoaded).toBeFalse();
    expect(userService.uploadXMLFile).toHaveBeenCalledWith(mockFile);
    expect(toastrService.error).toHaveBeenCalledWith('Failed to import data!', 'Failure!', { positionClass: 'toast-top-center' });
  });
});
