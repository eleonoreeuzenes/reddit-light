import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedditService {

  constructor(private http: HttpClient) {}

  /**
   * Get top trending posts from a subreddit.
   * @param subreddit Name of the subreddit (e.g. 'formulaone')
   */
  getTopPosts(subreddit: string): Observable<any> {
    // We use 'day' to get top posts from the last 24 hours
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=10`;
    return this.http.get(url);
  }

  /**
   * Get the top 5 comments for a specific post.
   * @param subreddit Name of the subreddit
   * @param postId ID of the post
   */
  getComments(subreddit: string, postId: string): Observable<any> {
    const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=5`;
    return this.http.get(url);
  }
}
