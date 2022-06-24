import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { ArtifactsComponent } from './artifacts/artifacts.component';
import { ArtifactDetailComponent } from './artifact-detail/artifact-detail.component';

const routes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weapons/:id', component: WeaponDetailComponent },
  { path: 'artifacts', component: ArtifactsComponent },
  { path: 'artifacts/:id', component: ArtifactDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
