import { Component, Renderer, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Data } from './data';
import { newsfeedJSON } from 'src/app/newsfeedData';
import { uploadedMedia } from 'src/app/uploadedMedia';
import { UploaderService } from './uploader.service';

//============
//JSON OBJECT
//============
const filesData = ({
  metadata : {
    name: String,
    size: Number,
    mimetype: String,
    date: String,
    filespath: String
  }
})

@Component({
  selector: 'app-writepost',
  templateUrl: './writepost.component.html',
  styleUrls: ['./writepost.component.css']
})

export class WritepostComponent implements OnInit {

  //======================
  //CONSTRUCTOR
  //======================
  constructor(public uploaderService: UploaderService, private _renderer: Renderer){}

  //==========================
  //CONFIG
  //==========================
  selectedFile: File = null;
  filesToUpload: Array<File> = [];
  postHandler = 'http://localhost:5000/postHandler';

  //======================
  //TRIGGER IMAGE SELECTOR
  //======================
  public triggerImageUploader() {
    let imageInput: HTMLElement = document.getElementById('imageButton') as HTMLElement;
    imageInput.click();
  }

  //======================
  //TRIGGER VIDEO SELECTOR
  //======================
  public triggerVideoUploader() {
    let videoInput: HTMLElement = document.getElementById('videoButton') as HTMLElement;
    videoInput.click();
  }

  //======================
  //UPLOAD SELECTED IMAGE
  //======================
  public previewImage(event: any){
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      const dataUrl = reader.result;
      //BINARY SENDER AND FRONT END VALIDATION
      //simple way to send base64 binary data to a function and save it in json format
      this.Bridge(dataUrl, this.selectedFile, this.uploaderService, this.presentation, this._renderer);
    }
    reader.readAsDataURL(this.selectedFile);
  }

  //======================
  //UPLOAD SELECTED VIDEO
  //======================
  public previewVideo(event: any){
  
  }

  //BINARY RECEIVER AND FRONT END VALIDATION
  private Bridge(Blob, file, service, presentation, renderer) {

    const imgFileExtension = ['png', 'gif', 'jpg', '3gp']
    const vidFileExtension = ['mp4', 'avi'];
    const maxFileSize = 10000000;

    if(file.type == 'image/png' || file.type == 'image/gif'){
      const blob = Blob.slice(22, Blob.length);

      //collect all important data and save to json object
        const metadata: Data = {
          filename: file.name,
          filesize: file.size,
          mimetype: file.type,
          date: file.lastModifiedDate,
          binary: blob
        }

      //xmlhttprequest
      service.sendARequest(metadata).subscribe(res => presentation(res, renderer));

    } else if(file.type == 'image/jpeg') {
      const blob = Blob.slice(23, Blob.length);

      // collect all important data and save to json object
       const metadata: Data = {
          filename: file.name,
          filesize: file.size,
          mimetype: file.type,
          date: file.lastModifiedDate,
          binary: blob
        }
        service.sendARequest(metadata).subscribe(res => presentation(res, renderer));
    }
  }

  //process all binary and metadata of selected image
  private 

  //Display all selected image
  public async presentation(key, renderer) {

    //setup the image source to be used in attribute
    let source: string ='/data/' + key.filename + '/' + key._id + '/' + key.length + '/' + key.chunkSize;

    //=================================
    //GENERATE SELECTED IMAGE CONTAINER
    //=================================
    const parentElement = document.querySelector('.image-preview')
    const imgFileContainer = renderer.createElement(parentElement, 'div')
    renderer.setElementAttribute(imgFileContainer, 'class', 'col-3 image-file-container');
    
    //GENERATE REMOVE BUTTON
    const removeBtn = renderer.createElement(imgFileContainer, 'ng-template');
    renderer.setElementAttribute(removeBtn, 'appDelete', '');
    renderer.setElementAttribute(removeBtn, 'aria-hidden', 'true');
    renderer.setElementAttribute(removeBtn, 'class', 'fa fa-times remover_icon')

    //GENERATE ANCHOR ELEMENT
    const anchor = renderer.createElement(imgFileContainer, 'a');
    renderer.setElementAttribute(anchor, 'href', '');
    renderer.setElementAttribute(anchor, 'class', 'thumbnail');

    //GENERATE IMAGE ELEMENT
    const imageElement = renderer.createElement(anchor, 'img');
    renderer.setElementAttribute(imageElement, 'src', source);
    renderer.setElementAttribute(imageElement, 'alt', key.filename);
    renderer.setElementAttribute(imageElement, 'id', 'BbB');
    renderer.setElementAttribute(imageElement, 'class', 'image-file img-thumbnail');
    
  }

  //===========
  //POST BUTTON
  //===========
  //when the user press the post button
  //this function will trigger
  public onSubmit() {

  }

  ngOnInit() {

  }

  username = 'Lars O. Concepcion';
  usercourse = "BSIT / Web Developer / Python Programmer";

  //========================================================================================================================
  //  THIS AREA IS UNDER DEVELOPMENT, EXPERIMENT AND TESTING, ANY CODE WRITTEN IN THIS AREA MAYBE BUGGY
  //========================================================================================================================

}

//maroon 5 - girls like you
//https://www.youtube.com/watch?v=aJOTlE1K90k
//Alan Walker - Darkside (feat. Au/Ra and Tomine Harket)
//https://www.youtube.com/watch?v=M-P4QBt-FWw