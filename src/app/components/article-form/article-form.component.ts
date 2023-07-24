import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { State } from 'src/app/core/interfaces/state';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  @ViewChild('tags') inputTags: any;

  @Input() form: FormGroup;
  @Input() locationMouseMode?: boolean;
  @Input() type: string;
  @Input() descMaxLength: number = 280;

  @Output() submit = new EventEmitter<void>();
  @Output() imageDrop = new EventEmitter<any>();
  @Output() addImage = new EventEmitter<any>();
  @Output() addTag = new EventEmitter<any>();
  @Output() setLoc = new EventEmitter<string>();
  textAreaRemaining: number = this.descMaxLength;

  async submitClicked(): Promise<void> {
    this.submit.emit();
  }

  imageDropHandler($event: any): void {
    this.imageDrop.emit($event);
  }

  imageAdded($event: any): void {
    this.addImage.emit($event);
  }

  tagAdded($event: any): void {
    this.addTag.emit($event);
    this.inputTags.nativeElement.value = '';
  }

  locationSet($event?: string): void {
    this.setLoc.emit($event);
  }
}
