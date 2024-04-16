
import { Routes } from '@angular/router';

import { JobDetailsComponent } from "./job-details/job-details.component";
import { JobsComponent } from "./jobs/jobs.component";
import { FavouritesComponent } from "./favourites/favourites.component";
export const routes: Routes = [
    { path: '', redirectTo: '/jobs', pathMatch: 'full' },
    { path: 'jobs', component: JobsComponent },
    { path: 'favourite', component: FavouritesComponent },
    { path: 'jobDetails', component: JobDetailsComponent }

];