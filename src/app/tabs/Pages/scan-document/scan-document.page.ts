import { Component, OnInit } from '@angular/core';
import { DomSanitizer ,SafeResourceUrl} from '@angular/platform-browser';
import { Plugins, CameraResultType ,CameraSource} from '@capacitor/core';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';

const { Camera } = Plugins;

export interface scanDocument{
  img:any,
  title:string,
  prop1:string,
  prop2:string

}

@Component({
  selector: 'app-scan-document',
  templateUrl: './scan-document.page.html',
  styleUrls: ['./scan-document.page.scss'],
})
export class ScanDocumentPage implements OnInit {
  photo : SafeResourceUrl;
  documents: scanDocument[] = []


  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  constructor(
    private sanitizar : DomSanitizer,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private base64: Base64,
    private chooser: Chooser
    
  ) { }

  ngOnInit() {
    
  }
  async takePicture(sourceType) {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,

      resultType: CameraResultType.DataUrl,
      source: sourceType
    });
    
    return this.photo = this.sanitizar.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
    
 
  }

useCamera(){

  this.takePicture(CameraSource.Prompt).then((res:any)=>{
    console.log("done useCamera",res)
    
    //get extracted data from ocr api
    alert(res.changingThisBreaksApplicationSecurity)

    this.documents.push({
      img:res,
      title:'Lorem ipsum',
      prop1:'Lorem ipsum',
      prop2:'consectetur adipiscing elit. Duis ut urna neque.'

    })
  })
  

}

usePhotoLibrary(){
  this.takePicture(CameraSource.Photos).then((res)=>{
    console.log("done usePhotoLibrary ",res)
    
    this.documents.push({
      img:res,
      title:'Lorem ipsum',
      prop1:'Lorem ipsum',
      prop2:'consectetur adipiscing elit. Duis ut urna neque.'

    })
    console.log('this.documents.length',this.documents.length)
  })
  
}


//   pickImage(sourceType) {
//     const options: CameraOptions = {
//       quality: 100,
//       sourceType: sourceType,
//       destinationType: this.camera.DestinationType.DATA_URL,
//       encodingType: this.camera.EncodingType.JPEG,
//       mediaType: this.camera.MediaType.PICTURE
//     }
//     this.camera.getPicture(options).then((imageData) => {
//       // imageData is either a base64 encoded string or a file URI
//       this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
//       console.log(this.croppedImagepath)
//       this.photo = this.sanitizar.bypassSecurityTrustResourceUrl(imageData && (imageData.dataUrl))
//       this.photos.push(this.photo)
//     }, (err) => {
//       // Handle error
//     });
//   }


pickFileAndGetBase64String(){
  this.fileChooser.open().then((fileuri)=>{
    this.filePath.resolveNativePath(fileuri).then((nativepath=>{
      this.base64.encodeFile(nativepath).then((base64String)=>{
        alert(base64String);
        console.log(base64String)
      });
    }));
  });

  // this.chooser.getFile().then((file)=>{
  //   alert(file)
  //   alert(file.data)
  //   alert(file.dataURI)
  //   alert(file.uri)
  //   this.base64.encodeFile(file.dataURI).then((base64String)=>{
  //     alert(base64String)
  //   })
  // })
  
}

}
