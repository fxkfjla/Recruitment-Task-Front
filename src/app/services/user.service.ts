import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

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
    let formParams = new FormData();
    formParams.append('file', file)

    return this.http.post(this.url + '/load-xml', formParams, {responseType: 'text'})
  }

  public getUsersPage(page: number, size: number, direction: string, field: string)
  {
    let params = {page, size, direction, field}

    return this.http.get<User[]>(this.url, {params, observe: 'response'})    
  }

  public findByNameOrSurnameOrLogin(searchField: string, page: number, size: number, direction: string, field: string)
  {
    let params = {searchField, page, size, direction, field}

    return this.http.get<User[]>(this.url + '/search', {params, observe: 'response'})    
  }

  private url = environment.apiUrl + '/' + ApiPaths.Users; 
}
