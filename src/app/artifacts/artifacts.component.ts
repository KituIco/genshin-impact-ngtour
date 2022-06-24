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

  getArtifacts(): void {
    this.artifactService.getArtifacts()
      .subscribe( (artifacts) => {
        artifacts.sort(function(a, b) {
          var keyA = new Date(a.rarity), keyB = new Date(b.rarity);
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        });
        this.artifacts = artifacts
      });
  }

}
