import { Pipe, PipeTransform } from '@angular/core';

import { User } from './user';

@Pipe({ name: 'filtrfio' })
export class FiltrFioPipe implements PipeTransform {
  transform(users: User[], fio?: string) {
  	if(!fio) return users;
    return users.filter(user => {
    	return user.fio.toLowerCase().indexOf(fio.toLowerCase()) == -1 ? false : true;
    });
  }
}