import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
    error = new Subject<string>();

    constructor(private http: HttpClient) {}

    createAndStorePost(postData: Post) {
        return (
            this.http
                .post<{ name: string }>(
                    'https://ng-max-812d4-default-rtdb.firebaseio.com/posts.json',
                    {
                        title: postData.title.trim(),
                        content: postData.content.trim(),
                    },
                    { observe: 'response' }
                )
                // .pipe(
                //     catchError((err) => {
                //         console.log('In catch block => ', err.message);
                //         return throwError(err);
                //     })
                // )
                .subscribe(
                    (responseData) => {
                        console.log(responseData.body);
                    },
                    (error) => {
                        this.error.next(error.message);
                    }
                )
        );
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'print');
        searchParams = searchParams.append('custom', 'key');

        return this.http
            .get<{ [key: string]: Post }>('https://ng-max-812d4-default-rtdb.firebaseio.com/posts.json', {
                headers: new HttpHeaders({
                    'Custom-Header': 'Hello',
                }),
                // params: new HttpParams().set('print', 'pretty'),
                params: searchParams, // multiple params
            })
            .pipe(
                map((responseData) => {
                    const posts: Post[] = [];
                    for (const post in responseData) {
                        if (responseData.hasOwnProperty(post)) {
                            posts.push({
                                id: post,
                                ...responseData[post],
                            });
                        }
                    }
                    return posts;
                })
            );
    }

    deletePosts() {
        return this.http
            .delete('https://ng-max-812d4-default-rtdb.firebaseio.com/posts.json', {
                observe: 'events',
                responseType: 'json'
            })
            .pipe(
                tap((event) => {
                    if (event.type === HttpEventType.Response) {
                        console.log(event);
                    }
                })
            );
    }
}
