import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isCollapsed : Boolean = false;

  selectedState: any;

  constructor() { }

  collapsed() : boolean {
    return this.isCollapsed = ! this.isCollapsed;
  }

  ngOnInit() {
  }

  selected(value: any) : void {
    this.selectedState = value;
  }

}
