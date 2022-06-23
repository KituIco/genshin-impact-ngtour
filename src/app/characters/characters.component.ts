import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  selectedCharacter?: Character;

  characters: Character[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe( (characters) => {
        characters = characters.filter(function(character) { 
          return character.constellation != "" && character.id!="aloy"; 
        }); 
        this.characters = characters
      });
  }

}