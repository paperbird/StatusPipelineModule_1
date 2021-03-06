import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
// tslint:disable-next-line:import-blacklist
import {Observable, Subject} from 'rxjs';
import {
  IPipelineColumn,
  IPipelineColumnElement,
  IStatusChange,
} from '../shared/status-pipeline-module.interface';
import {Board} from '../shared/board';
import {StatusPipelineShared} from '../shared/status-pipeline-shared';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'dvtx-status-pipeline',
  templateUrl: './board-component.component.html',
  styleUrls: ['./board-component.component.css'],
  providers: [StatusPipelineShared],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponentComponent implements OnInit {
  @Input() boardSubject$: Subject<Board>;
  // drag and drop
  @Input() onTransition: EventEmitter<IStatusChange>; // drag and drop operation
  @Input() validateDropRules: Function // asking permission for drag and drop
  // Card events
  @Input() onClickColumnTitle: EventEmitter<IPipelineColumn>; // column title click
  @Input() onAddCard: EventEmitter<IPipelineColumnElement>;
  @Input() onDeleteCard: EventEmitter<IPipelineColumnElement>;
  @Input() onUpdateCard: EventEmitter<IPipelineColumnElement>;
  @Input() onRemoveColumn: EventEmitter<IPipelineColumn>;
  // assorted events
  @Input() onShowMessages: EventEmitter<IPipelineColumnElement>;
  @Input() onShowNotifications: EventEmitter<IPipelineColumnElement>;
  @Input() onShowProjectRooms: EventEmitter<IPipelineColumnElement>;
  @Input() onRemoveFromFavorites: EventEmitter<IPipelineColumnElement>;
  @Input() onShowDocuments: EventEmitter<IPipelineColumnElement>;
  @Input() onArrowPress: EventEmitter<IPipelineColumnElement>;
  @Input() onShowTask: EventEmitter<IPipelineColumnElement>;

  board: Board;
  board$: Observable<Board>
  //
  isSidebarOpen: boolean = false; // initially sidebar is closed.
  sideBarTabIndex: number = 0;


  constructor(
      private cd: ChangeDetectorRef) {
  }

  ngOnInit() {

    this.board$ = this.boardSubject$  // boardSubject$ is input.
    this.boardSubject$.subscribe(board => {
    // console.log('BoardComponent#ngOnInit subscribe board$ {}'/*,JSON.stringify(data,null,'\t')*/)
    this.board = board
    this.refresh()
    })


    // subscribe to card data
    /**
     * - Opening side bar when clicked on messages icon and open comments tab:
     * this must be implemented both ways: must open sidebar and emit an event onDetails(item)
     * so the item can be fetched by the container
     */
    this.onShowMessages.subscribe(
        card => {
          this.isSidebarOpen = true;
          this.sideBarTabIndex = 1; // messages tab

  })

  }

  refresh() {
    this.cd.detectChanges();
  }

  sidebarClose() {
    this.isSidebarOpen = false;
  }


}
