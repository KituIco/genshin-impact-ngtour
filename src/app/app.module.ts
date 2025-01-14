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
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { ArtifactDetailComponent } from './artifact-detail/artifact-detail.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    NavbarComponent,
    CharacterDetailComponent,
    DashboardComponent,
    WeaponsComponent,
    WeaponDetailComponent,
    ArtifactsComponent,
    ArtifactDetailComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
