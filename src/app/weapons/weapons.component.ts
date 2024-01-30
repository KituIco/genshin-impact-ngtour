import { Component, OnInit } from '@angular/core';
import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  selectedWeapon?: Weapon;

  weapons: Weapon[] = [];

  constructor( private weaponService: WeaponService,) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  transform(name: string): string {
    return name.toLowerCase().replaceAll('\' ','-').replaceAll(' ','-').replaceAll('\'','-');
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe( (weapons) => {
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

        this.weapons = weapons
      });
  }

}
