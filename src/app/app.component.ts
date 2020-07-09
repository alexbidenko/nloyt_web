import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nloyt-Web';

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    if (localStorage.getItem('defaultLang')) {
      translate.setDefaultLang(localStorage.getItem('defaultLang'));
    } else {
      switch (window.navigator.language ||
      // @ts-ignore
      window.navigator.systemLanguage || window.navigator.userLanguage) {
        case 'en-US':
          translate.setDefaultLang('en-US');
          break;
        case 'ru-RU':
          translate.setDefaultLang('ru-RU');
          break;
        default:
          translate.setDefaultLang('en-US');
      }
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (location.href.includes('service')) {
          document.body.style.minWidth = null;
        } else {
          document.body.style.minWidth = '1920px';
        }

        const div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        // const windowWidth = document.documentElement.clientWidth - scrollWidth;
        let fontHtml;
        const resize = () => {
          const windowWidth = document.documentElement.clientWidth - scrollWidth;
          fontHtml = windowWidth / 135;
          const html = document.getElementsByTagName('html')[0];
          html.style.fontSize = `${fontHtml}px`;
          if (windowWidth < 501) {
            fontHtml = windowWidth / 52;
            html.style.fontSize = `${fontHtml}px`;
          }
        };
        resize();

        // const elems = document.querySelectorAll('.JSfixSize');
        // [].forEach.call(elems, (elem) => {
        //   elem.style.width = `${elem.clientWidth / fontHtml}rem`;
        //   elem.style.height = `${elem.clientHeight / fontHtml}rem`;
        // });
      }
    });

    window.addEventListener('click', (e) => {
      const button = document.querySelector('.JSuserInfoBtn');
      const userInfo = document.querySelector('.JSuserInfo');
      // @ts-ignore
      if (!userInfo.contains(e.target) && !button.contains(e.target)) {
        userInfo.classList.remove('_active');
      }

      const selects = document.querySelectorAll('.JSselect');
      selects.forEach((select) => {
        // @ts-ignore
        if (!select.contains(e.target)) {
          select.classList.remove('_active');
        }
      });
    });
  }
}
