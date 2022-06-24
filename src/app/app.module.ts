import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    NavbarComponent,
    CharacterDetailComponent,
    DashboardComponent,
    WeaponsComponent,
    WeaponDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
