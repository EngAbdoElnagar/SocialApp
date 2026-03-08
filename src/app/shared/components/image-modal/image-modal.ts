import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  imports: [],
  templateUrl: './image-modal.html',
  styleUrl: './image-modal.css',
})
export class ImageModal {

  @Input() imageUrl: string | null = null;

  @Output() close = new EventEmitter<void>();

  ngOnChanges() {
    if (this.imageUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  closeImage() {
    this.close.emit();
  }
}
