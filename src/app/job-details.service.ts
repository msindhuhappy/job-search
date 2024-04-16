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
  constructor(private httpClient: HttpClient) { }
  private apiUrl = '/jobs';

  getJobDetails(): Observable<JobDetail[]> {
    return this.httpClient.get<JobDetail[]>(this.apiUrl);
  }

  getJobDescrition(id: number): Observable<JobDescription> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<JobDescription>(url);
  }
}
