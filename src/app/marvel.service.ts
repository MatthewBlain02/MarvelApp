import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Md5 } from "ts-md5";



@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private publicKey: string = '99fe985f27f022ece1fbe9ce6aa831a8';
  private privateKey: string = '085aac4fb2f0db5d57e022077c1ba175e92c4d3f';
  private apiUrl: string = 'https://gateway.marvel.com/v1/public/';

  constructor(private http: HttpClient) { }

  getCharacter(name: string): Observable<any[]> {
    const ts = new Date().getTime().toString();
    const hash = Md5.hashStr(ts + this.privateKey + this.publicKey);
    const url = `${this.apiUrl}/characters?name=${name}&apikey=${this.publicKey}&ts=${ts}&hash=${hash}`;
    console.log(url);
    return this.http.get<any>(url).pipe(map(response => response.data.results));
  }
  getComic(resourceURI:string):Observable<any[]>{
    const ts = new Date().getTime().toString();
    const hash = Md5.hashStr(ts + this.privateKey + this.publicKey);
    const url = `${resourceURI}?apikey=${this.publicKey}&ts=${ts}&hash=${hash}`;
    console.log(url);
    return this.http.get<any>(url).pipe(map(response => response.data.results));
  }
}
