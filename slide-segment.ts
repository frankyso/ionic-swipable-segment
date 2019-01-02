import { Directive, AfterViewInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Segment, Slides } from 'ionic-angular';

/**
 * Generated class for the SlideSegmentDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[slide-segment]', // Attribute selector,
  host: {
    '(window:resize)': 'onResize($event)',
    '(ionChange)': "onChange($event)",
    'style': "overflow-x:scroll; flex-wrap:nowrap; justify-content:initial; scroll-behavior:smooth"
  },
})
export class SlideSegmentDirective implements AfterViewInit {
  @Input('scrollable-segment') ionSegments: Segment;
  @Input('segment-container') ionSegmentContainers: Slides;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);

  selectedSegmentIndex: number = 0;

  constructor(private _ngZone: NgZone) {

  }

  ngAfterViewInit() {
    this._setButtonSegmentStyle();
    this._setContainerListener();
    this._setSlideStyle();
    this.ngModelChange.emit(this.ionSegments.value)
  }

  setAnchorStyles(index) {
    let rawSegment: any = this.ionSegments;
    let segmentArray = rawSegment.getElementsByClassName("segment-button") || [];
    let segmentActivatedArray = rawSegment.getElementsByClassName("segment-activated")[0] || undefined;
    if (segmentActivatedArray != undefined) {
      segmentActivatedArray.setAttribute("class", "segment-button");
    }

    setTimeout(() => {
      segmentArray[index].setAttribute("class", "segment-button segment-activated");
    }, 100);
  }

  _setContainerListener() {
    this.ionSegmentContainers.ionSlideDidChange.subscribe((value: Slides) => {
      if (value._activeIndex != this.selectedSegmentIndex) {
        let rawSegment: any = this.ionSegments;
        let segmentActivatedArray = rawSegment.getElementsByClassName("segment-button")[value._activeIndex];
        this._ngZone.run(() => {
          if (segmentActivatedArray) {
            let selected = document.getElementById(segmentActivatedArray.id).getAttribute("value");
            this.ngModelChange.emit(selected)
          }
        });
      }
    })
  }

  _setSegmentCenter() {
    let rawSegment: any = this.ionSegments;
    let selectedSegment = rawSegment.getElementsByClassName("segment-activated")[0];
    let segmentBar_width = rawSegment.offsetWidth
    let selectedSegment_Width = selectedSegment.offsetWidth;
    let selectedSegment_LeftOffset = document.getElementById(selectedSegment.id).offsetLeft;
    let selectedsegment_mid = selectedSegment_LeftOffset + (selectedSegment_Width / 2);
    let newScrollLeft = selectedsegment_mid - (segmentBar_width / 2);
    rawSegment.scrollTo(newScrollLeft, 0);
  }

  _setButtonSegmentStyle() {
    let rawSegment: any = this.ionSegments;
    for (var i = 0; i < rawSegment.childNodes.length; i++) {
      if (rawSegment.childNodes[i].className == "segment-button") {
        let button = rawSegment.childNodes[i];
        button.setAttribute("style",
          "display: inline-block !important; " +
          // "min-width: 100px !important;" +
          "width: auto !important;" +
          "overflow: initial;" +
          "padding: 0px 24px;");
        button.setAttribute("id", "seg-" + this._makeid())
      }
    }
  }

  _setSlideStyle() {
    let rawSlide: any = this.ionSegmentContainers;
    rawSlide = rawSlide._elementRef.nativeElement
    rawSlide.setAttribute("style","height:auto;");
  }

  _generateSelectedIndex() {
    let rawSegment: any = this.ionSegments;
    let segmentArray = rawSegment.getElementsByClassName("segment-button") || [];

    for (var i = 0; i < segmentArray.length; i++) {
      if (segmentArray[i].classList.contains("segment-activated")) {
        this.selectedSegmentIndex = i;
        break;
      }
    }
  }

  _makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  onResize(event: Event) {

  }

  onChange(change: Segment) {
    setTimeout(() => {
      this._generateSelectedIndex();
      this._setSegmentCenter();
      this.ionSegmentContainers.slideTo(this.selectedSegmentIndex);
    }, 100);
  }

}
