import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  selectedUser: Users;
  users : Users[];
  readonly url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}
  // REGISTER METHOD
  registerUser(usr: Users){
    return this.http.post(this.url, usr);
  }

  // LOGIN METHOD
  loginUser(usr: Users){

  }

}
