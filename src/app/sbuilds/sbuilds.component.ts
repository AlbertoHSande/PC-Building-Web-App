import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiComponentsService } from '../api-components.service';

@Component({
  selector: 'app-sbuilds',
  templateUrl: './sbuilds.component.html',
  styleUrls: ['./sbuilds.component.css']
})
export class SbuildsComponent implements OnInit {

  const;

  constructor(private elementRef: ElementRef, private apiComponentsService: ApiComponentsService) { }

  ngOnInit() {
    this.getSbuilds();
  }

  getSbuilds(){
    this.apiComponentsService.getSbuilds().subscribe((data) => {
      this.const = data['sbuilds'];
    });
  }

}
