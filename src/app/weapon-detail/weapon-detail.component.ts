import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Weapon } from '../weapon';
import { WeaponService } from '../weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {

  weapon: Weapon | undefined;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWeapon();
  }

  transform(name: string): string {
    return name.toLowerCase().replaceAll('\' ','-').replaceAll(' ','-').replaceAll('\'','-');
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id)
      this.weaponService.getWeapon(id)
        .subscribe(weapon => {
          weapon.id = this.transform(weapon.name);
          weapon.image = "https://genshin.jmp.blue/weapons/"+ weapon.id +"/icon";
          weapon.subStatType = weapon.subStat;
          weapon.subStat = "16.5%";
          weapon.lore = "In a barren ancient time, when the now-verdant land was still but a wasteland, a maiden, barefoot in the snow, followed the footsteps of the Lord of the Tower. He once was her love, but the unforgiving winds could never understand the softness of mortal flesh. He once was her foe, but her hunt was for more than simple vengeance. \"I dreamt of ocean waves and sand, of lush forests and land.\" \"I dreamt of boars playing in berry bushes, of a towering spire.\" These words she spoke to the God King in a soft tone, but they were left unheard. Awoken from blind love, she realized she was the only one who spoke with sincerity. For he spoke of love, but was only accompanied by razor winds. He looked down at the bent backs of his subjects in the howling wind, believing it to be a sign of their adoration and unwavering obedience. It was the era when the Tyrant of the North Wind warred with the Lord of the Tower. The huntress thought herself loved by the slavemaster. At the end of the war, and when the wind of resistance first blew, in the company of a nameless young man, elf, and knight, she scaled the towering spire and challenged the eccentric lord. \"Finally, I shall hold his gaze.\" But it was not until the moment when her arrow flew toward him, and when the piercing wind was about to rip her asunder, that she finally realized their distance apart."
          this.weapon = weapon;
        });
  }

  goBack(): void {
    this.location.back();
  }
}
