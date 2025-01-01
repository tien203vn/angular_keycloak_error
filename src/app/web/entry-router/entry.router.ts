import { Route } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { NotfoundComponent } from '../../shareModule/notfound/notfound.component';

export const routes: Route[] = [
    {
        path:'',
        loadChildren:() => import('../page/page.routes').then(m => m.routes)
    },
    {
        path: '**',
        component: NotfoundComponent
    }

]