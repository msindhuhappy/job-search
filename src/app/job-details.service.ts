import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JobDetail, JobDescription } from './job.interface';
@Injectable({
  providedIn: 'root'
})
export class JobDetailsService {
  wholeJobList: JobDetail[] = [];
  favoriteList: JobDetail[] = [];
  SelectedJobList: JobDetail[] = [];
  SelectedJobItem!: JobDetail;
  selectedJobDetail!: JobDescription;
  jobDescription!: JobDescription;
  isFavSelected: boolean = false;
  constructor(private httpClient: HttpClient) {
    const wholeJobList = localStorage.getItem("wholeJobList");
    const favoriteList = localStorage.getItem("favoriteList");
    const isFavSelected = localStorage.getItem("isFavSelected");
    const SelectedJobList = localStorage.getItem("SelectedJobList");
    const SelectedJobItem = localStorage.getItem("SelectedJobItem");
    if (wholeJobList) {
      this.wholeJobList = JSON.parse(wholeJobList);
      console.log("isFavSelected", wholeJobList);
    }
    if (favoriteList) {
      this.favoriteList = JSON.parse(favoriteList)
    }
    if (isFavSelected) {
      this.isFavSelected = JSON.parse(isFavSelected)
    }
    if (SelectedJobList) {
      this.SelectedJobList = JSON.parse(SelectedJobList)
    }
    if (SelectedJobItem) {
      this.SelectedJobItem = JSON.parse(SelectedJobItem)
    }
  }
  private apiUrl = '/jobs';

  getJobDetails(): Observable<JobDetail[]> {
    return this.httpClient.get<JobDetail[]>(this.apiUrl);
  }

  getJobDescrition(id: number): Observable<JobDescription> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<JobDescription>(url);
  }
}
