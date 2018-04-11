import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MODULE_COMPONENTS, MODULE_EXPORTS, MODULE_ROUTES} from './workspace.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from "./admin/auth-interceptor";
import {AuthService} from "./admin/auth-service";
import {ServiceProvider} from "./services/service-provider";
import {AuthGuard} from "./admin/auth-guard";

@NgModule({
    imports: [
        BrowserModule, FormsModule,
        HttpClientModule,
        RouterModule.forChild(MODULE_ROUTES)
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        AuthService,
        AuthGuard,
        ServiceProvider
    ],
    declarations: [MODULE_COMPONENTS],
    exports: [MODULE_EXPORTS],
    entryComponents: [
        // Шаблоны динамически загружаемых компонентов
    ]
})

export class WorkspaceModule {
    constructor() {
    }
}
