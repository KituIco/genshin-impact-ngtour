import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Character } from '../character';
import { CharacterService } from '../character.service';
import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';
import { Artifact } from '../artifact';
import { ArtifactService } from '../artifact.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  characters: Character[] = [];
  weapons: Weapon[] = [];
  artifacts: Artifact[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private weaponService: WeaponService,
    private artifactService: ArtifactService,
  ) { }

  ngOnInit(): void {
    this.getCharacterTerms();
    this.getWeaponTerms();
    this.getArtifactTerms();
  }

  getCharacterTerms(): void {
    
    this.route.params.subscribe(params => {
      this.characterService.getCharacters()
        .subscribe( (characters) => {
          characters = characters.filter(function(character) { 
            if(character.name.toLowerCase().includes(params['searchTerm'].toLowerCase())) return true;
            if(character.weapon.toLowerCase() == params['searchTerm'].toLowerCase()) return true;
            if(character.element.toLowerCase() == params['searchTerm'].toLowerCase()) return true;
            return false;
          }); 

          characters = characters.filter(function(character) { 
            return character.constellation != "" && character.id!="aloy"; 
          }); 
          this.characters = characters;
        });
    });
  }

  getWeaponTerms(): void {
    this.route.params.subscribe(params => {
      this.weaponService.getWeapons()
        .subscribe( (weapons) => {
          weapons = weapons.filter(function(weapon) { 
            if(weapon.name.toLowerCase().includes(params['searchTerm'].toLowerCase())) return true;
            if(weapon.type.toLowerCase() == params['searchTerm'].toLowerCase()) return true;
            return false;
          }); 

          weapons = weapons.filter(function(weapon) { 
            return weapon.id != "mouuns-moon" && weapon.id!="iron-sting"; 
          });
          weapons.sort(function(a, b) {
            var keyA = new Date(a.rarity), keyB = new Date(b.rarity);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });
          this.weapons = weapons;
        });
    });
  }

  getArtifactTerms(): void {
    this.route.params.subscribe(params => {
      this.artifactService.getArtifacts()
        .subscribe( (artifacts) => {
          artifacts = artifacts.filter(function(artifact) { 
            if(artifact.name.toLowerCase().includes(params['searchTerm'].toLowerCase())) return true;
            if(artifact.type.toLowerCase().includes(params['searchTerm'].toLowerCase())) return true;
            return false;
          }); 

          artifacts.sort(function(a, b) {
            var keyA = new Date(a.rarity), keyB = new Date(b.rarity);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });
          this.artifacts = artifacts;
        });
    });
  }

}
