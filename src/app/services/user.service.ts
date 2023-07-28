import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { ApiPaths } from '../enums/api-paths.enum';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  constructor(private http: HttpClient) {}

  public uploadXMLFile(file: File)
  {
    const formData = new FormData()
    formData.append('file', file)

    return this.http.post(this.url + '/load-xml', formData, {responseType: 'text'})
  }

  public findAll(page: number, size: number, direction: string, field: string)
  {
    const params = {page, size, direction, field}

    return this.http.get<User[]>(this.url, {params, observe: 'response'})    
  }

  public findByNameOrSurnameOrLogin(search: string, page: number, size: number, direction: string, field: string)
  {
    const params = {search, page, size, direction, field}

    return this.http.get<User[]>(this.url + '/search', {params, observe: 'response'})    
  }

  private url = environment.apiUrl + '/' + ApiPaths.Users; 
}
