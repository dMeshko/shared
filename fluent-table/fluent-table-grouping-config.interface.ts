export interface IFluentTableGroupingConfig {
    field: string;
    expandGroups?: boolean;
    onGroupExpand?: (group: { [key: string]: any }) => void;
    onGroupCollapse?: (group: { [key: string]: any }) => void;
}
