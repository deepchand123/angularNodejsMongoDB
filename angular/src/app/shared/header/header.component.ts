import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.userName();
  }

  userName(): string {
      const nameame = this._authService.getUserInfo();
      return name['name'];
  }
  logout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
