import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  newServerName: string;
  newServerContent: string;

  @Output() onAddedServer = new EventEmitter<{ name: string, content: string, type: string }>();

  constructor() { }

  ngOnInit() {
  }

  onAddServer(): void {
    this.onAddedServer.emit({
      name: this.newServerName,
      content: this.newServerContent,
      type: 'server'
    });
  }

  onAddBlueprint(): void {

  }

}
