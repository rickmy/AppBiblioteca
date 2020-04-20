import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions ={
    headers : new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  httpFiles = {
    headers : new HttpHeaders ({
      'Content-Type': 'application/x-www-form-urlencoded'

    })
  }

  constructor(private http: HttpClient) { }

  verLogin(url:string,data:any){
    return this.http.post(environment.apiData+url,data)
  }

  getData(url:string){
    return this.http.get(environment.apiData+url)
  }

  postFile(url:string, file: any){
    return this.http.post(environment.apiData + url,file, this.httpFiles)
  }

  postData(url:string, data:any){
    return this.http.post(environment.apiData+url,data,this.httpOptions)
  }

  putData(url:string,data:any){
    return this.http.put(environment.apiData + url, data )
  }

  deleteLogicData(url:string,data:any){
    return this.http.put(environment.apiData + url ,data)
  }

  delete(url:string){
    return this.http.delete(environment.apiData + url)
  }

}
