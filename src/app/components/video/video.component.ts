import { Component } from '@angular/core';
import { VideoService } from '../../services/video/video.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent{
  views_videos:any=[];

  constructor(private _videoservice: VideoService,private excelService:ExcelService) {
    this.getviewvideos();
   }

  getviewvideos(){
    this._videoservice.getvideosview().subscribe((resp:any) => {
      resp.data.visits.forEach(visit => {
        this.views_videos.push({
          usuario:visit.user.name+" "+visit.user.last_name,
          video:visit.video.name,
          visitas:visit.num_views,
        });
      });;
      console.log(this.views_videos);
    },error=>{
      console.log("myerror",error);
    });
   }
   exportAsXLSX():void {
      this.excelService.exportAsExcelFile(this.views_videos, 'view_videos');
    }

}
