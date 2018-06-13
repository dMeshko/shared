import { Component, OnInit, AfterViewInit, ViewEncapsulation, Output, EventEmitter, ViewChild, Input, Renderer2, TemplateRef, ContentChild } from '@angular/core';
import * as _ from 'lodash';
import { NgSelectComponent } from '@ng-select/ng-select';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'iq-select-picker',
    templateUrl: './iq-select-picker.component.html',
    styleUrls: ['./iq-select-picker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IqSelectPickerComponent implements OnInit, AfterViewInit {

    private originalModelValue: any = null;
    private modelValue: any = null;
    private selectedItems: any[] = [];

    @Input()
    get model() {
        return this.getModelValue();
    }

    set model(value) {
        this.originalModelValue = value;
        this.setModelValue();
    }

    getModelValue = () => {
        let self = this;

        if (self.isMultiple) {
            let tmpModelValue = [];
            self.modelValue.forEach(mValue => {
                self.items.forEach(itm => {
                    if (itm[self.bindValue] === mValue) {
                        tmpModelValue.push(itm);
                    }
                });
            });
            return tmpModelValue;
        } else {
            if (self.modelValue == null) {
                return null;
            }

            let foundItm = null;
            self.items.forEach(itm => {
                if (itm[self.bindValue] === self.modelValue) {
                    foundItm = itm;
                }
            });

            if (foundItm != null) {
                return {
                    Id: foundItm[self.bindValue],
                    Name: foundItm[self.bindLabel]
                }
            }

            return null;
        }
    }

    setModelValue = () => {
        let self = this;

        if (self.isMultiple) {

            if (this.originalModelValue == null) {
                this.selectedItems = [];
                this.modelValue = [];
                return;
            }

            self.originalModelValue.forEach(mItem => {
                let found = false;
                self.items.forEach(itm => {
                    if (itm[self.bindValue] === mItem[self.bindValue]) {
                        found = true;
                        self.addToSelectedItemsList(itm);
                    }
                });

                if (!found) {
                    self.addToSelectedItemsList({ Id: mItem[self.bindValue], Name: mItem[self.bindLabel] });
                }
            });

            //add all selected items to picker items collection
            let tmpModelValue = [];
            this.selectedItems.forEach(selectedItem => {
                let found = false;
                self.items.forEach(itm => {
                    if (itm[self.bindValue] === selectedItem[self.bindValue]) {
                        found = true;
                    }
                });

                if (!found) {
                    self.items = self.items.concat([selectedItem]);
                }

                tmpModelValue.push(selectedItem[self.bindValue]);
            });

            self.modelValue = tmpModelValue;

        } else {
            let found = false;

            if (this.originalModelValue == null) {
                this.modelValue = null;
                return;
            }

            self.items.forEach(itm => {
                if (itm[self.bindValue] === this.originalModelValue[self.bindValue]) {
                    found = true;
                }
            });

            if (!found) {
                self.items.push({
                    Id: this.originalModelValue[self.bindValue],
                    Name: this.originalModelValue[self.bindLabel]
                });
            }

            this.modelValue = this.originalModelValue[self.bindValue];
        }
    }

    @Output()
    modelChange: EventEmitter<any>;

    @Input()
    classNames: string[] = null;

    @Input()
    isRequired: Boolean = false;

    @Input()
    isDisabled: Boolean = false;

    @Input()
    label: string = null;

    @Output()
    onSelect: EventEmitter<any>;

    @Output()
    onRemove: EventEmitter<any>;

    @Input()
    autoFocus: Boolean = false;

    @Input()
    isMultiple: Boolean = false;

    @Input()
    onlyActive: Boolean = false;

    @Input()
    placeholder: string = null;

    //TEMPLATES

    @ContentChild('headerTemplate')
    headerTemplateRef: TemplateRef<any>;

    @ContentChild('optionTemplate')
    optionTemplateRef: TemplateRef<any>;

    @ContentChild('labelTemplate')
    labelTemplateRef: TemplateRef<any>;

    @ContentChild('optGroupTemplate')
    optGroupTemplateRef: TemplateRef<any>;

    @ContentChild('typeToSearchTemplate')
    typeToSearchTemplateRef: TemplateRef<any>;

    @ContentChild('notFoundTemplate')
    notFoundTemplateRef: TemplateRef<any>;

    @ContentChild('loadingTextTemplate')
    loadingTextTemplateRef: TemplateRef<any>;

    @ContentChild('footerTemplate')
    footerTemplateRef: TemplateRef<any>;


    //STATIC DATA
    @Input()
    staticData: any[] = null;

    @Input()
    bindLabel: string = null;

    @Input()
    bindValue: string = null;


    //HTTP 
    @Input()
    siteKey: string = null;

    @Input()
    moduleName: string = null;

    @Input()
    controllerName: string = null;

    @Input()
    baseApiUrlPath: string = null;

    //GROUPING
    @Input()
    groupByPropName: string = null;

    //FILTERING
    @Input()
    filterName: string = null;

    @Input()
    filterProp: string = null;

    //FORM
    @Input()
    form: string = null;

    @Input()
    controlName: string = null;

    @Input()
    showAdd: Boolean = false;

    @Input()
    showRemoveButton: boolean;


    @Input()
    minimumInputLength: number = 3;

    @Input()
    loadOnClick: Boolean = true;

    @Input()
    extractIds: Function = null;

    @Input()
    disableCache: Boolean = false;

    @Input()
    disableAnnotations: Boolean = false;

    noCache: Boolean = false;
    minInput: Number = 0;

    currentPage = 1;
    initialItemsCount: number = 10;
    loadedItemsCount: number;
    searchText: string = null;
    hasNextChunk: boolean = false;
    isLoading: boolean = false;
    items: any[] = [];

    @ViewChild("ngSelect")
    ngSelect: NgSelectComponent;

    renderer: Renderer2;
    http: HttpClient;

    constructor(renderer: Renderer2, http: HttpClient) {
        this.renderer = renderer;
        this.http = http;
        this.modelChange = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onRemove = new EventEmitter();
    }

    ngAfterViewInit(): void {
        let self = this;

        if (this.classNames != null && this.classNames.length > 0) {
            this.classNames.forEach(className => {
                this.renderer.addClass(self.ngSelect.elementRef.nativeElement, className);
            });
        }


        //EVENTS
        self.ngSelect.changeEvent.subscribe($event => {
            self.onChangeIntl($event);
        });

        //HTTP BINDING SEPCIFIC EVENTS
        if (self.controllerName != null) {

            self.renderer.listen(self.ngSelect.elementRef.nativeElement,
                'click',
                () => { return self.onClickIntl(); });

            self.ngSelect.removeEvent.subscribe($event => {
                self.onRemoveIntl($event);
            });

            self.ngSelect.clearEvent.subscribe(() => {
                self.onClearClick();
            });

            self.ngSelect.virtualScroll = true;

            self.ngSelect.scrollToEnd.subscribe(() => {
                self.fetchMore();
            });

            self.ngSelect.searchFn = self.onSearch;
            self.ngSelect.clearSearchOnAdd = true;

            if (self.groupByPropName != null) {
                self.ngSelect.groupBy = self.groupByPropName;
                self.ngSelect.selectableGroup = false;
            }
        }

        if (self.autoFocus) {
            self.ngSelect.focus();
        }
    }

    ngOnInit() {
        let self = this;
        self.noCache = self.disableCache;
        if (self.showAdd) {
            self.noCache = true;
        }

        self.minInput = self.minimumInputLength;

        if (self.bindLabel == null) {
            self.bindLabel = 'Name';
        }
        if (self.bindValue == null) {
            self.bindValue = 'Id';
        }

        if (self.placeholder == null) {
            self.placeholder = '[ISOQuest].[Common].placeholders.EnterName';
        }

        self.showRemoveButton = !self.isRequired;

        if (self.baseApiUrlPath == null) {
            self.baseApiUrlPath = `/api/sites/${self.siteKey}`;
        }

        if (self.staticData != null) {
            self.loadOnClick = false;
            self.minInput = 0;
        }

        if (self.staticData != null) {
            self.loadStaticData();
        }

        this.setModelValue();
    }

    loadStaticData = () => {
        const self = this;
        if (self.isLoading) {
            return;
        }
        self.isLoading = true;
        self.items = _.clone(self.staticData);
        self.isLoading = false;
    }

    onChangeIntl = (newValue) => {
        let self = this;

        //detect removed items and remove from selected items list
        if (self.isMultiple) {
            let itemsForRemove = [];
            self.selectedItems.forEach(itm => {
                let found = false;
                newValue.forEach(nv => {
                    if (itm[self.bindValue] === nv[self.bindValue]) {
                        found = true;
                    }
                });
                if (!found) {
                    itemsForRemove.push(itm);
                }
            });
            itemsForRemove.forEach(itm => self.removeItemFromSelectedItemsList(itm));
        }

        //update model
        self.originalModelValue = newValue;
        self.setModelValue();

        //notify users
        let newModelValue = self.getModelValue();
        self.modelChange.emit(newModelValue);
        self.onSelect.emit(newModelValue);
    }

    loadOnClickLoaded: Boolean = false;

    onClickIntl = () => {
        let self = this;

        if (this.loadOnClickLoaded)
            return;

        self.loadOnClickLoaded = true;

        if (self.controllerName == null) {
            return;
        }

        self.searchText = '';
        self.fetchInitial();
    }

    fetchData(searchTerm: string, pageNumber: number, pageSize: number, loadedItemsCount: number) {
        let self = this;

        const postData = {
            searchTerm: searchTerm,
            pageNumber: pageNumber,
            pageSize: pageSize,
            onlyActive: self.onlyActive,
            loadedItemsCount: loadedItemsCount,
            siteKey: self.siteKey
        };

        let url = "/" + self.moduleName + self.baseApiUrlPath + self.controllerName;
        return this.http.post<any>(url, postData);
    }

    fetchInitial() {
        let self = this;

        if (self.isLoading)
            return;

        self.isLoading = true;

        self.currentPage = 1;
        self.loadedItemsCount = 0;

        self.fetchData(self.searchText, self.currentPage, self.initialItemsCount, self.loadedItemsCount)
            .subscribe(response => {
                self.hasNextChunk = response.HasMoreItems;

                if (response.Items != null) {
                    self.items = _.clone(response.Items);
                }

                self.isLoading = false;

                setTimeout(() => {
                    this.ngSelect.open();
                });
            });
    }

    fetchMore() {
        let self = this;

        if (!self.hasNextChunk)
            return;

        if (self.isLoading)
            return;

        self.isLoading = true;

        self.currentPage += self.currentPage + 1;
        self.loadedItemsCount = self.items.length;

        self.fetchData(self.searchText, self.currentPage, self.initialItemsCount, self.loadedItemsCount)
            .subscribe(response => {
                self.hasNextChunk = response.HasMoreItems;

                if (response.Items != null) {
                    self.items = self.items.concat(response.Items);
                }

                self.isLoading = false;
            },
                error => {
                    console.log(error);
                });
    }

    onSearch = (term: string) => {
        let self = this;

        if (term.length < self.minimumInputLength)
            return false;

        self.searchText = term;
        self.fetchInitial();

        return true;
    }

    onClearClick = () => {
        let self = this;
        self.searchText = '';
        self.fetchInitial();
    }

    onRemoveIntl = ($event) => {
        let self = this;
        self.onRemove.emit($event.value);
    }

    private addToSelectedItemsList = (item) => {
        let self = this;

        if (item == null)
            return;

        if (item[self.bindValue] == null && item[self.bindLabel] != null)
            return;

        let found = false;
        self.selectedItems.forEach(itm => {
            if (itm[self.bindValue] === item[self.bindValue]) {
                found = true;
            }
        });

        if (!found) {
            self.selectedItems.push(item);
        }
    };

    private removeItemFromSelectedItemsList = (item) => {
        let self = this;

        if (item == null)
            return;

        if (item[self.bindValue] == null && item[self.bindLabel] != null)
            return;

        let found = false;
        let itmIndex = -1;
        self.selectedItems.forEach((itm, idx) => {
            if (itm[self.bindValue] === item[self.bindValue]) {
                found = true;
                itmIndex = idx;
            }
        });

        if (found) {
            self.selectedItems.splice(itmIndex, 1);
        }
    };

}
