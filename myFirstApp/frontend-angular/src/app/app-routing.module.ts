import { FruitEditComponent } from './pages/fruit/fruit-edit/fruit-edit.component';
import { FruitDetailComponent } from './pages/fruit/fruit-detail/fruit-detail.component';

// Angular imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Helpers imports


// Components imports
import { HomeComponent } from './pages/home/home.component';
import { FruitIndexComponent } from './pages/fruit/fruit-index/fruit-index.component';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch:'full'},
  { path: 'home' , component: HomeComponent},

  { path: 'login' , component: LoginComponent},

  {path: 'fruit/index', component: FruitIndexComponent},
  {path: 'fruit/details/:id', component: FruitDetailComponent},
  {path: 'fruit/edit/:id', component: FruitEditComponent},

  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
