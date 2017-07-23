import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import {Category} from "../model/Category";
/**
 * Created by varun on २२-०७-२०१७.
 */
@Injectable()
export class CategoryService{
  private baseUrl = 'api/v1/category';

  constructor(private http: Http) { }

  getCategories(): Observable<Category[]> {
    return this.http.get(this.baseUrl)
      .map(this.extractData)
      .do(data => console.log('getCategories: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCategory(id: number): Observable<Category> {
    if (!id) {
      return Observable.of(this.initializeCategory());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeProduct());
      //     observer.complete();
      // });
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .do(data => console.log('getCategory: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteCategory(id: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteCategory: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveCategory(category: Category): Observable<Category> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (!category.id) {
      return this.createCategory(category, options);
    }
    return this.updateCategory(category, options);
  }

  private createCategory(category: Category, options: RequestOptions): Observable<Category> {
    category.id = undefined;
    return this.http.post(this.baseUrl, category, options)
      .map(this.extractData)
      .do(data => console.log('createCategory: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateCategory(category: Category, options: RequestOptions): Observable<Category> {
    const url = `${this.baseUrl}/${category.id}`;
    return this.http.put(url, category, options)
      .map(() => category)
      .do(data => console.log('updateCategory: ' + JSON.stringify(data)))
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

  initializeCategory(): Category {
    // Return an initialized object
    return {
      id: undefined,
      name: null,
      nameClean: null,
      description: null,
      enabled: false,
      dateCreated: null
      //tags: [''],
      //releaseDate: null,
      //price: null,
      //description: null,
      //starRating: null,
      //imageUrl: null
    };
  }
}
