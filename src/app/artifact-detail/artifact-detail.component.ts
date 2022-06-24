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

  getArtifact(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id)
      this.artifactService.getArtifact(id)
        .subscribe(artifact => this.artifact = artifact);
  }

  goBack(): void {
    this.location.back();
  }
}
