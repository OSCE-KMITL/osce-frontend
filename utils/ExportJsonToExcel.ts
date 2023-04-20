import { saveAs } from 'file-saver';
const XLSX = require('xlsx');

//data : {[key: string],[...]}

export const ExportJsonToExcel = (data: Object[], file_name: string) => {
    try {
        const dataToExport = data;
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), `${file_name}.xlsx`);
    } catch (error) {
        console.log('error export excel function : ' + error);
    }
};
