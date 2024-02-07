import { Component, ViewChild } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { appRouteAnimations } from './route-animations/route-animatinos';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierService } from './services/notifier.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    ToolbarComponent,
    FooterComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
  ],
  animations: [appRouteAnimations],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;
  isMobile = false;

  constructor(
    private responsive: BreakpointObserver,
    private contexts: ChildrenOutletContexts,
    private notifier: NotifierService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Ref: https://blog.angular-university.io/angular-responsive-design/
    this.responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.HandsetPortrait
    ]).subscribe(isSmallScreen => {
      this.isMobile = isSmallScreen.matches;
      if (this.sidenav && !this.isMobile) {
        this.sidenav.close();
      }
    });

    this.notifier.messages.subscribe(message => {
      console.log('message', message);
      this.snackBar.open(message.message, 'OK', {
        duration: 5000,
      });
    });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
