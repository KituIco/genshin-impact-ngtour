import { Component, OnInit } from '@angular/core';
import { Artifact } from '../artifact';
import { ArtifactService } from '../artifact.service';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent implements OnInit {

  selectedArtifact?: Artifact;

  artifacts: Artifact[] = [];

  constructor( private artifactService: ArtifactService,) { }

  ngOnInit(): void {
    this.getArtifacts();
  }

  onSelect(artifact: Artifact): void {
    this.selectedArtifact = artifact;
  }

  transform(name: string): string {
    return name.toLowerCase().replaceAll(' ','-').replaceAll('\'','-');
  }

  getArtifacts(): void {
    this.artifactService.getArtifacts()
      .subscribe( (artifacts) => {
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
        this.artifacts = artifacts
      });
  }

}
