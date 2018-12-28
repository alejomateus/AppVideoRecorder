import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminGuardService } from './services/admin-guard.service';
import { VideoComponent } from './components/video/video.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate:[AuthGuardService]},
    { path: 'admin', component: VideoComponent, canActivate:[AdminGuardService]},
    { path: 'login', component: RegisterComponent},
    { path: '**',pathMatch:'full', redirectTo:'login' },
    { path: '',pathMatch:'full', redirectTo:'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash:true})],
    exports: [RouterModule]
})
export class APPROUTING {}
