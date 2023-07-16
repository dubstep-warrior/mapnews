import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fader = trigger('fadeAnimations', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(':enter, :leave', [
      style({
        opacity: 0,
      }),
    ]),
    // Animate the new page in
    query(':enter', [
      animate(
        '600ms ease',
        style({ opacity: 1, transform: 'scale(1) translateY(0)' })
      ),
    ]),
    query(':leave', [
      animate(
        '600ms ease',
        style({ opacity: 0, transform: 'scale(1) translateY(0)' })
      ),
    ]),
  ]),
]);

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('right')),
  transition('* => isRight', slideTo('right')),
  transition('isRight => *', slideTo('left')),
  transition('isLeft => *', slideTo('right')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          [direction]: '43%',
          transform: 'translateY(-50%)',
        }),
      ],
      optional
    ),
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          [direction]: '-100%',
          transform: 'translateY(-50%)',
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [animate('600ms', style({ [direction]: '150%' }))],
        optional
      ),
      query(':enter', [animate('600ms', style({ [direction]: '36%' }))], {
        optional: true,
      }),
    ]),
    // query(':leave *', [style({}), animate(1, style({}))], optional),
    // query(':enter *', [style({ [direction]: '-100%' }), animate('600ms ease', style({ [direction]: '0%' }))], optional),

    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
