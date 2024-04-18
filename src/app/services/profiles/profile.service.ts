import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:5000/api/profile';
  // private baseUrl = 'https://sore-erin-barracuda-yoke.cyclic.app//api/profile';
  userProfile_id = '';

  constructor(private http: HttpClient) {}
  userProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProfile`);
  }
  addUserProfile(body: {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/addNewProfile`, body);
  }
  allUsersProfiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usersProfiles`);
  }
  uplodeProfileImage(image: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, image);
  }
  addEducation(body: {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/addEducation`, body);
  }
  deleteEducation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteEducation/${id}`);
  }
  addExperience(body: {}): Observable<any> {
    return this.http.post(`${this.baseUrl}/addExperience`, body);
  }
  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteExperience/${id}`);
  }
  showUserProfile(profileId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/userProfile/${profileId}`);
  }
  editProfile(body: {}): Observable<any> {
    return this.http.put(`${this.baseUrl}/editProfile`, body);
  }
  deleteUserProfile(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteProfile`);
  }
  uploadImage(image: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/changeImage`, image);
  }
}
