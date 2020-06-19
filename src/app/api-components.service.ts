import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiComponentsService {

  private API_KEY = 'YOUR_API_KEY';

  constructor(private httpClient: HttpClient) { }

  getStats(){
    return this.httpClient.get(`https://hdsettings.com/api/components/stats/read.php`);
  }

  getPlacasbase(){
    return this.httpClient.get(`https://hdsettings.com/api/components/placasbase/read.php`);
  }

  getPlacasbaseBySocket(socket){
    return this.httpClient.get(`https://hdsettings.com/api/components/placasbase/read_category.php?socket=` + socket);
  }

  getPlacasbaseById(id){
    return this.httpClient.get(`https://hdsettings.com/api/components/placasbase/readOne.php?id=` + id);
  }

  getProcesadorById(id){
    return this.httpClient.get(`https://hdsettings.com/api/components/procesadores/readOne.php?id=` + id);
  }

  ProcesadoresBySocket(socket){
    return this.httpClient.get(`https://hdsettings.com/api/components/procesadores/read_category.php?socket=` + socket);
  }

  getGraficas(){
    return this.httpClient.get(`https://hdsettings.com/api/components/graficas/read.php`);
  }

  getGraficaById(id){
    return this.httpClient.get(`https://hdsettings.com/api/components/graficas/readOne.php?id=` + id);
  }

  getRam(){
    return this.httpClient.get(`https://hdsettings.com/api/components/ram/read.php`);
  }

  getRamByMemory(memoria){
    return this.httpClient.get(`https://hdsettings.com/api/components/ram/readMemory.php?memoria=` + memoria);
  }

  getRamById(id){
    return this.httpClient.get(`https://hdsettings.com/api/components/ram/readOne.php?id=` + id);
  }

  getDisco(){
    return this.httpClient.get(`https://hdsettings.com/api/components/disco/read.php`);
  }

  getDiscoById(id){
    return this.httpClient.get(`https://hdsettings.com/api/components/disco/readOne.php?id=` + id);
  }

  getFuentes(){
    return this.httpClient.get(`https://hdsettings.com/api/components/fuentes/read.php`);
  }

  getFuentesById(id){
    return this.httpClient.get(`https://hdsettings.com/api/components/fuentes/readOne.php?id=` + id);
  }

  getFuentesByPotencia(potencia){
    return this.httpClient.get(`https://hdsettings.com/api/components/fuentes/readPotencia.php?potencia=` + potencia);
  }


  getNoticias(){
    return this.httpClient.get(`https://hdsettings.com/forum/api/v2/discussions?categoryID=2`);
  }

  getConstrucciones(){
    return this.httpClient.get(`https://hdsettings.com/forum/api/v2/discussions?categoryID=3&expand=insertUser`);
  }

  getJuegos(){
    return this.httpClient.get(`https://hdsettings.com/api/components/juegos/read.php`);
  }

  getSbuilds(){
    return this.httpClient.get(`https://hdsettings.com/api/components/sbuilds/read.php`);
  }

  formatDate(input){
    var d = new Date(input);
    var s = "El " + d.toLocaleDateString("es-ES") + " a las " + d.toLocaleTimeString("es-ES");
    return s;
  }
  
}
