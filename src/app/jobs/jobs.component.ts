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
  savedJobsList:JobDetail[]=[]
  constructor(private jobService: JobDetailsService, private router: Router) {

  }
  ngOnInit(): void {
    if (this.jobService.SelectedJobList.length !== 0) {
      this.jobList = this.jobService.wholeJobList;
      localStorage.setItem("wholeJobList",JSON.stringify(this.jobList))
    }
    else {
      this.getJobList();
    }
    this.loadJobFromLocal();
    console.log("isFavSelected", this.jobService.isFavSelected);
  }
  getJobList() {
    this.jobService.getJobDetails().subscribe(res => {
      this.jobList = res;
      this.jobService.wholeJobList = this.jobList;
      localStorage.setItem("wholeJobList",JSON.stringify(this.jobList))
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
      localStorage.setItem("isFavSelected",JSON.stringify(listItem[0].isFavSelected))
    }
    else {
      listItem[0].isFavSelected = true;
      localStorage.setItem("isFavSelected",JSON.stringify(listItem[0].isFavSelected))
    }
    if (job.isFavSelected) {
      this.addFavorite(job);
      localStorage.setItem("isFavSelected",JSON.stringify(job.isFavSelected))
    }
    if (!job.isFavSelected) {
      this.removeFavorite(job);
      localStorage.setItem("isFavSelected",JSON.stringify(job.isFavSelected))
    }
  }
  addFavorite(job: JobDetail) {
    if (!this.favorites.includes(job)) {
      this.favorites.push(job);

      this.jobService.favoriteList = this.favorites;
      this.jobService.SelectedJobList = this.removeDuplicates(this.jobService.favoriteList);
      localStorage.setItem("favoriteList",JSON.stringify(this.favorites));
      localStorage.setItem("SelectedJobList",JSON.stringify(this.removeDuplicates(this.jobService.favoriteList)));
    }
  }
  removeFavorite(job: JobDetail) {
    this.favorites = this.jobService.SelectedJobList.filter(favorite => favorite.id !== job.id)
    console.log("fav List", this.favorites);
    // const jobIn=this.jobList.find(j=>j.id===job.id);
    // if(jobIn){
    //   jobIn.isFavSelected=false;
    // }    
    job.isFavSelected = false;


    this.jobService.favoriteList = this.favorites;
    this.jobService.SelectedJobList = this.jobService.favoriteList;
    localStorage.setItem("favoriteList",JSON.stringify(this.favorites));
      localStorage.setItem("SelectedJobList",JSON.stringify(this.jobService.favoriteList));
    
  }
  // favoriteSelected(data: JobDetail) {
  //   const listItem = this.jobList.filter(x => x.id === data.id);
  //   if (listItem[0].isFavSelected) {
  //     listItem[0].isFavSelected = false;
  //   }
  //   else {
  //     listItem[0].isFavSelected = true;
  //   }
  //   this.favorites.push(data);      
  //   data.isFavSelected=true;
  //   this.jobService.isFavSelected=data.isFavSelected;
  //   this.jobService.favoriteList=this.favorites;
  //   this.jobService.SelectedJobList=this.removeDuplicates(this.jobService.favoriteList);
  //   console.log("fav List", this.jobService.favoriteList);
  //   console.log("selected List", this.jobService.SelectedJobList);
  //   console.log("status icon List", this.jobService.isFavSelected);
  // }

  // removeFavorites(data:JobDetail){
  //   data.isFavSelected=false;
  //   this.jobService.isFavSelected=data.isFavSelected;
  //   this.favorites=this.favorites.filter(y => y.id !== data.id);
  //   this.jobService.favoriteList=this.favorites;
  //   console.log("fav List", this.jobService.favoriteList);
  //   console.log("selected List", this.jobService.SelectedJobList);
  //   console.log("status icon List", this.jobService.isFavSelected);
  // }

  jobDetail(job: JobDetail,jobId:number) {
    this.jobService.SelectedJobItem = job;
    localStorage.setItem("SelectedJobItem",JSON.stringify(job));
    this.router.navigate(['/jobDetails',jobId]);
  }
  addToFavorites(job:JobDetail){
    job.isFavSelected=!job.isFavSelected;
    if(job.isFavSelected){
      if(!this.favorites.includes(job)){
        this.favorites.push(job);
        this.jobService.favoriteList=this.favorites;
        this.jobService.favoriteList = this.favorites;
        this.jobService.SelectedJobList = this.removeDuplicates(this.jobService.favoriteList);
        localStorage.setItem("favoriteList",JSON.stringify(this.favorites));
        localStorage.setItem("SelectedJobList",JSON.stringify(this.removeDuplicates(this.jobService.favoriteList)));
     
      }
    }else{
      // const index=this.jobService.SelectedJobList.findIndex(favoriteJob=> favoriteJob.id === job.id);
      // if(index !== -1){
      //   // this.favorites.splice(index,1); 
      //   // this.jobService.favoriteList = this.favorites;
      //   // this.jobService.SelectedJobList = this.jobService.favoriteList;
      //   // localStorage.setItem("favoriteList",JSON.stringify(this.favorites));
      //   //   localStorage.setItem("SelectedJobList",JSON.stringify(this.jobService.favoriteList)); 
         
      // }
       this.favorites = this.jobService.SelectedJobList.filter(favorite => favorite.id !== job.id)
    console.log("fav List", this.favorites);
    // const jobIn=this.jobList.find(j=>j.id===job.id);
    // if(jobIn){
    //   jobIn.isFavSelected=false;
    // }    
    job.isFavSelected = false;


    this.jobService.favoriteList = this.favorites;
    this.jobService.SelectedJobList = this.jobService.favoriteList;
    localStorage.setItem("favoriteList",JSON.stringify(this.favorites));
      localStorage.setItem("SelectedJobList",JSON.stringify(this.jobService.favoriteList));
    }
this.saveJobtoLocal();
  }
  private loadJobFromLocal(){
    const selectedJobList=localStorage.getItem('SelectedJobList');
    if(selectedJobList){
    this.savedJobsList= JSON.parse(selectedJobList);
    }
    this.jobList.forEach(job=>{
      const savedJob=this.savedJobsList.find(savedJob => savedJob.id === job.id);
      if(savedJob){
        job.isFavSelected=savedJob.isFavSelected;
        if(job.isFavSelected){
          this.favorites.push(job);
          this.jobService.favoriteList = this.favorites;
          this.jobService.SelectedJobList = this.jobService.favoriteList;
          localStorage.setItem("favoriteList",JSON.stringify(this.favorites));
            localStorage.setItem("SelectedJobList",JSON.stringify(this.jobService.favoriteList));
        }
      }
    })
  }
  private saveJobtoLocal(){
const savedJobs=this.jobList.map(job => ({id:job.id, isFavSelected:job.isFavSelected}));
localStorage.setItem("SelectedJobList",JSON.stringify(savedJobs));

  }
}
