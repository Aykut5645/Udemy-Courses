import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
    loadedPosts: Post[] = [];
    isFetching = false;
    errorMessage = null;
    private errorSub: Subscription;

    constructor(private http: HttpClient, private postsService: PostsService) {}

    ngOnInit() {
        this.errorSub = this.postsService.error.subscribe((error) => {
            this.errorMessage = error;
        });
        this.fetchingPosts();
    }

    onCreatePost(postData: { title: string; content: string }) {
        // Send Http request
        this.postsService.createAndStorePost(postData);
    }

    onFetchPosts() {
        this.fetchingPosts();
    }

    onClearPosts() {
        this.postsService.deletePosts().subscribe(() => {
            this.loadedPosts = [];
        });
    }

    private fetchingPosts() {
        this.isFetching = true;
        this.postsService.fetchPosts().subscribe((fetchedPosts: Post[]) => {
            this.isFetching = false;
            this.loadedPosts = fetchedPosts;
        });
    }

    ngOnDestroy() {
        this.errorSub.unsubscribe();
    }
}
