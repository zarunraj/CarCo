import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DragdropService } from './dragdrop.service';

@Component({
  selector: 'mus-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  fileArr: any[] = [];
  imgArr: any[] = [];
  fileObj: any[] = [];
  form: FormGroup;
  msg!: string;
  progress: any = 0;

  @Input() uploadUrl: string;
  @Input() uploadFun: Function;

  @Input() params: any;

  @Output() onImageReady = new EventEmitter<any>()

  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dragdropService: DragdropService
  ) {
    this.form = this.fb.group({
      avatar: [null],
    });
  }

  ngOnInit() { }

  upload(e: any) {
    const fileListAsArray = Array.from(e);
    this.imgArr = [];
    this.fileArr = [];
    this.fileObj = [];
    fileListAsArray.forEach((item, i) => {
      const file = e as any;
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    });

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item);
    });

    // Set files form control
    this.form.patchValue({
      avatar: this.fileObj,
    });

    this.form.get('avatar')?.updateValueAndValidity();
    this.onImageReady.emit(this.form.value.avatar[0])
    /*
        this.uploadFun.call(this, this.form.value.avatar[0], this.params)
          // Upload to server
          // this.dragdropService
          //   .addFiles(this.form.value.avatar)
          .subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log('Request has been made!');
                break;
              case HttpEventType.ResponseHeader:
                console.log('Response header has been received!');
                break;
              case HttpEventType.UploadProgress:
    
                this.progress = Math.round((event.loaded / (event.total || 1)) * 100);
                console.log(`Uploaded! ${this.progress}%`);
                break;
              case HttpEventType.Response:
                console.log('File uploaded successfully!', event.body);
                setTimeout(() => {
                  this.progress = 0;
                  this.fileArr = [];
                  this.fileObj = [];
                  this.msg = 'File uploaded successfully!';
                }, 3000);
            }
          });*/
  }

  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onRemovePhoto(){
    this.fileArr = [];
    this.fileObj = [];
    this.form = this.fb.group({
      avatar: [null],
    });
  }
}