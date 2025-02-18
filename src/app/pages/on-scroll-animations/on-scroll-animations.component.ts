import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-on-scroll-animations',
  standalone: true,
  templateUrl: './on-scroll-animations.component.html',
  styleUrl: './on-scroll-animations.component.scss'
})
export class OnScrollAnimationsComponent implements AfterViewInit {
  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    const elements: NodeListOf<Element> = this.elRef.nativeElement.querySelectorAll('.slide-animation');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }
}
