import { Component, OnInit } from '@angular/core';
import { RedditService } from './reddit.service';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NgFor, CommonModule],
})
export class AppComponent implements OnInit {
  posts: any[] = [];

  constructor(private redditService: RedditService) {}

  ngOnInit(): void {
    this.redditService.getTopPosts().subscribe(response => {
      this.posts = response.data.children;
    });
  }

  getImageUrl(post: any): string | null {
  // If the post has a preview image
  if (post.data.preview && post.data.preview.images && post.data.preview.images.length) {
    let url = post.data.preview.images[0].source.url;
    return url.replace(/&amp;/g, '&');
  }

  // Fallback: if thumbnail exists and starts with http
  if (post.data.thumbnail && post.data.thumbnail.startsWith('http')) {
    return post.data.thumbnail;
  }

  // No valid image
  return null;
}
}
