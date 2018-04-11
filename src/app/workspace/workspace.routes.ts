import {Route} from "@angular/router";
import {AuthComponent} from "./auth-component/auth-component";
import {PageNotFoundComponent} from "./page-not-found-component/page-not-found-component";
import {WorkspaceComponent} from "./workspace.component";
import {AuthGuard} from "./admin/auth-guard";
import {WorkComponent} from "./work-component/work-component";


export const MODULE_ROUTES: Route[] = [
    { path: '', redirectTo: 'work', pathMatch: 'full' },
    { path: 'login', component: AuthComponent },
    { path: 'work', component: WorkComponent, canActivate: [AuthGuard] },
    // Ошибка поиска маршрута
    { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];

export const MODULE_COMPONENTS = [
    AuthComponent,
    PageNotFoundComponent,
    WorkspaceComponent,
    WorkComponent
];

export const MODULE_EXPORTS = [
    WorkspaceComponent
];
