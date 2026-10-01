import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  signal
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProjectImage } from '../../../../core/models/project.model';

const GAP_PX = 20;

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.css'
})
export class ProjectGalleryComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) images: ProjectImage[] = [];

  @ViewChild('stage', { static: true }) stageRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('setEl') setEls!: QueryList<ElementRef<HTMLDivElement>>;

  /** 0, 1, 2 nur um das Set dreimal im Template zu wiederholen */
  readonly repeats = [0, 1, 2];
  readonly currentCaption = signal('');

  private setWidth = 0;
  private isDown = false;
  private startX = 0;
  private startScroll = 0;
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.currentCaption.set(this.images[0]?.caption ?? '');
    // einen Frame warten, damit das Layout (inkl. aspect-ratio) steht
    requestAnimationFrame(() => {
      this.measureAndCenter();
      this.updateCaption();
    });

    this.resizeObserver = new ResizeObserver(() => this.measureAndCenter());
    this.resizeObserver.observe(this.stageRef.nativeElement);

    this.stageRef.nativeElement.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.stageRef.nativeElement.removeEventListener('scroll', this.onScroll);
  }

  private measureAndCenter(): void {
    const middleSet = this.setEls.get(1)?.nativeElement;
    if (!middleSet) return;
    this.setWidth = middleSet.getBoundingClientRect().width + GAP_PX;
    // beim allerersten Mal (oder nach Resize) in die mittlere Kopie springen
    const stage = this.stageRef.nativeElement;
    if (stage.scrollLeft < this.setWidth * 0.25 || stage.scrollLeft > this.setWidth * 1.75) {
      stage.scrollLeft = this.setWidth;
    }
  }

  /** Springt unsichtbar in die mittlere Kopie zurück, sobald man sich zu
   *  weit nach links oder rechts bewegt hat - dadurch entsteht endloses
   *  Scrollen in beide Richtungen, ohne dass jemals eine Kante sichtbar wird. */
  private onScroll = (): void => {
    requestAnimationFrame(() => {
      const stage = this.stageRef.nativeElement;
      if (this.setWidth <= 0) return;
      if (stage.scrollLeft < this.setWidth * 0.5) {
        stage.scrollLeft += this.setWidth;
      } else if (stage.scrollLeft > this.setWidth * 1.5) {
        stage.scrollLeft -= this.setWidth;
      }
      this.updateCaption();
    });
  };

  private updateCaption(): void {
    const stage = this.stageRef.nativeElement;
    const stageCenter = stage.getBoundingClientRect().left + stage.clientWidth / 2;
    const slides = stage.querySelectorAll<HTMLElement>('.img-slide');
    let closest: HTMLElement | null = null;
    let closestDist = Infinity;
    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - stageCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = slide;
      }
    });
    const caption = closest ? (closest as HTMLElement).dataset['caption'] : undefined;
    if (caption) this.currentCaption.set(caption);
  }

  onMouseDown(e: MouseEvent): void {
    this.isDown = true;
    this.stageRef.nativeElement.classList.add('grabbing');
    this.startX = e.pageX;
    this.startScroll = this.stageRef.nativeElement.scrollLeft;
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isDown) return;
    e.preventDefault();
    this.stageRef.nativeElement.scrollLeft = this.startScroll - (e.pageX - this.startX);
  }

  onMouseUpOrLeave(): void {
    this.isDown = false;
    this.stageRef.nativeElement.classList.remove('grabbing');
  }
}
