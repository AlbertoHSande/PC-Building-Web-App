import { Component, OnInit } from '@angular/core';
import { ApiComponentsService } from '../api-components.service';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.css']
})
export class HighlightComponent implements OnInit {

  constructor(private apiComponentsService: ApiComponentsService) { }

  noticias;
  
  ngOnInit() {
    this.apiComponentsService.getNoticias().subscribe((data) => {
      this.noticias = data;
    });
  }

  stripFormat(input){
    var replaced = input.replace(/<a class="embedImage-link"(.|\n)*\/a>/gm, '');
    console.log(replaced);
    return input.replace(/<a class="embedImage-link"(.|\n)*\/a>/gm, '');
  }

  returnImage(input){
    console.log(input.match(/http[^"]*?jpg|jpeg|png|gif/));
    return input.match(/http[^"]*?jpg|jpeg|png|gif/);
  }

  formatDate(input){
    return this.apiComponentsService.formatDate(input);
  }

}
