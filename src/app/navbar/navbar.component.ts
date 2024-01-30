import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Genshin Impact DB';
  logo = 'https://1000logos.net/wp-content/uploads/2021/08/Genshin-Impact-Logo.png';

  navItems = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/characters',
    name: 'Characters'
  },
  {
    path: '/weapons',
    name: 'Weapons'
  },
  {
    path: '/artifacts',
    name: 'Artifacts'
  }]

  searchTerm: String = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchTerm = params['searchTerm'];
    })
  }
  
  search(): void{
    if(this.searchTerm)
      this.router.navigateByUrl('/search/' + this.searchTerm)
  }

}
