import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import {Post} from "../model/Post";
/**
 * Created by varun on २६-०७-२०१७.
 */
@Injectable()
export class PostService{

  private baseUrl = 'api/v1/post';

  constructor(private http: Http) { }

  getPosts(): Observable<Post[]> {
    const url = `${this.baseUrl}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getPosts: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getPost(id: string): Observable<Post> {
    if (!id) {
      return Observable.of(this.initializePost());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeProduct());
      //     observer.complete();
      // });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getPost: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deletePost(id: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deletePost: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  savePost(post: Post): Observable<Post> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (!post.id) {
      return this.createPost(post, options);
    }
    return this.updatePost(post, options);
  }

  private createPost(post: Post, options: RequestOptions): Observable<Post> {
    post.id = undefined;
    return this.http.post(this.baseUrl, post, options)
      .map(this.extractData)
      .do(data => console.log('createPost: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updatePost(post: Post, options: RequestOptions): Observable<Post> {
    const url = `${this.baseUrl}/${post.id}`;
    return this.http.put(url, post, options)
      .map(() => post)
      .do(data => console.log('updatePost: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = response.json();
    return body.data || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  initializePost(): Post {
    // Return an initialized object
    return {
      id: undefined,
      title: null,
      article: null,
      titleClean: null,
      datePublished: null,
      bannerImage: null,
      featured: null,
      enabled: false,
      commentsEnabled: false,
      views: null,
      categories: null,
      relatedPosts: null,
      tags: null
    };
  }
}
