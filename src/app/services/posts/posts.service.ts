import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'http://localhost:5000/api/post';
  // private baseUrl = 'https://sore-erin-barracuda-yoke.cyclic.app//api/post';
  constructor(private http: HttpClient) {}
  getAllUsersPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/allPosts`);
  }
  userPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/userPosts`);
  }
  createPost(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addPost`, body);
  }
  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletePost/${id}`);
  }
  singlePost(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/post/${postId}`);
  }
  likes(postId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/likes/${postId}`, {});
  }
  unLikes(postId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/unLikes/${postId}`, {});
  }
  addComments(body: any, postId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments/${postId}`, body);
  }
  deleteComments(postId: string, commentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${postId}/${commentId}`);
  }
}
