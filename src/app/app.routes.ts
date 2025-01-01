import { Routes } from '@angular/router';
import { NotfoundComponent } from './shareModule/notfound/notfound.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./web/entry-router/entry.router').then(m => m.routes)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/entry-router/entry.routes').then(m => m.routes)
    },
    {
        path:'**',
        component: NotfoundComponent
    }

];
