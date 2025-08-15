import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {RegularFormsComponent} from "./forms/regularforms/regularforms.component";
import {LoginComponent} from "./pages/login/login.component";
import {IsAuthenticatedGuard} from "./auth/guards/IsAuthenticatedGuard";
import {PrivilegeGuard} from "./auth/guards/PrivilegeGuard";
import {IsNotAuthenticatedGuard} from "./auth/guards/IsNotAuthenticatedGuard";

export const AppRoutes: Routes = [
    {
        path: 'login-form',
        canActivate:[IsNotAuthenticatedGuard],
        loadChildren: () =>
            import('./pages/login/login.module').then(m => m.LoginModule)
    }, {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [IsAuthenticatedGuard],
        children: [
            {
                path: 'home',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            }, {
                path: 'components',
                canActivate: [IsAuthenticatedGuard,PrivilegeGuard],
                data: {requiredPrivilege: 'COMPONENTS_VIEW'},
                loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
            }, {
                path: 'forms',
                canActivate: [IsAuthenticatedGuard,PrivilegeGuard],
                data: {requiredPrivilege: 'FORMS_VIEW'},
                loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
            }, {
                path: 'tables',
                loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
                canActivate: [IsAuthenticatedGuard,PrivilegeGuard],
                data: {requiredPrivilege: 'TABLES_VIEW'}
            }, {
                path: 'maps',
                loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule),
                canActivate: [IsAuthenticatedGuard,PrivilegeGuard],
                data: {requiredPrivilege: 'MAPS_VIEW'}
            },
        ]
    },
];