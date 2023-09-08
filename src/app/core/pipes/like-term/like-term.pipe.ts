import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likeTerm',
})
export class LikeTermPipe implements PipeTransform {
  transform(value: string, likes: string[], currentUserID: string): unknown {
    const currentUserLike = likes.includes(currentUserID);
    const number = likes.length - Number(currentUserLike);
    const body = !!number ? `and ${number} others likes` : 'like';

    return !!likes.length
      ? `${currentUserLike ? 'You' : ''} ${body} ${value}`
      : '';
  }
}
