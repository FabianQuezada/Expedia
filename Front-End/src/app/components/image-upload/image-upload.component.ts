import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
imagePreviews: (string | null)[] = [null, null, null, null];

onImageSelected(event: Event, index: number): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews[index] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

getBackground(index: number): string {
  return this.imagePreviews[index] ? `url(${this.imagePreviews[index]})` : 'none';
}

}
