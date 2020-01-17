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

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { ApiCallService } from '../../../services/api-call.service';
import { RenderResult } from '../../../framework/models/cmdb-render';
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'cmdb-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})

export class SearchBarComponent implements OnInit {

  private searchTerm: string = '';
  public searchForm: FormGroup;
  public autoResult: RenderResult[] = [];

  constructor(private route: Router, private searchService: SearchService) {
    this.searchForm = new FormGroup({
      term: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(val => {
      this.searchTerm = val.term == null ? '' : val.term;
      if (this.searchTerm.length > 0) {
        this.searchService.getSearchresults(this.searchTerm, 0, 5, 5, 'undefined')
          .pipe(
            debounceTime(500)  // WAIT FOR 500 MILISECONDS AFTER EACH KEY STROKE.
          ).subscribe( (data: RenderResult[]) => {
            this.autoResult = data;
        });
      }
    });
  }

  public getResponse() {
    this.hide();
    this.route.navigate(['search/results'], {queryParams: {value: this.searchTerm}});
  }

  public hide() {
    setTimeout(() => {
      this.searchForm.get('term').setValue('');
    }, 300);
  }

  public highlight(value) {
    const re = this.searchForm.get('term').value;
    if (typeof value === 'string' && value.length > 0) {
      return value.replace(new RegExp(re, 'gi'), match => {
        return '<span class="badge badge-secondary">' + match + '</span>';
      });
    }
  }
}
