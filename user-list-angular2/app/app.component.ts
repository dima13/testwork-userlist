import { Component, OnInit } from '@angular/core';

import { User } from './shared/user';
import { UserService }   from './services/user.service';
import { Country } from './shared/country';

@Component({
  	selector: 'my-app',
  	templateUrl: './app/app.component.html',
})
export class AppComponent implements OnInit { 

	users: User[];
	countries: Country[] = [];
	filterName: string;
	sort: boolean = true;
	newUser: User;

 	constructor(private userService: UserService) {
 		this.newUser = new User();
 		this.newUser.country = new Country();
 	}

 	ngOnInit(): void {
 		this.userService.getCountries().then(countries => this.countries = countries);
 		this.userService.getUsers(this.sort).then(users => this.users = users);
 	}

 	sortBy(): void {
 		this.userService.getUsers(!this.sort,this.filterName).then(users => {
 			this.sort = !this.sort;
 			this.users = users
 		});
 	}

 	findFio(event: any): void {
 		if(event.keyCode == 13 || !this.filterName)
 			this.userService.getUsers(this.sort, this.filterName).then(users => this.users = users);
 	}

 	saveFIO(user: User, fio: string): void {
 		user.fio = fio;
 		this.userService.save(user);
 	}

 	savePhone(user: User, phone: string): void {
 		user.phone = phone;
 		this.userService.save(user);
 	}

 	saveCountry(user: User, country: number): void {
 		user.country.id = country;
 		this.userService.save(user);
 	}

 	saveNewUser(fio: any, phone: any, country: any): void {
 		this.newUser.country.name = this.getCountryName(this.newUser.country.id);
 		this.userService.saveNewUser(this.newUser).then(result => {
 			if(result) {
 				this.newUser.id = result;
 				this.users.unshift(this.newUser);
		 		this.newUser = new User();
		 		this.newUser.country = new Country();
		 		fio.reset(); phone.reset(); country.reset();
 			}
 		});
 	}

 	getCountryName(countryId: number): string {
 		if(this.countries)
	 		for (let i = 0; i < this.countries.length; i++) {
	 			if(this.countries[i].id === countryId)
	 				return this.countries[i].name;
	 		}
 		return '';
 	}
}
