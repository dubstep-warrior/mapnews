import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likeTerm',
})
export class LikeTermPipe implements PipeTransform {
  transform(likes: string[], currentUserID: string): unknown {
    const currentUserLike = likes.includes(currentUserID);
    const number = likes.length - Number(currentUserLike);
    const body = currentUserLike
      ? `You ${this.transformCurrentUserLikeTerm(number)} this`
      : `${!!number ? `${number} ${!!(number - 1) ? `likes` : `like`}` : ``}`;

    return body;
  }

  transformCurrentUserLikeTerm(number: number): string {
    return !!number
      ? `and ${!!(number - 1) ? `${number} others like` : `1 other likes`}`
      : 'like';
  }
}
