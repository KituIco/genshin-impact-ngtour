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
  done: string = "Paimon is looking...";
  paimon: string = "https://64.media.tumblr.com/7a2c8a4e95b83266f60bf8f44e074926/9e53aa2b8d88992a-cc/s400x600/a8fbcb8815eb9df66451d89261a220c2381eb025.gif";

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

  transform(name: string): string {
    return name.toLowerCase().replaceAll('\' ','-').replaceAll(' ','-').replaceAll('\'','-');
  }
  
  single(name: string): string {
    let names = name.split(" ")
    if(names.length == 2){
      if(names[0] == "Raiden")
        return names[0];
      return names[1];
    }
    return name;
  }

  getCharacterTerms(): void {
    
    this.route.params.subscribe(params => {
      this.characterService.getCharacters()
        .subscribe( (characters) => {
          characters = characters.filter(function(character) { 
            if(character.name.toLowerCase().includes(params['searchTerm'].toLowerCase())) return true;
            if(character.weapon.toLowerCase() == params['searchTerm'].toLowerCase()) return true;
            if(character.vision.toLowerCase() == params['searchTerm'].toLowerCase()) return true;
            return false;
          }); 

          characters = characters.filter(function(character) { 
            return Date.parse(character.release) < Date.parse("2023-12-01")
            && character.name!="Traveler" && character.id!="aloy"; 
          }); 

          for (let character of characters) {
            if(Date.parse(character.release) > Date.parse("2021-06-28") 
            && Date.parse(character.release) < Date.parse("2021-09-22")
            || Date.parse(character.release) == Date.parse("2022-03-30")){
              character.name = this.single(character.name)
            } 
            character.id = this.transform(character.name);
            character.squareCard = "https://genshin.jmp.blue/characters/"+ character.id +"/icon-big";
          }
          this.done = "Paimon found nothing...";
          this.paimon = "https://64.media.tumblr.com/a3fb5c2c2680bb969a50fb5447427e40/9e53aa2b8d88992a-b0/s400x600/f56a7e820a00952b6d8c5545ddc891e47a6ffa9e.gif";
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

          for (let weapon of weapons) {
            weapon.id = this.transform(weapon.name);
            weapon.image = "https://genshin.jmp.blue/weapons/"+ weapon.id +"/icon";
          }

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
            return false;
          }); 

          artifacts.sort(function(a, b) {
            var keyA = new Date(a.max_rarity), keyB = new Date(b.max_rarity);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });

          artifacts = artifacts.filter(function(artifact) { 
            return artifact.name!="Glacier and Snowfield" && artifact.name!="Sacrifieur to the Firmament"
            && artifact.name!="Desert Pavilion Chronicle" && artifact.name!="Flower of Paradise Lost"
            && artifact.name!="Nymph's Dream" && artifact.name!="Vourukasha's Glow"; 
          }); 
  
          for (let artifact of artifacts) {
            artifact.id = this.transform(artifact.name);
            artifact.image = "https://genshin.jmp.blue/artifacts/"+ artifact.id +"/circlet-of-logos";
            if (!artifact['1-piece_bonus']) artifact['1-piece_bonus'] = artifact['2-piece_bonus']
          }

          this.artifacts = artifacts;
        });
    });
  }

}
