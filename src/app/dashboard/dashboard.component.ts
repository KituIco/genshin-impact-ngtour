import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  
  paimon: string = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/96d4a0a0-1733-4468-94db-d3eade9b3a80/de7pht3-55d447e6-555c-44fe-ad16-dcc7df72caf9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk2ZDRhMGEwLTE3MzMtNDQ2OC05NGRiLWQzZWFkZTliM2E4MFwvZGU3cGh0My01NWQ0NDdlNi01NTVjLTQ0ZmUtYWQxNi1kY2M3ZGY3MmNhZjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GrvSgTRkLGSLK6QrZbCWtKxC8UDjG5w5aWEeRl-0ozY";

  ngOnInit(): void {
  }

}
