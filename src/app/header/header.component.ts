import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private elementRef: ElementRef){}

  ngOnInit() {
  }

  @Output() forum = new EventEmitter<string>();
    setForum(url){
       this.forum.emit(url);
    }

    showFAQ() {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.innerHTML = "$('.ui.faq').modal('show');";
      this.elementRef.nativeElement.appendChild(s);
    }
  

}
