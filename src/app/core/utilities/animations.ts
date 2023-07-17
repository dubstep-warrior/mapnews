import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(
      ':enter, :leave',
      [
        style({
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    // Animate the new page in
    query(
      ':enter',
      [
        animate(
          '600ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        animate(
          '600ms ease',
          style({ opacity: 0, transform: 'scale(1) translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
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
          [direction]: '0%',
          // transform: 'translateY(-50%)',
          top: 0,
          width: '100%',
          height: '100%',
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
          // transform: 'translateY(-50%)',
          top: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [animate('600ms', style({ [direction]: '100%' }))],
        optional
      ),
      query(':enter', [animate('600ms', style({ [direction]: '0%' }))], {
        optional: true,
      }),
      query(':leave *', [style({}), animate('600ms', style({}))], optional),
      query(':enter *', [style({}), animate('0ms', style({}))], optional),
    ]),

    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
