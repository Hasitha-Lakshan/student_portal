import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  assetsUrl = environment.assetsUrl;
  isLogged: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authenticationService.getLoginStatus().subscribe(
      status => {
        this.isLogged = status;
      }
    );
  }

  logOut() {
    if (this.isLogged) {
      this.authenticationService.logout();
    }
  }

}
