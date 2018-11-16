import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Data } from './data';
import {Observable, of, throwError} from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators'
import { newsfeedJSON } from 'src/app/newsfeedData';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';
import { promise } from 'protractor';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})

export class UploaderService {

//=============
//CONSTRUCTOR
//=============
constructor(private _http: HttpClient) {}


//===========================
// HTTP HEADERS CONFIGURATION
//===========================
  httpOptions = {
    headers: new HttpHeaders({
      // 'content-type': "application/x-www-form-urlencoded",
      'content-type': "application/json",
      'Authorization': 'my-auth-token'
    })
  };

  //define a URL to Handle all incoming http request
  private postHandler = 'http://localhost:5000/postHandler';

  //===============================
  //SEND A POST REQUEST TO A SERVER
  //===============================
  sendARequest (data: Data): Observable<Data>{
    return this._http.post<Data>(this.postHandler, data, this.httpOptions ).pipe(catchError(this.errorHandler))

  }

  //=================================================================
  //GENERATE A NEW HTML ELEMENT TO DISPLAY UPLOADED IMAGE DYNAMICALLY
  //=================================================================
  public async imagePreviewer(key) {
    //setup the image source to be used in attribute
   let source: string ='/data/' + key.filename + '/' + key._id + '/' + key.length + '/' + key.chunkSize;

    //this code is to manually generate a html element
    //In Async method
    const parentNode = await this.image_file_container(key);
    const childNode = await this.anchor(parentNode);
    const imageElement = await this.imageElement(childNode, source);
    
  }

  //generate a parent node and get the nearest Ancestor of parent and append parent to a ancestor
  public image_file_container(value) {
    return new Promise(resolve => {
      //Ancestor
      const Ancestor = document.querySelector('.image-preview');
      //generate parent node
      const parentNode = document.createElement('div');
      parentNode.setAttribute('class', 'col-3 image-file-container')
      parentNode.setAttribute('_ngcontent-c6', '')
      Ancestor.appendChild(parentNode);
      resolve(parentNode);
    })
  }

  public anchor(parentNode){
    return new Promise(resolve => {
      const i = document.createElement('ng-template');
      i.setAttribute('_ngcontent-c6', '');
      i.setAttribute('appDeleteIcon', '');
      i.setAttribute('appDelete', '')
      i.setAttribute('aria-hidden', 'true');
      i.setAttribute('class', 'fa fa-times remover_icon');

      //generate anchor element
      const anchor = document.createElement('a');
      anchor.setAttribute('_ngcontent-c6', '');
      anchor.setAttribute('href', '');
      anchor.setAttribute('class', 'thumbnail');

      //append generated element to it's parent
      parentNode.appendChild(i);
      parentNode.appendChild(anchor);
      resolve(anchor);
    })
  }

  public imageElement(childNode, source) {
    return new Promise(resolve =>{
      //generate image element
      const imgElement = document.createElement('img');
      imgElement.setAttribute('src', source);
      imgElement.setAttribute('alt', 'name of image');
      imgElement.setAttribute('id', 'BbB');
      imgElement.setAttribute('class', 'image-file img-thumbnail');
      imgElement.setAttribute('_ngcontent-c6', '')
      childNode.appendChild(imgElement);
      resolve(imgElement);
    })
  }
  

  //=====================================
  //ERROR HANDLER
  //=====================================
  private errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  };

  //======================================
  //SEND A DELETE REQUEST TO A SERVER
  //======================================

}

