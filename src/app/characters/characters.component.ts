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

  transform(name: string): string {
    return name.toLowerCase().replaceAll(' ','-').replaceAll('\'','-');
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

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe( (characters) => {
        characters = characters.filter(function(character) { 
          return Date.parse(character.release) < Date.parse("2023-12-01")
          && character.name!="Traveler" && character.name!="Aloy";
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

        this.characters = characters
      });
  }

}