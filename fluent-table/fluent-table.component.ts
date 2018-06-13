import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { FluentTableConfig } from "./fluent-table-config";
import { TableColumn, SortPropDir, SortDirection, SortType, TableColumnProp, SelectionType } from "@swimlane/ngx-datatable/src/types";
import { ISortObject } from "./sort-object.interface";
import { IFluentTableResponse } from "./fluent-table-response.interface";
import { IFluentTableRequest } from "./fluent-table-request.interface";
import { Observable, Subscription } from 'rxjs';
import { FluentTableRequestExportType } from "./fluent-table-request-export-type.enum";
import { QueryStringBuilder } from "./query-string-builder";
import { ApplicationService } from '../application';

@Component({
    selector: 'fluent-table',
    templateUrl: './fluent-table.component.html',
    styleUrls: ['./fluent-table.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class FluentTableComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild("fluentTable") table: any;

    @Input() source: { [key: string]: any }[] | string;
    @Input() config: FluentTableConfig;

    /**
     * Set to true when the source is external, non-static data
     */
    externalSource: boolean;

    rows: { [key: string]: any }[] | Observable<any[]>;
    columns: TableColumn[];
    sorts: SortPropDir[];
    sortingType: SortType;
    selectionType: SelectionType;
    selectedRows: any[];
    enableCheck: (row, column, value) => boolean;

    dataSubscription: Subscription;
    tableRequest: IFluentTableRequest;
    footerData: any;
    availablePageSizes = [ 10, 20, 50, 100 ];

    constructor(private http: HttpClient, private applicationService: ApplicationService) { }

    ngOnInit() {
        this.initState();

        if (this.config.grouping) {
            this.table.rows = this.sortArray(<any[]>this.rows, this.sorts[0].prop, this.sorts[0].dir);
            this.table.groupedRows = this.groupRows(this.sorts[0].prop, this.sorts[0].dir);
        }
    }

    ngOnDestroy(): void {
        if (this.dataSubscription)
            this.dataSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        //setTimeout(() => {
        //    const defaultOnHeaderSelect = this.table.onHeaderSelect;
        //    const table = this.table;

        //    table.onHeaderSelect = (event: any) => {
        //        console.log(table._internalColumns);
        //        if (table.selectAllRowsOnPage) {
        //            const first = table.bodyComponent.indexes.first;
        //            const last = table.bodyComponent.indexes.last;

        //            // due to bug in the original component, had to override their code and
        //            // fix it this way, by taking the displayCheck factor too
        //            let eligibleForSelection = table._internalRows.slice(first, last);
        //            if (table.displayCheck)
        //                eligibleForSelection = eligibleForSelection.filter(table.displayCheck.bind(this));

        //            // before we splice, chk if we currently have all selected
        //            const allSelected = table.selected.length === eligibleForSelection.length;

        //            // remove all existing either way
        //            table.selected = [];

        //            // do the opposite here
        //            if (!allSelected) {
        //                table.selected.push(...eligibleForSelection);
        //            }
        //            table.allRowsSelected = allSelected;
        //        } else {
        //            // due to bug in the original component, had to override their code and
        //            // fix it this way, by taking the displayCheck factor too
        //            let eligibleForSelection = table.rows;
        //            if (table.displayCheck)
        //                eligibleForSelection = eligibleForSelection.filter(table.displayCheck.bind(this));

        //            // before we splice, chk if we currently have all selected
        //            const allSelected = table.selected.length === eligibleForSelection.length;
        //            // remove all existing either way
        //            table.selected = [];

        //            // do the opposite here
        //            if (!allSelected) {
        //                table.selected.push(...eligibleForSelection);
        //            }
        //        }

        //        table.select.emit({
        //            selected: table.selected
        //        });
        //    };
        //});
    }

    /**
     * Issued export request
     * @param exportType
     */
    onExport(exportType: "excel" | "pdf"): void {
        const copyObject = Object.assign(
            {},
            this.tableRequest,
            {
                "export": true,
                "exportType": exportType === "excel" ? FluentTableRequestExportType.Xls : FluentTableRequestExportType.Pdf,
                "count": this.applicationService.getApplicationSettings().maxExportRecordSize
            });
        const params = QueryStringBuilder.buildParametersFromSearch(copyObject);
        window.open(`${this.source}?${params.toString()}`, "_self");
    }

    /**
     * Refreshes the data
     */
    onDataRefresh(): void {
        this.normalizeData();
    }

    /**
     * Changes the page and refreshes the data
     * @param newPage
     */
    onPageChange(newPage): void {
        this.tableRequest.page = newPage;
        this.normalizeData();
    }

    /**
     * Changes the page size and refreshes the data
     * @param newPageSize
     */
    onPageSizeChange(newPageSize): void {
        this.tableRequest.count = newPageSize;
        this.normalizeData();
    }

    /**
     *  Updates the exposed selected array
     * @param selectedObject The currently selected items
     */
    onSelect(selectedObject): void {
        this.config.selection.selected = selectedObject.selected;
    }

    /**
     * Callback on sorting
     * @param sortObject
     */
    onSort(sortObject: ISortObject): void {
        if (this.config.grouping) {
            // this moves the groups too, based on the items
            this.table.rows = this.sortArray(<any[]>this.rows, sortObject.column.prop, sortObject.newValue);
            this.table.groupedRows = this.groupRows(sortObject.column.prop, sortObject.newValue);
        }

        if (!this.externalSource)
            this.sorts = sortObject.sorts;
        else {
            this.tableRequest.sorting = [];
            sortObject.sorts.forEach(sorting => this.tableRequest.sorting.push(this.transformToFluentTableSort(sorting)));

            this.normalizeData();
        }
    }

    /**
     * Custom click binder for triggering the toggle action on the group
     * @param group The group we want toggled
     */
    toggleGroup(group): void {
        if (group.expanded === undefined) {
            group.expanded = this.config.grouping.expandGroups;
        }

        group.expanded = !group.expanded;
        this.table.groupHeader.toggleExpandGroup(group);
    }

    /**
     * Toggle action called by the core component after originally toggling the group
     * @param group The toggled group
     */
    onGroupToggle(group): void {
        if (group.value.expanded)
            this.config.grouping.onGroupExpand && this.config.grouping.onGroupExpand(group);
        else
            this.config.grouping.onGroupCollapse && this.config.grouping.onGroupCollapse(group);
    }

    /**
     * Initiates & Transforms FluentTable format to NgxDatatable
     */
    private initState(): void {
        this.tableRequest = {
            count: this.config.pageSize || this.applicationService.getApplicationSettings().listViewPageSize,
            filter: [],
            page: 1,
            sorting: []
        };
        if (this.config.sorting) {
            this.tableRequest.sorting = [];
            if (this.config.sorting instanceof Array) {
                this.table.config.forEach(sorting => this.tableRequest.sorting.push(this.transformToFluentTableSort(this.transformToSortPropDir(sorting))));
            }
            else {
                this.tableRequest.sorting.push(
                    this.transformToFluentTableSort(this.transformToSortPropDir(<{ [key: string]: "asc" | "desc" }>this.config.sorting)));
            }
        }
        //todo: filter

        this.footerData = {
            totalItems: 0,
            totalPage: 0,
            startingDisplayIndex: 0,
            endingDisplayIndex: 0
        };

        this.normalizeData();
        this.selectionType = this.normalizeSelection();
        this.columns = this.normalizeColumns();
        this.sorts = this.normalizeSorting();
    }

    /**
     * Normalizes row selection
     */
    private normalizeSelection(): SelectionType {
        if (this.config.selection) {
            if (this.config.selection.enableCheck) {
                this.enableCheck = this.config.selection.enableCheck;
                this.selectedRows = this.config.selection.selected ? this.config.selection.selected.filter(this.enableCheck.bind(this)) : [];

                if (this.config.selection.selected.length !== this.selectedRows.length) {
                    console.warn("[FLUENT TABLE] The configuration includes rows that are not permitted by the enableCheck() constraint.  The original data has been changed.");
                    this.config.selection.selected = this.selectedRows;
                }
            } else {
                this.selectedRows = this.config.selection.selected || [];
                this.enableCheck = () => true;
            }

            switch (this.config.selection.mode) {
                case "single":
                    return SelectionType.single;
                case "cell":
                    return SelectionType.cell;
                case "multi":
                    return SelectionType.multi;
                case "multiClick":
                    return SelectionType.multiClick;
                case "checkbox":
                    return SelectionType.checkbox;
                default:
                    throw new Error("Unsupported selection type!!");
            }
        }

        return undefined;
    }

    /**
     * Normalizes the sorting, re-maps it to the correct format
     */
    private normalizeSorting(): SortPropDir[] {
        const sortings: SortPropDir[] = [];

        if (this.config.sorting instanceof Array) {
            this.sortingType = SortType.multi;
            const sortingsArray = this.config.sorting as { [key: string]: "asc" | "desc" }[];
            sortingsArray.forEach(sorting => sortings.push(this.transformToSortPropDir(sorting)));
        } else {
            this.sortingType = SortType.single;
            sortings.push(this.transformToSortPropDir(this.config.sorting as { [key: string]: "asc" | "desc" }));
        }

        return sortings;
    }

    /**
     * Transforms SortPropDir to FluentTable format property
     * @param sorting
     */
    private transformToFluentTableSort(sorting: SortPropDir): { name: string, dir: "asc" | "desc" } {
        const sortingField: TableColumnProp = sorting.prop;
        const sortingDirection: "asc" | "desc" = sorting.dir === SortDirection.asc ? "asc" : "desc";

        return {
            name: <string>sortingField,
            dir: sortingDirection
        };
    }

    /**
     * Transforms FluentTable to NgxDatatable format property
     * @param sorting
     */
    private transformToSortPropDir(sorting: { [key: string]: "asc" | "desc" }): SortPropDir {
        const sortingField = Object.keys(sorting)[0] as string;
        const sortingDirection = sorting[sortingField];

        return {
            prop: sortingField,
            dir: sortingDirection === "asc" ? SortDirection.asc : SortDirection.desc
        };
    }

    /**
     * Normalizes the columns, re-maps them to the correct format
     */
    private normalizeColumns(): TableColumn[] {
        const columns: TableColumn[] = [];

        this.config.columns
            .filter(column => column.show === undefined || column.show)
            .forEach((column, index) => columns.push({
                prop: column.field,
                name: column.title,
                resizeable: column.resizable,
                sortable: !!column.sortable,
                cellClass: column.cellClass,
                minWidth: column.minWidth,
                width: column.width,
                maxWidth: column.maxWidth,
                flexGrow: column.flexGrow || 1,
                checkboxable: index === 0 && this.selectionType === SelectionType.checkbox,
                headerCheckboxable: (index === 0 && this.selectionType === SelectionType.checkbox)
            })
        );

        return columns;
    }

    /**
     * Normalizes data, since the source may be static array or and external url
     */
    private normalizeData(): void {
        if (this.source instanceof Array) {
            this.externalSource = false;
            this.rows = this.source;
            this.footerData.totalItems = this.rows.length;
            //todo: pagination
            return;
        }

        // fetch it from the server..
        this.externalSource = true;
        const that = this;
        this.dataSubscription = this.http.post(this.source, this.tableRequest).subscribe((response: IFluentTableResponse) => {
            that.rows = response.data;
            that.footerData = {
                totalItems: response.recordsTotal,
                totalPage: response.recordsTotal / (that.tableRequest.count),
                startingDisplayIndex: (that.tableRequest.page - 1) * (that.tableRequest.count) + 1,
                endingDisplayIndex: Math.min(that.tableRequest.page * that.tableRequest.count, response.recordsTotal)
            };
            that.footerData.totalItems = response.recordsTotal;
            that.footerData.totalPages = response.recordsTotal / (that.tableRequest.count);
        });
    }

    /**
    * Returns grouped row representation, sorted within the boundaries of the groups
    * @param field The field that is going to be used as a key for obtaining the value from the row object
    * @param direction The direction, ascending or descending
    */
    private groupRows(field, direction): any[] {
        const groupedData = this.table.groupArrayBy(this.rows, this.config.grouping.field);
        groupedData.forEach(item => {
            item.value = this.sortArray(item.value, field, direction);
        });
        return groupedData;
    }

    /**
     * Sorts array based on a criteria
     * @param items The items that need sorting
     * @param field The field that is going to be used as a key for obtaining the value from the row object
     * @param direction The direction, ascending or descending
     */
    private sortArray(items: any[], field: TableColumnProp, direction: SortDirection) {
        return items.sort((item1, item2) => {
            let firstItem, secondItem;
            if (direction === SortDirection.asc) {
                firstItem = item1[field];
                secondItem = item2[field];
            } else {
                firstItem = item2[field];
                secondItem = item1[field];
            }

            return firstItem < secondItem ? -1 : firstItem === secondItem ? 0 : 1;
        });
    }
}
