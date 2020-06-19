import { Component, OnInit } from '@angular/core';
import { ApiComponentsService } from '../api-components.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit {

  builds;



  constructor(private apiComponentsService: ApiComponentsService) { }

  ngOnInit() {
    this.apiComponentsService.getConstrucciones().subscribe((data) => {
      this.builds = data;
    });
  }

  stripFormat(input) {
    var replaced = input.replace(/<a class="embedImage-link"(.|\n)*\/a>/gm, '');
    console.log(replaced);
    return input.replace(/<a class="embedImage-link"(.|\n)*\/a>/gm, '');
  }

  returnImage(input) {
    console.log(input.match(/http.*jpg|jpeg|png|gif/));
    return input.match(/http.*jpg|jpeg|png|gif/);
  }

  formatDate(input){
    return this.apiComponentsService.formatDate(input);
  }

}
