import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSchema } from '../Models/userSchema';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  SERVER_URL = "https://employee-server-7bkx.onrender.com"
  constructor(private http:HttpClient) { }
  
  // add USer API
  addUserAPI(user:UserSchema){
   return this.http.post(`${this.SERVER_URL}/users`,user)
  }

  // get All Users API
  getAllusersAPI(){
    return this.http.get(`${this.SERVER_URL}/users`)
  }

  // Get Single User API
  getSingleUserAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/users/${id}`)
  }

  // update User API
  updateUserAPI(userId:string,userDetails:UserSchema){
    return this.http.put(`${this.SERVER_URL}/users/${userId}`,userDetails)
  }

  // Delete User APi
  removeUserAPI(userId:string){
    return this.http.delete(`${this.SERVER_URL}/users/${userId}`)

  }
}
