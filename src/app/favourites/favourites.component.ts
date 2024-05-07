import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailsService } from '../job-details.service';
import { Router } from '@angular/router';
import { JobDetail } from '../job.interface';
@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  noJobs: string = 'No Favorite Jobs are available';
  isFavouriteJob: boolean = false;
  favoriteJobList: JobDetail[] = [];
  constructor(private js: JobDetailsService, private router: Router) { }
  ngOnInit(): void {
    if (this.js.favoriteList.length !== 0) {
      this.isFavouriteJob = true;
      this.favoriteJobList = this.js.favoriteList;
    } else {
      this.isFavouriteJob = false;
      this.noJobs = "No Favorite Jobs are available";
    }
  }
  jobDetail(job: JobDetail, jobId: number) {
    this.js.SelectedJobItem = job;
    localStorage.setItem("SelectedJobItem", JSON.stringify(job));
    this.router.navigate(['/jobDetails', jobId]);
  }
}
