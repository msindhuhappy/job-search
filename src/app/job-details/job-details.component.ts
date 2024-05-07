import { Component, OnInit, inject } from '@angular/core';
import { JobDescription } from '../job.interface';
import { CommonModule } from '@angular/common';
import { JobDetailsService } from '../job-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  jobDescription!: JobDescription;
  constructor(private js: JobDetailsService, private router: Router, private route: ActivatedRoute, private location: Location) { }
  http = inject(HttpClient)
  ngOnInit(): void {
    let id: number;
    if (this.route.snapshot.paramMap.get('id')) {
      id = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      id = this.js.SelectedJobItem.id;
    }
    this.js.getJobDescrition(id).subscribe((data => {
      this.jobDescription = data;
    }));
  }
  goBack() {
    this.location.back();
  }
}
