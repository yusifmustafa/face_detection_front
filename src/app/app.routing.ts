import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {RegularFormsComponent} from "./forms/regularforms/regularforms.component";
import {LoginComponent} from "./pages/login/login.component";

export const AppRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () =>
            import('./pages/login/login.module').then(m => m.LoginModule)
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            }, {
                path: 'components',
                loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
            }, {
                path: 'forms',
                loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
            }, {
                path: 'tables',
                loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
            }, {
                path: 'maps',
                loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
            }, {
                path: 'widgets',
                loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
            }, {
                path: 'charts',
                loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
            }, {
                path: 'calendar',
                loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
            }, {
                path: '',
                loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
            }, {
                path: '',
                loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
            }
        ]
    },
];