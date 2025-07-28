import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  constructor(private http: HttpClient) {}

  // Get top 10 posts from 'formulaone' subreddit for the last day
  getTopPosts(): Observable<any> {
    const url = 'https://www.reddit.com/r/formula1/top.json?t=day&limit=10';
    return this.http.get(url);
  }
}
