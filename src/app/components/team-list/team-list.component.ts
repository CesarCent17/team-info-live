import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  private hubConnection: HubConnection;
  teams: any[] = [];

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7031/teamHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.start()
      .then(() => {
        console.log('Successful connection to the hub ✅');
      })
      .catch(error => {
        console.error('Error connecting to hub ❌: ' + error);
      });
  }

  ngOnInit() {
    this.hubConnection.on('ReceiveTeam', (team) => {
      console.log('Team received 📥:', team);
      this.teams.push(team);
    });
    console.log(this.teams)
  }
}
