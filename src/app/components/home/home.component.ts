import { Component, ViewChild } from "@angular/core";
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  videos:any=[];
  videos_reprod:any=[];
   constructor(private _videoservice: VideoService) {
    this.getvideos();
  }
  getvideos(){
    this._videoservice.getVideos().subscribe((resp:any) => {
      this.videos=resp.data;
      setTimeout(() => {
        this.videos.forEach(video => {
          this.clickvideo(video.id);
        });
      }, 1000);
    },error=>{
      console.log("myerror",error);
    });
   }
   clickvideo(id){
    var video = document.getElementById(`video${id}`);
    let yo= this;
    video.onplay = function() {
      let exits=false;
      yo.videos_reprod.forEach(video => {
        if(id == video.id){
          exits= true;
        }
      });
      if(!exits){
        yo.videos_reprod.push({id:id});
        let data={id_video:id}
        yo._videoservice.postvideosview(data).subscribe((resp:any) => {
          console.log(resp);
        },error=>{
          console.log("myerror",error);
        });
      }
    };
   }

}
