import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  @ViewChild('tags') inputTags: ElementRef<HTMLInputElement>;

  @Input() form: FormGroup;
  @Input() locationMouseMode?: boolean;
  @Input() type: string;
  @Input() descMaxLength: number = 280;

  @Output() submit = new EventEmitter<void>();
  @Output() imageDrop = new EventEmitter<DragEvent>();
  @Output() addImage = new EventEmitter<Event>();
  @Output() addTag = new EventEmitter<Event>();
  @Output() setLoc = new EventEmitter<string>();
  textAreaRemaining: number = this.descMaxLength;

  submitClicked(): void {
    this.submit.emit();
  }

  imageDropHandler($event: DragEvent): void {
    this.imageDrop.emit($event);
  }

  imageAdded($event: Event): void {
    this.addImage.emit($event);
  }

  tagAdded($event: Event): void {
    this.addTag.emit($event);
    this.inputTags.nativeElement.value = '';
  }

  locationSet($event?: string): void {
    this.setLoc.emit($event);
  }
}
