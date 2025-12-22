import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'calculator',
        loadComponent: () => import('@/features/calculator/pages/calculater-view/calculater-view')
    },
    {
        path: '**',
        redirectTo: 'calculator',
    },
];
