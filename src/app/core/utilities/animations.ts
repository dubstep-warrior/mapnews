import {
  animate,
  animateChild,
  group,
  query,
  sequence,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [
        style({
          opacity: 0,
        }),
      ],
      { optional: true },
    ),
    query(
      ':enter',
      [
        animate(
          '600ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }),
        ),
      ],
      { optional: true },
    ),
    query(
      ':leave',
      [
        animate(
          '600ms ease',
          style({ opacity: 0, transform: 'scale(1) translateY(0)' }),
        ),
      ],
      { optional: true },
    ),
  ]),
]);

export const bounce = trigger('bounce', [
  transition(
    ':enter',
    sequence([
      style({ transform: 'translateY(-30px) translateX(150px)' }),
      animate(
        '100ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateY(-14px) translateX(120px)' }),
      ),
      animate(
        '300ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateY(0) translateX(90px)' }),
      ),
      animate(
        '300ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateY(-30px) translateX(60px)' }),
      ),
      animate(
        '200ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateY(0) translateX(30px)' }),
      ),
      animate(
        '100ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateY(-13px) translateX(10px)' }),
      ),
      animate(
        '80ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateY(0) translateX(0px)' }),
      ),
      animate(
        '700ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateY(0) translateX(0px)' }),
      ),
    ]),
  ),
]);

export const slideIn = trigger('slideIn', [
  transition(
    ':enter',
    sequence([
      style({ transform: 'translateY(-30px) translateX(-150px)' }),
      animate(
        '500ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateX(-75px)' }),
      ),
      animate(
        '200ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateX(0px)' }),
      ),
      animate(
        '100ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateX(30px)' }),
      ),
      animate(
        '100ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateX(-15px)' }),
      ),
      animate(
        '100ms cubic-bezier(0,0,0,1)',
        style({ transform: 'translateX(5px)' }),
      ),
      animate(
        '80ms cubic-bezier(1,0,1,1)',
        style({ transform: 'translateX(0px)' }),
      ),
    ]),
  ),
]);

export const rotate = trigger('rotate', [
  transition(':enter', [
    style({
      transform: 'rotate(-360deg)',
      position: 'absolute',
      width: '200px',
      height: '200px',
      top: '75px',
    }),
    animate(
      '1000ms ease',
      style({ transform: 'rotate(0deg)', width: '0px', height: '0px' }),
    ),
  ]),
]);

export const slider = trigger('routeAnimations', [
  transition('home => auth', slideTo('right')),
  transition('auth => home', slideTo('left')),
  transition('login => register', slideTo('right')),
  transition('register => login', slideTo('left')),
]);

export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({
      bottom: '-100%',
      position: 'absolute',
    }),
    animate('600ms ease', style({ bottom: 0 })),
  ]),
  transition(':leave', [
    style({
      bottom: '0%',
      position: 'absolute',
    }),
    animate('600ms ease', style({ bottom: '-100%' })),
  ]),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          [direction]: '0',
          top: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      optional,
    ),
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          [direction]: '-100%',
          top: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true },
    ),
    group([
      query(
        ':leave',
        [animate('600ms', style({ [direction]: '100%' }))],
        optional,
      ),
      query(':enter', [animate('600ms', style({ [direction]: '0%' }))], {
        optional: true,
      }),
      query(':leave *', [style({}), animate('600ms', style({}))], optional),
      query(':enter *', [style({}), animate('0ms', style({}))], optional),
    ]),
  ];
}

export const slideInFromLeft = trigger('slideInFromLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('200ms', style({ transform: 'translateX(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('200ms', style({ transform: 'translateX(-100%)' })),
  ]),
]);
export const slideInFromRight = trigger('slideInFromRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('200ms', style({ transform: 'translateX(0%)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0%)' }),
    animate('200ms', style({ transform: 'translateX(100%)' })),
  ]),
]);
