import { trigger, transition, style, query, animateChild, group, animate } from "@angular/animations";

export const appRouteAnimations =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ transform: 'scale(1.0) translateY(0)', opacity: 1, overflow: 'hidden', position: 'relative' }),
      query(':enter, :leave', [
        style({
          overflow: 'hidden',
          position: 'absolute',
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({
          transform: 'scale(0.8) translateY(20%)',
          opacity: 0
        })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('200ms ease-out', style({
            transform: 'scale(0.8) translateY(-20%)',
            opacity: 0
          }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({
            transform: 'scale(1.0) translateY(0)',
            opacity: 1
          }))
        ], { optional: true }),
        query('@*', animateChild(), { optional: true })
      ]),
    ])
  ]);
