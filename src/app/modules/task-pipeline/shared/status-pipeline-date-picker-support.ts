import { NativeDateAdapter } from '@angular/material';

export class DatePickerSupport extends NativeDateAdapter {
    useUtcForDisplay = true;
    parse(value: any): Date | null {
        console.log('parse: ', value)
        if (typeof value === 'string') {
            return new Date(value);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);

    }

    format(date: Date, displayFormat: any): string {
            // date -> string
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            const value = year+'-'+month+'-'+day;
            // console.log('format: ', date, value)
            return value
    }


}