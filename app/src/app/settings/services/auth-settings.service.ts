/*
* DATAGERRY - OpenSource Enterprise CMDB
* Copyright (C) 2019 NETHINKS GmbH
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.

* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Injectable } from '@angular/core';
import { ApiCallService, ApiService } from '../../services/api-call.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmdbLink } from '../../framework/models/cmdb-link';

@Injectable({
  providedIn: 'root'
})
export class AuthSettingsService<T = any> implements ApiService {
  public readonly servicePrefix: string = 'auth';

  constructor(private api: ApiCallService) {
  }

  public getSettings(): Observable<T> {
    return this.api.callGet<T[]>(`${ this.servicePrefix }/settings/`).pipe(
      map((apiResponse) => {
        return apiResponse.body;
      })
    );
  }

  public postSettings(data: T): Observable<T> {
    return this.api.callPost<T>(`${ this.servicePrefix }/settings/`, data).pipe(
      map((apiResponse) => {
        return apiResponse.body;
      })
    );
  }

  public getProviders(): Observable<T[]> {
    return this.api.callGet<T[]>(`${ this.servicePrefix }/providers/`).pipe(
      map((apiResponse) => {
        return apiResponse.body;
      })
    );
  }

  public getProviderConfig(name: string): Observable<T[]> {
    return this.api.callGet<T[]>(`${ this.servicePrefix }/providers/${ name }/config/`).pipe(
      map((apiResponse) => {
        return apiResponse.body;
      })
    );
  }

  public getProviderConfigForm(name: string): Observable<T[]> {
    return this.api.callGet<T[]>(`${ this.servicePrefix }/providers/${ name }/config_form/`).pipe(
      map((apiResponse) => {
        return apiResponse.body;
      })
    );
  }

}
