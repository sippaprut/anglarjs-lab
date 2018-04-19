import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

  @Input() element: {
    name: string,
    type: string,
    content: string
  };

  obit;

  constructor() { }

  ngOnInit() {
    this.obit = ['test' , 'name'];
    if ( typeof this.obit !== 'object') {
      console.log(0);
    }
    console.log(Object.keys(this.obit).length);
  }

}
