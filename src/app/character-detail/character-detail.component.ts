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
    // this.getConstellations();
    // this.getTalents();
  }

  toWebCase(str: string): string {
    if(str == "Normal Attack") return "talent-na";
    else if(str == "Elemental Skill") return "talent-skill";
    else if(str == "Elemental Burst") return "talent-burst";
    else if(str == "Unlocked at Ascension 1") return "talent-passive-1";
    else if(str == "Unlocked at Ascension 4") return "talent-passive-2";
    else if(str == "Unlocked Automatically") return "talent-passive-0";
    else return "talent-passive-misc"
  }

  toTitleCase(str: string): string {
    if(!str) return "";
    str = str.replace("_"," ");
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  getCharacter(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id)
      this.characterService.getCharacter(id)
        .subscribe(character =>{
          character.id = id;
          character.icon = "https://genshin.jmp.blue/characters/"+ character.id +"/icon-big";
          character.image = "https://genshin.jmp.blue/characters/"+ character.id +"/portrait";
          character.release = (parseInt(character.release.split("-")[0]) - 2018).toString();
          this.constellations = character.constellations;
          this.talents = character.skillTalents.concat(character.passiveTalents);
          this.character = character;
        });
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
