import { Component, OnInit, AfterViewInit, ViewEncapsulation, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'iq-modal',
   templateUrl: './iq-modal.component.html',
   styleUrls: ['./iq-modal.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class IqModalComponent implements OnInit, AfterViewInit {
   @Input() modalOptions?: NgbModalOptions;
   @Output() onInit: EventEmitter<any> = new EventEmitter();
   @Output() onSuccess: EventEmitter<any> = new EventEmitter();
   @Output() onCancel: EventEmitter<any> = new EventEmitter();
   @ViewChild("modalContent") modalContent: ElementRef; // template variable

   private modalRef: NgbModalRef;
   constructor(private modalService: NgbModal) { }

   ngOnInit() {

   }

   ngAfterViewInit() {
      const systemModalOptions = { centered: true, backdrop: "static" };

      // due to bug in angular, has to be initialized the good old way
      setTimeout(() => {
         this.modalRef = this.modalService.open(this.modalContent, Object.assign({}, systemModalOptions, (this.modalOptions ||
            {})));
         this.onInit.emit(this.modalRef);

         // attach the callbacks
         this.modalRef.result.then(
            (result) => {
               this.onSuccess.emit(result);
            },
            (reason) => {
               this.onCancel.emit(reason);
            }
         );
      });
   }
}
