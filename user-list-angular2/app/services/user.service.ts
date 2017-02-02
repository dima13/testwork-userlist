import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; 

import { User } from './../shared/user';
import { Country } from './../shared/country';

@Injectable()
export class UserService {
	url: string = 'https://d-project.pw/api/'
  	constructor(private http: Http) {}

	getUsers(sort: boolean, fio?: string): Promise<User[]> {
		let url = this.url + 'user-list';
		if(sort)
			url += '?order=1';
		else 
			url += '?order=0';

		if(fio)
			url += '&fio=' + fio;

	    return this.http.get(url)
	               	.toPromise()
	               	.then(response => response.json() as User[])
	               	.catch(this.handleError);
	}

	getCountries(): Promise<Country[]> {
	    return this.http.get(this.url + 'country-list')
	               	.toPromise()
	               	.then(response => response.json() as Country[])
	               	.catch(this.handleError);
	}

  	save(user: User): Promise<any> {
  		return this.http.post(this.url + 'user-save?id=' + user.id, JSON.stringify(user))	               
  					.toPromise()
	               	.then(response => response.json())
	               	.catch(this.handleError);	
  	}

  	saveNewUser(user: User): Promise<any> {
  		return this.http.post(this.url + 'new-user', JSON.stringify(user))	               
  					.toPromise()
	               	.then(response => response.json())
	               	.catch(this.handleError);	
  	}

	handleError(error: any): Promise<any> {
	    console.error('An error occurred', error);
	    return Promise.reject(error.message || error);
  	}
}