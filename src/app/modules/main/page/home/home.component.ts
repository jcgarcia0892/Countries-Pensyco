import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  appear = 0;
  private timerId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.timerId = setTimeout(() => {
      this.appear = 1;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
  }
}