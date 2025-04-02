import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BodyComponent } from './components/products/body.component';
import { CategoryComponent } from './components/catogry/catogry.component';




export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'body',component:BodyComponent},
    {path:'catigory',component:CategoryComponent},
    {path:'**',component:CategoryComponent},
    
];
