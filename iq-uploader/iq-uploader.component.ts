import { Component, Input, Output, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation, Renderer, EventEmitter } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { IqLoadingService } from "../iq-loading-spinner/";

@Component({
    selector: 'iq-uploader',
    templateUrl: './iq-uploader.component.html',
    styleUrls: ['./iq-uploader.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IqUploaderComponent implements OnInit, AfterViewInit {

    public uploader: FileUploader = new FileUploader({ url: "" });
    public hasBaseDropZoneOver: boolean = false;
    public uploadIsInProgress: boolean = false;
    public errorMessage: string = '';

    @ViewChild('uploadEl') uploadElRef: ElementRef;
    @ViewChild('uploadElMultiple') uploadElRefMultiple: ElementRef;
    
    constructor(private renderer:Renderer, private loadingService: IqLoadingService) { }

    ngAfterViewInit(): void {
        let self = this;
        this.uploader.onAfterAddingFile = () => {
            if (self.uploadElRef != null) {
                self.uploadElRef.nativeElement.value = '';
            }
            if (self.uploadElRefMultiple != null) {
                self.uploadElRefMultiple.nativeElement.value = '';
            }
            self.errorMessage = '';
        };
    }

    ngOnInit(): void {
        let self = this;

        if (this.multiple) {
            if (this.maxNumberOfFiles == undefined) {
                this.maxNumberOfFiles = 10; //by default max 10 files
            }
        }
        else {
            this.maxNumberOfFiles = 1;
        }

        if (this.maxFileSize == undefined) {
            this.maxFileSize = 50; //by default 50 MB
        }

        //Add custom filters
        let options = this.uploader.options;
        let customFilters = [];

        customFilters.push({
            name: 'uniqueByName',
            fn: (item?: FileLikeObject): boolean => {
                let found = false;
                Object
                    .entries(self.uploader.queue)
                    .map(itm => itm[1])
                    .forEach(fileItem => {
                        if (fileItem.file.name === item.name) {
                            found = true;
                        }
                    });

                return !found;
            }
        });

        customFilters.push({
            name: 'allowedExtension',
            fn: (item?: FileLikeObject): boolean => {
                if (item != null) {
                    return self.isAllowed(item.name);
                }
                return false;
            }
        });

        let filters = [...options.filters, ...customFilters];

        this.uploader.setOptions({
            url: this.uploadUrl,
            isHTML5: true,
            autoUpload: false,
            maxFileSize: this.maxFileSize * 1024 * 1024,  //In MB
            queueLimit: this.maxNumberOfFiles,
            filters: [...filters]
        });

        //this.uploader.setOptions({ allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'] });

        this.uploader.onWhenAddingFileFailed = (item, filter) => {
            switch (filter.name) {
                case 'fileSize':
                    this.errorMessage = `Maximum upload size exceeded (Maximum allowed file size is ${this.maxFileSize} MB).`;
                    break;

                case 'queueLimit':
                    this.errorMessage = `Allowed to send a maximum of ${this.maxNumberOfFiles} files`;
                    break;

                case 'mimeType':
                    const allowedTypes = this.allowedMimeType.join();
                    this.errorMessage = `Type "${item.type} is not allowed. Allowed types: "${allowedTypes}"`;
                    break;

                case 'allowedExtension':
                    this.errorMessage = `A file with name ${item.name} is not allowed. Allowed extensions: ${this.allowedExtensions.join(';')}`;
                    break;

                case 'uniqueByName':
                    this.errorMessage = `A file with name ${item.name} already added to the upload queue.`;
                    break;

                default:
                    this.errorMessage = `Unknown error (filter is ${filter.name})`;
            }
        };

        this.uploader.response.subscribe(response => {
            console.log('uploader.response', response);
        });

        this.uploader.onSuccessItem =  (item, response, status, headers) => {
            console.log('uploader.onSuccessItem');
            console.log(item, response, status, headers);
        };
    }
    
    @Output()
    public onUploadStarted: EventEmitter<any>;

    @Output()
    public onUploadFinished: EventEmitter<any>;

    @Input()
    public uploadUrl: string;

    @Input()
    public title: string;

    @Input()
    public multiple: boolean = false;

    @Input()
    public maxNumberOfFiles: number;

    @Input()
    public maxFileSize: number;

    @Input() //TODO
    public allowedMimeType: any;

    @Input()
    public formData: any;

    @Input()
    public required: boolean = false;

    @Input()
    public allowedExtensions: string[];

    @Input()
    public showProgressBar: boolean = true;

    private isAllowed = (fileName: string) => {
        if (this.allowedExtensions == undefined || this.allowedExtensions == null || this.allowedExtensions.length === 0)
            return true;

        let result = false;
        this.allowedExtensions.forEach(ext => {
            if (fileName.indexOf(ext) > 0) {
                result = true;
            }
        });
        return result;
    }

    private getFileItemFromQueue = (fileName: string) => {
        let self = this;
        let result = null;
        Object
            .entries(self.uploader.queue)
            .map((file) => file[1])
            .forEach(fileItem => {
                if (fileItem.file['name'] === fileName) {
                    result = fileItem;
                }
            });
        return result;
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public onBrowseClick = () => {
        let self = this;
        let event = new MouseEvent('click', { bubbles: true });
        event.stopPropagation();

        if (this.multiple) {
            if (self.uploadElRefMultiple != null) {
                self.renderer.invokeElementMethod(self.uploadElRefMultiple.nativeElement, 'dispatchEvent', [event]);
            }
        }
        else {
            if (self.uploadElRef != null) {
                self.renderer.invokeElementMethod(self.uploadElRef.nativeElement, 'dispatchEvent', [event]);
            }
        }
    }

    public startUpload = (formData: any) => {
        let self = this;
        if (this.uploader.queue.length === 0) {
            if (this.required) {
                self.errorMessage = `The ${self.title} field is required.`;
            }
            return;
        }

        self.errorMessage = '';
        self.onUploadStarted.emit();
        
        // Add the formData to the upload
        this.formData = formData;
        if (formData != null) {
            //ako nesto zaebava ovoj pristap
            //da se proba so https://github.com/therealparmesh/object-to-formdata/
            this.uploader.onBuildItemForm = (item, form) => {
                Object.entries(formData).forEach(fd => {
                    form.append(fd[0], fd[1]);
                });
            };
        }

        this.loadingService.show();

        this.uploader.onCompleteAll = () => {
            self.uploader.clearQueue();
            self.onUploadFinished.emit();
            self.uploadIsInProgress = false;
            this.loadingService.hide();
        };

        this.uploader.isUploading = false;
        this.uploader.uploadAll();
        this.uploadIsInProgress = true;
    }
}
