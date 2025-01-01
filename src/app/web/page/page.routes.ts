import { Route } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { NotfoundComponent } from '../../shareModule/notfound/notfound.component';
import { AuthGuard } from '../../guard/auth.guard';

export const routes: Route[] = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'login',
        canActivate: [AuthGuard],
        loadComponent: () => import('./module/common/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:'**',
        component: NotfoundComponent
    }
]