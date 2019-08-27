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

import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../../../../services/type.service';
import { CategoryService } from '../../../../services/category.service';
import { CmdbCategory } from '../../../../models/cmdb-category';
import { Observable } from 'rxjs';
import { CmdbMode } from '../../../../modes.enum';


@Injectable()
export class TypeNameValidator {

  static createValidator(typeService: TypeService) {
    return (control: AbstractControl) => {
      return typeService.validateTypeName(control.value).then(res => {
        return res ? null : {nameAlreadyTaken: true};
      });
    };
  }
}

@Component({
  selector: 'cmdb-type-basic-step',
  templateUrl: './type-basic-step.component.html',
  styleUrls: ['./type-basic-step.component.scss'],
  providers: [TypeNameValidator]
})
export class TypeBasicStepComponent implements OnInit {

  @Input()
  set preData(data: any) {
    if (data !== undefined) {
      this.basicForm.patchValue(data);
    }
  }

  @Input() public mode: CmdbMode;
  public modes = CmdbMode;

  public basicForm: FormGroup;
  public basicCategoryForm: FormGroup;
  public categoryList: Observable<CmdbCategory[]>;
  public icons = [
    'fa-glass',
    'fa-music',
    'fa-search',
    'fa-envelope-o',
    'fa-heart',
    'fa-star',
    'fa-star-o',
    'fa-user',
    'fa-film',
    'fa-th-large',
    'fa-th',
    'fa-th-list',
    'fa-check',
    'fa-times',
    'fa-search-plus',
    'fa-search-minus',
    'fa-power-off',
    'fa-signal',
    'fa-cog',
    'fa-trash-o',
    'fa-home',
    'fa-file-o',
    'fa-clock-o',
    'fa-road',
    'fa-download',
    'fa-arrow-circle-o-down',
    'fa-arrow-circle-o-up',
    'fa-inbox',
    'fa-play-circle-o',
    'fa-repeat',
    'fa-refresh',
    'fa-list-alt',
    'fa-lock',
    'fa-flag',
    'fa-headphones',
    'fa-volume-off',
    'fa-volume-down',
    'fa-volume-up',
    'fa-qrcode',
    'fa-barcode',
    'fa-tag',
    'fa-tags',
    'fa-book',
    'fa-bookmark',
    'fa-print',
    'fa-camera',
    'fa-font',
    'fa-bold',
    'fa-italic',
    'fa-text-height',
    'fa-text-width',
    'fa-align-left',
    'fa-align-center',
    'fa-align-right',
    'fa-align-justify',
    'fa-list',
    'fa-outdent',
    'fa-indent',
    'fa-video-camera',
    'fa-picture-o',
    'fa-pencil',
    'fa-map-marker',
    'fa-adjust',
    'fa-tint',
    'fa-pencil-square-o',
    'fa-share-square-o',
    'fa-check-square-o',
    'fa-arrows',
    'fa-step-backward',
    'fa-fast-backward',
    'fa-backward',
    'fa-play',
    'fa-pause',
    'fa-stop',
    'fa-forward',
    'fa-fast-forward',
    'fa-step-forward',
    'fa-eject',
    'fa-chevron-left',
    'fa-chevron-right',
    'fa-plus-circle',
    'fa-minus-circle',
    'fa-times-circle',
    'fa-check-circle',
    'fa-question-circle',
    'fa-info-circle',
    'fa-crosshairs',
    'fa-times-circle-o',
    'fa-check-circle-o',
    'fa-ban',
    'fa-arrow-left',
    'fa-arrow-right',
    'fa-arrow-up',
    'fa-arrow-down',
    'fa-share',
    'fa-expand',
    'fa-compress',
    'fa-plus',
    'fa-minus',
    'fa-asterisk',
    'fa-exclamation-circle',
    'fa-gift',
    'fa-leaf',
    'fa-fire',
    'fa-eye',
    'fa-eye-slash',
    'fa-exclamation-triangle',
    'fa-plane',
    'fa-calendar',
    'fa-random',
    'fa-comment',
    'fa-magnet',
    'fa-chevron-up',
    'fa-chevron-down',
    'fa-retweet',
    'fa-shopping-cart',
    'fa-folder',
    'fa-folder-open',
    'fa-arrows-v',
    'fa-arrows-h',
    'fa-bar-chart',
    'fa-twitter-square',
    'fa-facebook-square',
    'fa-camera-retro',
    'fa-key',
    'fa-cogs',
    'fa-comments',
    'fa-thumbs-o-up',
    'fa-thumbs-o-down',
    'fa-star-half',
    'fa-heart-o',
    'fa-sign-out',
    'fa-linkedin-square',
    'fa-thumb-tack',
    'fa-external-link',
    'fa-sign-in',
    'fa-trophy',
    'fa-github-square',
    'fa-upload',
    'fa-lemon-o',
    'fa-phone',
    'fa-square-o',
    'fa-bookmark-o',
    'fa-phone-square',
    'fa-twitter',
    'fa-facebook',
    'fa-github',
    'fa-unlock',
    'fa-credit-card',
    'fa-rss',
    'fa-hdd-o',
    'fa-bullhorn',
    'fa-bell',
    'fa-certificate',
    'fa-hand-o-right',
    'fa-hand-o-left',
    'fa-hand-o-up',
    'fa-hand-o-down',
    'fa-arrow-circle-left',
    'fa-arrow-circle-right',
    'fa-arrow-circle-up',
    'fa-arrow-circle-down',
    'fa-globe',
    'fa-wrench',
    'fa-tasks',
    'fa-filter',
    'fa-briefcase',
    'fa-arrows-alt',
    'fa-users',
    'fa-link',
    'fa-cloud',
    'fa-flask',
    'fa-scissors',
    'fa-files-o',
    'fa-paperclip',
    'fa-floppy-o',
    'fa-square',
    'fa-bars',
    'fa-list-ul',
    'fa-list-ol',
    'fa-strikethrough',
    'fa-underline',
    'fa-table',
    'fa-magic',
    'fa-truck',
    'fa-pinterest',
    'fa-pinterest-square',
    'fa-google-plus-square',
    'fa-google-plus',
    'fa-money',
    'fa-caret-down',
    'fa-caret-up',
    'fa-caret-left',
    'fa-caret-right',
    'fa-columns',
    'fa-sort',
    'fa-sort-desc',
    'fa-sort-asc',
    'fa-envelope',
    'fa-linkedin',
    'fa-undo',
    'fa-gavel',
    'fa-tachometer',
    'fa-comment-o',
    'fa-comments-o',
    'fa-bolt',
    'fa-sitemap',
    'fa-umbrella',
    'fa-clipboard',
    'fa-lightbulb-o',
    'fa-exchange',
    'fa-cloud-download',
    'fa-cloud-upload',
    'fa-user-md',
    'fa-stethoscope',
    'fa-suitcase',
    'fa-bell-o',
    'fa-coffee',
    'fa-cutlery',
    'fa-file-text-o',
    'fa-building-o',
    'fa-hospital-o',
    'fa-ambulance',
    'fa-medkit',
    'fa-fighter-jet',
    'fa-beer',
    'fa-h-square',
    'fa-plus-square',
    'fa-angle-double-left',
    'fa-angle-double-right',
    'fa-angle-double-up',
    'fa-angle-double-down',
    'fa-angle-left',
    'fa-angle-right',
    'fa-angle-up',
    'fa-angle-down',
    'fa-desktop',
    'fa-laptop',
    'fa-tablet',
    'fa-mobile',
    'fa-circle-o',
    'fa-quote-left',
    'fa-quote-right',
    'fa-spinner',
    'fa-circle',
    'fa-reply',
    'fa-github-alt',
    'fa-folder-o',
    'fa-folder-open-o',
    'fa-smile-o',
    'fa-frown-o',
    'fa-meh-o',
    'fa-gamepad',
    'fa-keyboard-o',
    'fa-flag-o',
    'fa-flag-checkered',
    'fa-terminal',
    'fa-code',
    'fa-reply-all',
    'fa-star-half-o',
    'fa-location-arrow',
    'fa-crop',
    'fa-code-fork',
    'fa-chain-broken',
    'fa-question',
    'fa-info',
    'fa-exclamation',
    'fa-superscript',
    'fa-subscript',
    'fa-eraser',
    'fa-puzzle-piece',
    'fa-microphone',
    'fa-microphone-slash',
    'fa-shield',
    'fa-calendar-o',
    'fa-fire-extinguisher',
    'fa-rocket',
    'fa-maxcdn',
    'fa-chevron-circle-left',
    'fa-chevron-circle-right',
    'fa-chevron-circle-up',
    'fa-chevron-circle-down',
    'fa-html5',
    'fa-css3',
    'fa-anchor',
    'fa-unlock-alt',
    'fa-bullseye',
    'fa-ellipsis-h',
    'fa-ellipsis-v',
    'fa-rss-square',
    'fa-play-circle',
    'fa-ticket',
    'fa-minus-square',
    'fa-minus-square-o',
    'fa-level-up',
    'fa-level-down',
    'fa-check-square',
    'fa-pencil-square',
    'fa-external-link-square',
    'fa-share-square',
    'fa-compass',
    'fa-caret-square-o-down',
    'fa-caret-square-o-up',
    'fa-caret-square-o-right',
    'fa-eur',
    'fa-gbp',
    'fa-usd',
    'fa-inr',
    'fa-jpy',
    'fa-rub',
    'fa-krw',
    'fa-btc',
    'fa-file',
    'fa-file-text',
    'fa-sort-alpha-asc',
    'fa-sort-alpha-desc',
    'fa-sort-amount-asc',
    'fa-sort-amount-desc',
    'fa-sort-numeric-asc',
    'fa-sort-numeric-desc',
    'fa-thumbs-up',
    'fa-thumbs-down',
    'fa-youtube-square',
    'fa-youtube',
    'fa-xing',
    'fa-xing-square',
    'fa-youtube-play',
    'fa-dropbox',
    'fa-stack-overflow',
    'fa-instagram',
    'fa-flickr',
    'fa-adn',
    'fa-bitbucket',
    'fa-bitbucket-square',
    'fa-tumblr',
    'fa-tumblr-square',
    'fa-long-arrow-down',
    'fa-long-arrow-up',
    'fa-long-arrow-left',
    'fa-long-arrow-right',
    'fa-apple',
    'fa-windows',
    'fa-android',
    'fa-linux',
    'fa-dribbble',
    'fa-skype',
    'fa-foursquare',
    'fa-trello',
    'fa-female',
    'fa-male',
    'fa-gratipay',
    'fa-sun-o',
    'fa-moon-o',
    'fa-archive',
    'fa-bug',
    'fa-vk',
    'fa-weibo',
    'fa-renren',
    'fa-pagelines',
    'fa-stack-exchange',
    'fa-arrow-circle-o-right',
    'fa-arrow-circle-o-left',
    'fa-caret-square-o-left',
    'fa-dot-circle-o',
    'fa-wheelchair',
    'fa-vimeo-square',
    'fa-try',
    'fa-plus-square-o',
    'fa-space-shuttle',
    'fa-slack',
    'fa-envelope-square',
    'fa-wordpress',
    'fa-openid',
    'fa-university',
    'fa-graduation-cap',
    'fa-yahoo',
    'fa-google',
    'fa-reddit',
    'fa-reddit-square',
    'fa-stumbleupon-circle',
    'fa-stumbleupon',
    'fa-delicious',
    'fa-digg',
    'fa-pied-piper',
    'fa-pied-piper-alt',
    'fa-drupal',
    'fa-joomla',
    'fa-language',
    'fa-fax',
    'fa-building',
    'fa-child',
    'fa-paw',
    'fa-spoon',
    'fa-cube',
    'fa-cubes',
    'fa-behance',
    'fa-behance-square',
    'fa-steam',
    'fa-steam-square',
    'fa-recycle',
    'fa-car',
    'fa-taxi',
    'fa-tree',
    'fa-spotify',
    'fa-deviantart',
    'fa-soundcloud',
    'fa-database',
    'fa-file-pdf-o',
    'fa-file-word-o',
    'fa-file-excel-o',
    'fa-file-powerpoint-o',
    'fa-file-image-o',
    'fa-file-archive-o',
    'fa-file-audio-o',
    'fa-file-video-o',
    'fa-file-code-o',
    'fa-vine',
    'fa-codepen',
    'fa-jsfiddle',
    'fa-life-ring',
    'fa-circle-o-notch',
    'fa-rebel',
    'fa-empire',
    'fa-git-square',
    'fa-git',
    'fa-hacker-news',
    'fa-tencent-weibo',
    'fa-qq',
    'fa-weixin',
    'fa-paper-plane',
    'fa-paper-plane-o',
    'fa-history',
    'fa-circle-thin',
    'fa-header',
    'fa-paragraph',
    'fa-sliders',
    'fa-share-alt',
    'fa-share-alt-square',
    'fa-bomb',
    'fa-futbol-o',
    'fa-tty',
    'fa-binoculars',
    'fa-plug',
    'fa-slideshare',
    'fa-twitch',
    'fa-yelp',
    'fa-newspaper-o',
    'fa-wifi',
    'fa-calculator',
    'fa-paypal',
    'fa-google-wallet',
    'fa-cc-visa',
    'fa-cc-mastercard',
    'fa-cc-discover',
    'fa-cc-amex',
    'fa-cc-paypal',
    'fa-cc-stripe',
    'fa-bell-slash',
    'fa-bell-slash-o',
    'fa-trash',
    'fa-copyright',
    'fa-at',
    'fa-eyedropper',
    'fa-paint-brush',
    'fa-birthday-cake',
    'fa-area-chart',
    'fa-pie-chart',
    'fa-line-chart',
    'fa-lastfm',
    'fa-lastfm-square',
    'fa-toggle-off',
    'fa-toggle-on',
    'fa-bicycle',
    'fa-bus',
    'fa-ioxhost',
    'fa-angellist',
    'fa-cc',
    'fa-ils',
    'fa-meanpath',
    'fa-buysellads',
    'fa-connectdevelop',
    'fa-dashcube',
    'fa-forumbee',
    'fa-leanpub',
    'fa-sellsy',
    'fa-shirtsinbulk',
    'fa-simplybuilt',
    'fa-skyatlas',
    'fa-cart-plus',
    'fa-cart-arrow-down',
    'fa-diamond',
    'fa-ship',
    'fa-user-secret',
    'fa-motorcycle',
    'fa-street-view',
    'fa-heartbeat',
    'fa-venus',
    'fa-mars',
    'fa-mercury',
    'fa-transgender',
    'fa-transgender-alt',
    'fa-venus-double',
    'fa-mars-double',
    'fa-venus-mars',
    'fa-mars-stroke',
    'fa-mars-stroke-v',
    'fa-mars-stroke-h',
    'fa-neuter',
    'fa-genderless',
    'fa-facebook-official',
    'fa-pinterest-p',
    'fa-whatsapp',
    'fa-server',
    'fa-user-plus',
    'fa-user-times',
    'fa-bed',
    'fa-viacoin',
    'fa-train',
    'fa-subway',
    'fa-medium',
    'fa-y-combinator',
    'fa-optin-monster',
    'fa-opencart',
    'fa-expeditedssl',
    'fa-battery-full',
    'fa-battery-three-quarters',
    'fa-battery-half',
    'fa-battery-quarter',
    'fa-battery-empty',
    'fa-mouse-pointer',
    'fa-i-cursor',
    'fa-object-group',
    'fa-object-ungroup',
    'fa-sticky-note',
    'fa-sticky-note-o',
    'fa-cc-jcb',
    'fa-cc-diners-club',
    'fa-clone',
    'fa-balance-scale',
    'fa-hourglass-o',
    'fa-hourglass-start',
    'fa-hourglass-half',
    'fa-hourglass-end',
    'fa-hourglass',
    'fa-hand-rock-o',
    'fa-hand-paper-o',
    'fa-hand-scissors-o',
    'fa-hand-lizard-o',
    'fa-hand-spock-o',
    'fa-hand-pointer-o',
    'fa-hand-peace-o',
    'fa-trademark',
    'fa-registered',
    'fa-creative-commons',
    'fa-gg',
    'fa-gg-circle',
    'fa-tripadvisor',
    'fa-odnoklassniki',
    'fa-odnoklassniki-square',
    'fa-get-pocket',
    'fa-wikipedia-w',
    'fa-safari',
    'fa-chrome',
    'fa-firefox',
    'fa-opera',
    'fa-internet-explorer',
    'fa-television',
    'fa-contao',
    'fa-500px',
    'fa-amazon',
    'fa-calendar-plus-o',
    'fa-calendar-minus-o',
    'fa-calendar-times-o',
    'fa-calendar-check-o',
    'fa-industry',
    'fa-map-pin',
    'fa-map-signs',
    'fa-map-o',
    'fa-map',
    'fa-commenting',
    'fa-commenting-o',
    'fa-houzz',
    'fa-vimeo',
    'fa-black-tie',
    'fa-fonticons'
  ];

  constructor(private typeService: TypeService, private categoryService: CategoryService) {
    this.basicForm = new FormGroup({
      name: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      icon: new FormControl('fa-cube'),
      description: new FormControl(''),
      active: new FormControl(true)
    });
    this.basicCategoryForm = new FormGroup({
      category_id: new FormControl(null)
    });
  }

  public get name() {
    return this.basicForm.get('name');
  }

  public get label() {
    return this.basicForm.get('label');
  }

  public ngOnInit(): void {
    if (this.mode === CmdbMode.Create) {
      this.basicForm.get('name').setAsyncValidators(TypeNameValidator.createValidator(this.typeService));
      this.basicForm.get('label').valueChanges.subscribe(val => {
        this.basicForm.get('name').setValue(val.toString().charAt(0).toLowerCase() + val.toString().slice(1));
        this.basicForm.get('name').markAsDirty({onlySelf: true});
        this.basicForm.get('name').markAsTouched({onlySelf: true});
      });
      this.basicCategoryForm.get('category_id').setValidators(Validators.required);
    } else if (this.mode === CmdbMode.Edit) {
      this.basicForm.markAllAsTouched();
    }
    this.categoryList = this.categoryService.getCategoryList();
  }

}
