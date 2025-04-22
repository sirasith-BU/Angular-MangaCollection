import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-landing-page',
  imports: [ButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  private router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  goToMain() {
    this.router.navigate(['manga'], { relativeTo: this.route });
  }
}
