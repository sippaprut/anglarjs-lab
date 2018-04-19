import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{
    name: 'Test Server',
    type: 'server',
    content: 'Blah blah'
  }];

  OnAddedServer(data): void {
    console.log('Added Server');
    this.serverElements.push(data);
  }

}
