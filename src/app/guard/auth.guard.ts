import { inject, Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  // hàm này sẽ được gọi khi có 1 route cần kiểm tra quyền truy cập
  //được ovveride từ KeycloakAuthGuard
  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    // Kiểm tra xem người dùng đã đăng nhập chưa nếu chưa thì chuyển hướng đến trang đăng nhập
    console.log(this.keycloak.getToken());
    if(!this.authenticated){
        await this.keycloak.login({
            redirectUri: window.location.origin + state.url,
        });
    }
    // Lấy ra các role cần thiết để truy cập vào route
    const requiredRoles = route.data['roles'];
    // Nếu không có role nào được yêu cầu thì cho phép truy cập
    if(!requiredRoles){
        return false;
    }
    // Kiểm tra xem người dùng có role nào trong các role được
    const isHasRoles:boolean = requiredRoles.some((role:string)=> this.roles.includes(role));
    // Nếu người dùng đã đăng nhập và có role thì cho phép truy cập
    if(this.authenticated &&  isHasRoles){
        return true;
    }
    // Nếu không có role nào thì chuyển hướng đến trang báo lỗi
    return false;
    // const router = inject(Router);
    // return router.parseUrl('/forbidden');
  }
}
