import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiComponentsService } from '../api-components.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  noticias;

  constructor(private apiComponentsService: ApiComponentsService) { }

  ngOnInit() {
    this.apiComponentsService.getNoticias().subscribe((data) => {
      this.noticias = data;
    });
  }

  stripFormat(input){
    var replacedText = input.replace(/<a class="embedImage-link"(.|\n)*\/a>/gm, '');
    return replacedText.substring(0, 400) + " ...";
  }

  returnImage(input){
    console.log(input.match(/http[^"]*?jpg|jpeg|png|gif/));
    return input.match(/http[^"]*?jpg|jpeg|png|gif/);
  }

  formatDate(input){
    return this.apiComponentsService.formatDate(input);
  }

}
