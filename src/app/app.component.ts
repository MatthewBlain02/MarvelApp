import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-marvel-app';
  Theme = 'Heros';

  changeTheme(){
    const div = document.getElementById('main');
    if(this.Theme == 'Heros'){
      this.Theme = 'Villains';
      div?.classList.remove('heros');
      div?.classList.add('villains');
    }
    else{
      this.Theme = 'Heros';
      div?.classList.remove('villains');
      div?.classList.add('heros');
    }
  }
}
