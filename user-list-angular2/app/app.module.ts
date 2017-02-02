import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

//import { FiltrFioPipe } from './shared/filtrfio.pipe'; можно использоваться для фильтра по ФИО на клиенте

//сервисы
import { UserService }   from './services/user.service';

//компоненты
import { AppComponent }  from './app.component';


@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ AppComponent, /*FiltrFioPipe*/ ],
  providers: 	[ UserService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
