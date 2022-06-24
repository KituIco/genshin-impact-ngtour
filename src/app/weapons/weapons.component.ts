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
        this.weapons = weapons
      });
  }

}
