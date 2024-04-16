import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JobsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-job-search';
  constructor(private router: Router) { }

  job(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
