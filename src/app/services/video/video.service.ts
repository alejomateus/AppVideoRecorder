import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class VideoService {
  url: string = "http://localhost/geometryapi/public/api/";

  constructor(private http: HttpClient, private auth: AuthService) {}

  public getVideos() {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.auth.getUser().token
    });
    return this.http.get(`${this.url}videos`, { headers });
  }
  public postvideosview(data) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.auth.getUser().token
    });
    return this.http.post(`${this.url}visit_videos`, data, { headers });
  }
  public getvideosview() {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.auth.getUser().token
    });
    return this.http.get(`${this.url}visit_videos`, { headers });
  }
}
