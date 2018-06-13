import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<div class="text-center text-danger error">Page not found!</div>`,
  styles: [
    `.error {
      margin-top: calc( 50vh - 2rem - 65px );
      font-weight: bolder; 
      font-size: xx-large
    }`
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
