import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  Renderer,
  OnDestroy
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { filter, delay  } from 'rxjs/operators';
import { DataOptionsService, DateOption } from './../data-options.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-options',
  templateUrl: './date-options.component.html',
  styleUrls: ['./date-options.component.scss'],
  providers: [DatePipe]
})
export class DateOptionsComponent implements OnInit, OnDestroy {

  @Output() onSelected = new EventEmitter<DateOption>();
  @Input() placeholder: string;
  @ViewChild('inputSearch') $inputSearch: ElementRef;

  toggle$: Subscription;
  selectOption$: Subscription;
  options: DateOption[];
  selectedDate: DateOption;
  isShowDropdown: boolean;

  dateStart: object;
  dateEnd: object;

  private _excludeClassCloseWindow = [];

  constructor(
    private dateService: DataOptionsService,
    private eleRef: ElementRef,
    private renderer: Renderer,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.options = this.dateService.getDates();
    this.isShowDropdown = false;
    this.clearSelected();

    console.log(this.datePipe.transform(new Date() , 'yyyy-MM-d'));
  }

  ngOnDestroy() {
    if ( this.selectOption$ ) {
      this.selectOption$.unsubscribe();
    }
    if ( this.toggle$ ) {
      this.toggle$.unsubscribe();
    }
  }

  searchItem(search: any): DateOption[] {
    this.clearSelected();
    if (search === '') {
      this.options = this.dateService.getDates();
      return this.options;
    }
    return this.options = this.dateService.getDates().filter( options => {
      const regex = new RegExp( search , 'gi');
      return options.name.match(regex);
    });
  }

  toggleDropdown($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();
    const isUpdate = Observable.create( observer => {
      this.isShowDropdown = ! this.isShowDropdown;
      observer.next(this.isShowDropdown);
    }).pipe(
      delay(0)
    );
    this.toggle$ = isUpdate.subscribe((status) => {
      if ( status === true ) {
        this.renderer.invokeElementMethod(this.$inputSearch.nativeElement, 'focus');
        this.renderer.setElementProperty(this.$inputSearch.nativeElement , 'value' , '');
        this.options = this.dateService.getDates();
      }
    });
  }

  selectOption(option: DateOption): void {
    this.clearSelected();
    const filterDate = from(this.dateService.getDates())
    .pipe(
      filter(v => v.name === option.name ),
      delay(0)
    );
    this.selectOption$ = filterDate.subscribe((data) => {
    this.selectedDate = JSON.parse(JSON.stringify(data));
      if ( this.isCustomDate() === false ) {
          this.isShowDropdown = false;
          this.onSelected.emit(this.selectedDate);
      }
    });
  }

  isCustomDate(): boolean {
    return ( this.selectedDate.hasDateFrom  || this.selectedDate.hasDateTo );
  }

  selectedFrom(values: { year: number, month: number, day: number } ): void {
    this.selectedDate.start = Object.values(values).join('-');

    const dateStart = this.datePipe.transform(this.selectedDate.start);
    const dateEnd = this.datePipe.transform(this.selectedDate.end);

    this.selectedDate.label = `${this.selectedDate.name}: ${dateStart}`;
    if ( this.selectedDate.hasDateTo === false ) {
      this.onSelected.emit(this.selectedDate);
      this.isShowDropdown = false;
    } else {
      if ( this.selectedDate.end ) {
        this.selectedDate.label = `${this.selectedDate.name}: ${dateStart} - ${dateEnd}`;
        this.onSelected.emit(this.selectedDate);
        this.isShowDropdown = false;
      }
    }
  }

  selectedTo(values: { year: number, month: number, day: number }): void {
    this.selectedDate.end = Object.values(values).join('-');
    const dateStart = this.datePipe.transform(this.selectedDate.start);
    const dateEnd = this.datePipe.transform(this.selectedDate.end);

    if ( this.selectedDate.start ) {
      this.selectedDate.label = `${this.selectedDate.name}: ${dateStart} - ${dateEnd}`;
      this.onSelected.emit(this.selectedDate);
      this.isShowDropdown = false;
    } else {
      this.selectedDate.label = `${this.selectedDate.name}: ${dateEnd}`;
    }
  }

  showLabelOption(): any {
    return this.selectedDate.label || this.selectedDate.name;
  }

  @HostListener('document:click', ['$event']) closeOutsideDropdown($event: any): void {
    const exclude = this._excludeClassCloseWindow.filter( (value) => $event.target.classList.contains(value) );
    if ( this.eleRef.nativeElement.contains($event.target) === true || exclude.length > 0 ) {
      return;
    }

    if ( this.isCustomDate() === false ) {
      this.isShowDropdown = false;
    } else if ( this.selectedDate.hasDateTo === true) {
        if ( this.selectedDate.start && this.selectedDate.end ) {
          this.isShowDropdown = false;
        }
    } else {
      if ( this.selectedDate.start ) {
        this.isShowDropdown = false;
      }
    }
  }

  clearSelected(): void {
    this.selectedDate = {
      name: '',
      label: '',
      hasDateFrom: false,
      hasDateTo: false,
      start: '' ,
      end: ''
    };

    this.dateStart = {};
    this.dateEnd = {};
  }

}
