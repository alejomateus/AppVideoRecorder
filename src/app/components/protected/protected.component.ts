import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styles: []
})
export class ProtectedComponent implements OnInit {
  profile:any;
  constructor(private auth:AuthService) { }

  ngOnInit() {
    
  }

}
