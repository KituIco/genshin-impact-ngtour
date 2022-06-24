import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Character } from '../character';
import { CharacterService } from '../character.service';
import { Constellation } from '../constellation';
import { Talent } from '../talent';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  character: Character | undefined;
  constellations: Constellation[] = []; 
  talents: Talent[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCharacter();
    this.getConstellations();
    this.getTalents();
  }

  getCharacter(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id)
      this.characterService.getCharacter(id)
        .subscribe(character => this.character = character);
  }

  getConstellations(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id)
      this.characterService.getConstellations(id)
        .subscribe( constellations => this.constellations = constellations);
  }

  getTalents(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id)
      this.characterService.getTalents(id)
        .subscribe( talents => this.talents = talents);
  }

  goBack(): void {
    this.location.back();
  }

}
