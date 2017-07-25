/**
 * Created by varun on २३-०७-२०१७.
 */
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import {Comment} from "../model/Comment";
import {Injectable} from "@angular/core";

@Injectable()
export class CommentService{

  private baseUrl = 'api/v1/comment';

  constructor(private http: Http) { }

  getComments(postId: string): Observable<Comment[]> {
    const url = `${this.baseUrl}/${postId}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getComments: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getComment(id: string): Observable<Comment> {
    if (!id) {
      return Observable.of(this.initializeComment());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeProduct());
      //     observer.complete();
      // });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getComment: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteComment(id: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteComment: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveComment(comment: Comment): Observable<Comment> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (!comment.id) {
      return this.createComment(comment, options);
    }
    return this.updateComment(comment, options);
  }

  private createComment(comment: Comment, options: RequestOptions): Observable<Comment> {
    comment.id = undefined;
    return this.http.post(this.baseUrl, comment, options)
      .map(this.extractData)
      .do(data => console.log('createComment: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateComment(comment: Comment, options: RequestOptions): Observable<Comment> {
    const url = `${this.baseUrl}/${comment.id}`;
    return this.http.put(url, comment, options)
      .map(() => comment)
      .do(data => console.log('updateComment: ' + JSON.stringify(data)))
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

  initializeComment(): Comment {
    // Return an initialized object
    return {
      id: undefined,
      postId: null,
      comment: null,
      enabled: false,
      markRead: false,
      createdDate: null
      //tags: [''],
      //releaseDate: null,
      //price: null,
      //description: null,
      //starRating: null,
      //imageUrl: null
    };
  }
}
