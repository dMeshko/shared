import { TableColumn, SortPropDir, SortDirection } from "@swimlane/ngx-datatable/src/types";

export interface ISortObject {
    column: TableColumn,
    newValue: SortDirection,
    oldValue: SortDirection,
    sorts: SortPropDir[];
}
