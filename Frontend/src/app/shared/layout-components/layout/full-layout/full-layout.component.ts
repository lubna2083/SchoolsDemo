import { Component } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent {

  constructor() { }

  ngOnDestroy(): void {
    // location.reload();
  }

}
