import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiComponentsService } from '../api-components.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  placas;
  p: number = 1;
  placaBase;
  modal;
  juegos;
  procesadores;
  stats;
  graficas;
  rams;
  discos;
  discos2;
  fuentes;
  Procesador;
  Grafica;
  Ram;
  Disco1;
  Disco2;
  Fuente;
  games;
  selectedItem;
  term;
  sectionScroll;
  sbuilds;
  mobile;
  showRequirements;
  userLang;
  selectedSpecs;
  selectedGame;
  videoUrl;
  videoWidth = 560;
  videoHeight = 315;

  doScroll() {

    try {
      var elements = document.getElementById("table");

      elements.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    }
    finally{
      this.sectionScroll = null;
    }
  } 

  constructor(private elementRef: ElementRef, private apiComponentsService: ApiComponentsService, protected sanitizer: DomSanitizer) { }

  ngOnInit() {
    var lang = navigator.language;
    if(lang == "es-ES"){
      this.userLang = "es";
    } else {
      this.userLang = "com";
    }
    if (window.screen.width <= 480) { // 768px portrait
      this.mobile = true;
      this.videoWidth = 300;
      this.videoHeight = 200;
    }
    this.getStats();
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.dropdown').dropdown();";
    this.elementRef.nativeElement.appendChild(s);
    this.getJuegos();
    this.getSbuilds();
  }

  getJuegos(){
    this.apiComponentsService.getJuegos().subscribe((data) => {
      this.juegos = data['juegos'];
    });
  }

  getStats(){
    this.apiComponentsService.getStats().subscribe((data) => {
      this.stats = data['stats'];
    });
  }

  showModal(plataforma) {
    this.apiComponentsService.getPlacasbase().subscribe((data) => {
      this.placas = data['placas'];
    });
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.placasbase').modal('show');";
    this.elementRef.nativeElement.appendChild(s);
  }

  close(modal) {
    modal.hide();
  }

  showDropdown(){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.dropdown').dropdown();";
    this.elementRef.nativeElement.appendChild(s);
  }

  showProcessors(socket) {
    this.apiComponentsService.ProcesadoresBySocket(socket).subscribe((data) => {
      this.procesadores = data['procesadores'];
    });
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.procesadores').modal('show');";
    this.elementRef.nativeElement.appendChild(s);
  }

  showGraficas() {
    this.apiComponentsService.getGraficas().subscribe((data) => {
      this.graficas = data['graficas'];
    });
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.graficas').modal('show');";
    this.elementRef.nativeElement.appendChild(s);
  }

  showRam() {
    this.apiComponentsService.getRam().subscribe((data) => {
      this.rams = data['ram'];
    });
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.ram').modal('show');";
    this.elementRef.nativeElement.appendChild(s);
  }

  showDisco() {
    this.apiComponentsService.getDisco().subscribe((data) => {
      this.discos = data['disco'];
    });
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.discos').modal('show');";
    this.elementRef.nativeElement.appendChild(s);
  }

  showDisco2() {
    this.apiComponentsService.getDisco().subscribe((data) => {
      this.discos2 = data['disco'];
    });
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.secundario').modal('show');";
    this.elementRef.nativeElement.appendChild(s);
  }

  showFuentes() {
    this.apiComponentsService.getFuentes().subscribe((data) => {
      this.fuentes = data['fuentes'];
    });
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.fuentes').modal('show');";
    this.elementRef.nativeElement.appendChild(s);
  }

  searchComponentsByGame(juego){
    var procid;

    this.showRequirements = 1;

    this.selectedSpecs = "recspecs";

    this.selectedGame = juego;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + juego.url);

    if(juego.amd != null && juego.amd != 0){
      procid = juego.amd;
    } else {
      procid = juego.intel;
    }
    this.apiComponentsService.getProcesadorById(procid).subscribe((data) => {
     this.procesadores = data['procesadores'];
     this.Procesador = this.procesadores[0];
     this.apiComponentsService.getPlacasbaseBySocket(this.procesadores[0].socket).subscribe((data) => {
      this.placas = data['placas'];
      this.placaBase = this.placas[0];
      });
    });

    var graphid;
    if(juego.radeon != null && juego.radeon != 0){
      graphid = juego.radeon;
    } else {
      graphid = juego.nvidia;
    }
    this.apiComponentsService.getGraficaById(graphid).subscribe((data) => {
      this.graficas = data['graficas'];
      this.Grafica = this.graficas[0];
    });

    this.apiComponentsService.getRamByMemory(juego.ram).subscribe((data) => {
      this.rams = data['ram'];
      this.Ram = this.rams[0];
    });

    this.apiComponentsService.getDisco().subscribe((data) => {
      this.discos = data['disco'];
      this.Disco1 = this.discos[0];
    });

    this.apiComponentsService.getFuentesByPotencia(750).subscribe((data) => {
      this.fuentes = data['fuentes'];
      this.Fuente = this.fuentes[0];
    });

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('#amazon').popup({popup: '.placabase.popup'});";
    this.elementRef.nativeElement.appendChild(s);
    
    
  }

  getMinSpecs(juego){
    var procid;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + juego.minurl);

    if(juego.minamd != null && juego.minamd != 0){
      procid = juego.minamd;
    } else {
      procid = juego.minintel;
    }
    this.apiComponentsService.getProcesadorById(procid).subscribe((data) => {
     this.procesadores = data['procesadores'];
     this.Procesador = this.procesadores[0];
     this.apiComponentsService.getPlacasbaseBySocket(this.procesadores[0].socket).subscribe((data) => {
      this.placas = data['placas'];
      this.placaBase = this.placas[0];
      });
    });

    var graphid;
    if(juego.minradeon != null && juego.minradeon != 0){
      graphid = juego.minradeon;
    } else {
      graphid = juego.minnvidia;
    }
    this.apiComponentsService.getGraficaById(graphid).subscribe((data) => {
      this.graficas = data['graficas'];
      this.Grafica = this.graficas[0];
    });

    this.apiComponentsService.getRamByMemory(juego.minram).subscribe((data) => {
      this.rams = data['ram'];
      this.Ram = this.rams[0];
    });

    this.apiComponentsService.getDisco().subscribe((data) => {
      this.discos = data['disco'];
      this.Disco1 = this.discos[0];
    });

    this.apiComponentsService.getFuentesByPotencia(750).subscribe((data) => {
      this.fuentes = data['fuentes'];
      this.Fuente = this.fuentes[0];
    });

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('#amazon').popup({popup: '.placabase.popup'});";
    this.elementRef.nativeElement.appendChild(s);
    
    
  }

  getMaxSpecs(juego){
    var procid;

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + juego.maxurl);

    if(juego.maxamd != null && juego.maxamd != 0){
      procid = juego.maxamd;
    } else {
      procid = juego.maxintel;
    }
    this.apiComponentsService.getProcesadorById(procid).subscribe((data) => {
     this.procesadores = data['procesadores'];
     this.Procesador = this.procesadores[0];
     this.apiComponentsService.getPlacasbaseBySocket(this.procesadores[0].socket).subscribe((data) => {
      this.placas = data['placas'];
      this.placaBase = this.placas[0];
      });
    });

    var graphid;
    if(juego.maxradeon != null && juego.maxradeon != 0){
      graphid = juego.maxradeon;
    } else {
      graphid = juego.maxnvidia;
    }
    this.apiComponentsService.getGraficaById(graphid).subscribe((data) => {
      this.graficas = data['graficas'];
      this.Grafica = this.graficas[0];
    });

    this.apiComponentsService.getRamByMemory(juego.maxram).subscribe((data) => {
      this.rams = data['ram'];
      this.Ram = this.rams[0];
    });

    this.apiComponentsService.getDisco().subscribe((data) => {
      this.discos = data['disco'];
      this.Disco1 = this.discos[0];
    });

    this.apiComponentsService.getFuentesByPotencia(750).subscribe((data) => {
      this.fuentes = data['fuentes'];
      this.Fuente = this.fuentes[0];
    });

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('#amazon').popup({popup: '.placabase.popup'});";
    this.elementRef.nativeElement.appendChild(s);
    
    
  }

  showCompartir() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('.ui.compartir').modal('show');";
    this.elementRef.nativeElement.appendChild(s);
  }

  getSbuilds(){
    this.apiComponentsService.getSbuilds().subscribe((data) => {
      this.sbuilds = data['sbuilds'];
    });
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.innerHTML = "$('#sbuilds').popup({popup: '.sbuilds.popup'});";
    this.elementRef.nativeElement.appendChild(s);
  }

  searchComponentsByStreamer(streamer){
    this.showRequirements = null;
    this.apiComponentsService.getPlacasbaseById(streamer.placa).subscribe((data) => {
      this.placas = data['placas'];
      this.placaBase = this.placas[0];
    });

    this.apiComponentsService.getProcesadorById(streamer.procesador).subscribe((data) => {
     this.procesadores = data['procesadores'];
     this.Procesador = this.procesadores[0];
    });

    this.apiComponentsService.getGraficaById(streamer.grafica).subscribe((data) => {
      this.graficas = data['graficas'];
      this.Grafica = this.graficas[0];
    });

    this.apiComponentsService.getRamById(streamer.ram).subscribe((data) => {
      this.rams = data['ram'];
      this.Ram = this.rams[0];
    });

    this.apiComponentsService.getDiscoById(streamer.disco).subscribe((data) => {
      this.discos = data['disco'];
      this.Disco1 = this.discos[0];
    });

    this.apiComponentsService.getFuentesById(streamer.fuente).subscribe((data) => {
      this.fuentes = data['fuentes'];
      this.Fuente = this.fuentes[0];
    });
    
  }

}
