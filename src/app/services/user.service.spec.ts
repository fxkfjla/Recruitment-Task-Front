import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths.enum';

describe('UserService', () => {
  let service: UserService
  let httpMock: HttpTestingController
  const url = environment.apiUrl + '/' + ApiPaths.Users

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })
    service = TestBed.inject(UserService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should upload XML file', () => 
  {
    // Given
    const file = new File(['file content'], 'test.xml', { type: 'text/xml' })
    const mockResponse = 'File successfully uploaded!'

    // When
    service.uploadXMLFile(file).subscribe((response) =>
    {
      expect(response).toBe(mockResponse)
    })

    // Then
    const req = httpMock.expectOne(`${service['url']}/load-xml`)
    expect(req.request.method).toBe('POST')
    expect(req.request.headers.get('Content-Type')).toBeNull()
    req.flush(mockResponse)
  })

  it('should find all users', () =>
  {
    // Given
    const page = { page: 1, size: 10, direction: 'asc', field: 'name'}
    const usersMock = 
    [
      { id: 1, name: "name1", surname: "surname1", login: "login1" },
      { id: 2, name: "name2", surname: "surname2", login: "login2" }
    ]
    
    // When
    service.findAll(page.page, page.size, page.direction, page.field).subscribe( response =>
    {
      expect(response.body).toEqual(usersMock)
    })

    // Then
    const req = httpMock.expectOne(url + `?page=${page.page}&size=${page.size}&direction=${page.direction}&field=${page.field}`)
    expect(req.request.method).toBe('GET')
    req.flush(usersMock)

    httpMock.verify()
  })

  it('should find users by name, surname or login', () =>
  {
    // Given
    const page = { search: 'name', page: 1, size: 10, direction: 'asc', field: 'name'}
    const usersMock = 
    [
      { id: 1, name: "name1", surname: "surname1", login: "login1" },
      { id: 2, name: "name2", surname: "surname2", login: "login2" }
    ]

    // When
    service.findByNameOrSurnameOrLogin("name", 1, 10, 'asc', 'name').subscribe( response =>
    {
      expect(response.body).toEqual(usersMock)
    })

    // Then
    const req = httpMock.expectOne(url + `/search?search=${page.search}&page=${page.page}&size=${page.size}&direction=${page.direction}&field=${page.field}`)
    expect(req.request.method).toBe('GET')
    req.flush(usersMock)

    httpMock.verify()
  })
})