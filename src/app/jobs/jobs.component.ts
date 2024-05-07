import { Component, OnInit, inject } from '@angular/core';
import { JobDetail } from '../job.interface';
import { HttpClient } from '@angular/common/http';
import { JobDetailsService } from '../job-details.service';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  http = inject(HttpClient);
  jobList: JobDetail[] = [];
  favorites: JobDetail[] = [];
  isSelected: boolean = false;
  constructor(private jobService: JobDetailsService, private router: Router) {  }
  ngOnInit(): void {
    if (this.jobService.SelectedJobList.length !== 0) {
      this.jobList = this.jobService.wholeJobList;
      localStorage.setItem("wholeJobList", JSON.stringify(this.jobList))
    }
    else {
      this.getJobList();
    }
    console.log("isFavSelected", this.jobService.isFavSelected);
  }
  getJobList() {
    this.jobService.getJobDetails().subscribe(res => {
      this.jobList = res;
      this.jobService.wholeJobList = this.jobList;
      localStorage.setItem("wholeJobList", JSON.stringify(this.jobList))
    })
  }
  removeDuplicates(arr: JobDetail[]): JobDetail[] {
    const uniqueMap: { [key: number]: boolean } = {};
    const result: JobDetail[] = [];
    for (const item of arr) {
      if (!uniqueMap[item.id]) {
        uniqueMap[item.id] = true;
        result.push(item);
      }
    }
    return result;
  }

  favoriteSelected(job: JobDetail) {
    const listItem = this.jobList.filter(x => x.id === job.id);
    if (listItem[0].isFavSelected) {
      listItem[0].isFavSelected = false;
      localStorage.setItem("isFavSelected", JSON.stringify(listItem[0].isFavSelected))
    }
    else {
      listItem[0].isFavSelected = true;
      localStorage.setItem("isFavSelected", JSON.stringify(listItem[0].isFavSelected))
    }
    if (job.isFavSelected) {
      this.addFavorite(job);
      localStorage.setItem("isFavSelected", JSON.stringify(job.isFavSelected))
    }
    if (!job.isFavSelected) {
      this.removeFavorite(job);
      localStorage.setItem("isFavSelected", JSON.stringify(job.isFavSelected))
    }
  }
  addFavorite(job: JobDetail) {
    if (!this.favorites.includes(job)) {
      this.favorites.push(job);
      this.jobService.favoriteList = this.favorites;
      this.jobService.SelectedJobList = this.removeDuplicates(this.jobService.favoriteList);
      localStorage.setItem("favoriteList", JSON.stringify(this.favorites));
      localStorage.setItem("SelectedJobList", JSON.stringify(this.removeDuplicates(this.jobService.favoriteList)));
    }
  }
  removeFavorite(job: JobDetail) {
    this.favorites = this.jobService.SelectedJobList.filter(favorite => favorite.id !== job.id)
    console.log("fav List", this.favorites);
    job.isFavSelected = false;
    this.jobService.favoriteList = this.favorites;
    this.jobService.SelectedJobList = this.jobService.favoriteList;
    localStorage.setItem("favoriteList", JSON.stringify(this.favorites));
    localStorage.setItem("SelectedJobList", JSON.stringify(this.jobService.favoriteList));
  }

  jobDetail(job: JobDetail, jobId: number) {
    this.jobService.SelectedJobItem = job;
    localStorage.setItem("SelectedJobItem", JSON.stringify(job));
    this.router.navigate(['/jobDetails', jobId]);
  }
}
