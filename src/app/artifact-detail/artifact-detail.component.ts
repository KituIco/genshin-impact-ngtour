import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Artifact } from '../artifact';
import { ArtifactService } from '../artifact.service';

@Component({
  selector: 'app-artifact-detail',
  templateUrl: './artifact-detail.component.html',
  styleUrls: ['./artifact-detail.component.css']
})
export class ArtifactDetailComponent implements OnInit {

  artifact: Artifact | undefined;

  constructor(
    private route: ActivatedRoute,
    private artifactService: ArtifactService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getArtifact();
  }

  transform(name: string): string {
    return name.toLowerCase().replaceAll(' ','-').replaceAll('\'','-');
  }

  getArtifact(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id)
      this.artifactService.getArtifact(id)
        .subscribe(artifact => {
          artifact.id = this.transform(artifact.name);
          artifact.image = "https://genshin.jmp.blue/artifacts/"+ artifact.id +"/circlet-of-logos";
          if (!artifact['1-piece_bonus']) artifact['1-piece_bonus'] = artifact['2-piece_bonus'];
          artifact.type = "Circlet of Logos";
          artifact.location = " Clear Pool and Mountain Cavern";
          artifact.lore = "A blue lily made of silky satin that once served as a noblewoman's headdress. A noble who once ruled over Mondstadt left it behind. In that legendary age, the nobles were examples for the people. They guided their subjects with their conduct and wisdom. They were the true representation of the people of Mondstadt. They were noble not only in lineage, but also in their commitment to virtues and principles. The longevity of the nobles was cut short by their endless self-indulgence. Ostentation gave way to devolution."
          artifact.description = "A satin flower with a glossy finish, fit for an elegant gathering. It still looks as distinguished as it did on the day it was cast aside."
          this.artifact = artifact
        });
  }

  goBack(): void {
    this.location.back();
  }
}
