import { Component } from '@angular/core';
import { HraderComponent } from "./components/hrader/hrader.component";
import { BodyComponent } from "./components/products/body.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ HraderComponent, FooterComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'testAppliction';
}
