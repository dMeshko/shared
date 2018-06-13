import { URLSearchParams } from '@angular/http';

export class QueryStringBuilder {
    static buildParametersFromSearch<T>(obj: T): URLSearchParams {
        const params = new URLSearchParams();

        if (obj == null)
        {
            return params;
        }

        QueryStringBuilder.populateSearchParams(params, '', obj);

        return params;
    }

    private static populateArray<T>(params: URLSearchParams, prefix: string, val: Array<T>) {
        for (let index in val) {
            if (val.hasOwnProperty(index)) {
                const key = prefix + "[" + index + "]";
                const value: any = val[index];
                QueryStringBuilder.populateSearchParams(params, key, value);
            }
        }
    }

    private static populateObject<T>(params: URLSearchParams, prefix: string, val: T) {
        const objectKeys = Object.keys(val) as Array<keyof T>;

        for (let objKey of objectKeys) {
            const value = val[objKey];
            const key = prefix + (prefix ? `[${objKey}]` : objKey);

            QueryStringBuilder.populateSearchParams(params, key, value);
        }
    }

    private static populateSearchParams<T>(params: URLSearchParams, key: string, value: any) {
        if (value instanceof Array) {
            QueryStringBuilder.populateArray(params, key, value);
        }
        else if (value instanceof Date) {
            params.set(key, value.toISOString());
        }
        else if (value instanceof Object) {
            QueryStringBuilder.populateObject(params, key, value);
        }
        else {
            params.set(key, value.toString());
        }
    }

}
