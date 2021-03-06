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

import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TypeService } from '../../services/type.service';
import { CmdbType } from '../../models/cmdb-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { CmdbMode } from '../../modes.enum';
import { RenderComponent } from '../../render/render.component';
import { CmdbObject } from '../../models/cmdb-object';
import { UserService } from '../../../management/services/user.service';
import { ObjectService } from '../../services/object.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CmdbCategory } from '../../models/cmdb-category';
import { SidebarService } from '../../../layout/services/sidebar.service';

@Component({
  selector: 'cmdb-object-add',
  templateUrl: './object-add.component.html',
  styleUrls: ['./object-add.component.scss']
})
export class ObjectAddComponent implements OnInit, OnDestroy {

  public typeList: CmdbType[];
  public categoryList: CmdbCategory[] = [];
  public typeIDForm: FormGroup;
  private typeIDSubject: BehaviorSubject<number>;
  public typeID: Observable<number>;
  public typeInstance: CmdbType;
  public mode: CmdbMode = CmdbMode.Create;
  public objectInstance: CmdbObject;
  public renderForm: FormGroup;
  public fieldsGroups: FormGroup;
  @Output() parentSubmit = new EventEmitter<any>();
  @ViewChild(RenderComponent, {static: false}) render: RenderComponent;


  constructor(private router: Router, private typeService: TypeService, private categoryService: CategoryService,
              private objectService: ObjectService, private userService: UserService, private route: ActivatedRoute,
              private sidebarService: SidebarService) {

    this.objectInstance = new CmdbObject();
    this.typeIDSubject = new BehaviorSubject<number>(null);
    this.route.params.subscribe((params) => {
      if (params.publicID !== undefined) {
        this.typeIDSubject.next(+params.publicID);
      }
    });
    this.typeID = this.typeIDSubject.asObservable();
    this.typeID.subscribe(selectedTypeID => {
      if (selectedTypeID !== null) {
        this.typeService.getType(selectedTypeID).subscribe((typeInstance: CmdbType) => {
          this.typeInstance = typeInstance;
        });
      }
    });
    this.fieldsGroups = new FormGroup({});
    this.renderForm = new FormGroup({
      active: new FormControl(true)
    });
  }

  public ngOnInit(): void {
    this.typeService.getTypeList().subscribe((typeList: CmdbType[]) => {
      this.typeList = typeList;
    }, (e) => {
      console.error(e);
    }, () => {
      this.categoryService.getCategoryList().subscribe((categoryList: CmdbCategory[]) => {
        this.categoryList = categoryList;
      });
    });
    this.typeIDForm = new FormGroup({
      typeID: new FormControl(null, Validators.required)
    });

  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const dialog = document.getElementById('object-form-action');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      dialog.style.visibility = 'visible';
    } else {
      dialog.style.visibility = 'hidden';
    }
  }

  public ngOnDestroy(): void {
    this.typeIDSubject.unsubscribe();
  }


  public get formTypeID() {
    return this.typeIDForm.get('typeID').value;
  }

  public useTypeID() {
    this.typeIDSubject.next(this.formTypeID);
  }

  public get currentTypeID() {
    return this.typeIDSubject.value;
  }

  public saveObject() {
    this.renderForm.markAllAsTouched();
    if (this.renderForm.valid) {
      this.objectInstance.type_id = this.currentTypeID;
      this.objectInstance.version = '1.0.0';
      this.objectInstance.author_id = this.userService.getCurrentUser().public_id;
      this.objectInstance.fields = [];
      this.render.renderForm.removeControl('active');
      Object.keys(this.render.renderForm.controls).forEach(field => {
        this.objectInstance.fields.push({
          name: field,
          value: this.render.renderForm.get(field).value || ''
        });
      });
      let ack = null;
      this.objectService.postObject(this.objectInstance).subscribe(newObjectID => {
          ack = newObjectID;
        },
        (e) => {
          console.error(e);
        }, () => {
          this.router.navigate(['/framework/object/view/' + ack]);
          this.sidebarService.updateTypeCounter(this.typeInstance.public_id);
        });
    }
  }

}
