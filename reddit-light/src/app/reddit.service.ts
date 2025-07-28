import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  constructor(private http: HttpClient) { }

  // Get top 10 posts from 'formulaone' subreddit for the last day
  getTopPosts(subreddit: string): Observable<any> {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=10`;
    return this.http.get(url);
  }

  // Get top 5 comments for a given post by ID
  getComments(subreddit: string, postId: string): Observable<any> {
    const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=5`;
    return this.http.get(url);
  }
}
