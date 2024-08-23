import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csv-preview-page',
  templateUrl: './csv-preview-page.component.html',
  styleUrls: ['./csv-preview-page.component.css']
})
export class CsvPreviewPageComponent implements OnInit {

  constructor(private router: Router) {}

  dataSource: any[] = [];
  displayedColumns: string[] = ['Name', 'Email', 'Phone number', 'City', 'Address', 'GPA'];
  errors: string[] = [];

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('csvData');
    if (storedData) {
      this.dataSource = JSON.parse(storedData);
      console.log("Data Source ", this.dataSource, this.displayedColumns)
      this.validateData(this.dataSource);
    }
  }

  validateData(data: any[]): void {
    let rowErrors:any = []

    data.forEach((row:any, rowIndex:any) => {
      let obj:any = {}
      this.displayedColumns.forEach((item:any) => {
        const columnName = item
        const columnValue = row[columnName]
        console.log('Column Name ', columnName, columnValue)
        if(columnName === 'Name' && typeof columnValue !== 'string') {
           obj['Name'] = !columnValue ? `${columnName} can't be empty` : `${columnName} should be a string`
        } else if(columnName === 'City' && typeof columnValue !== 'string') {
          obj['City'] = !columnValue ? `${columnName} can't be empty` :  `${columnName} should be a string`
        } 
        else if(columnName === 'Address' && typeof columnValue !== 'string') {
          obj['Address'] = !columnValue ? `${columnName} can't be empty` :  `${columnName} should be a string`
        } else if(columnName === 'GPA' && !columnValue) {
          obj['GPA'] = `${columnName} can't be empty`
        } else if(columnName === 'GPA' && (isNaN(columnValue) || parseFloat(columnValue) < 0 || parseFloat(columnValue) > 10)) {
          obj['GPA'] = !columnValue ? `${columnName} can't be empty` : `${columnName} value must be between 0 and 10`
        } else if (columnName === 'Email' && (!columnValue || !/^\S+@\S+\.\S+$/.test(columnValue))) {
          obj['Email'] = !columnValue ? `${columnName} can't be empty` : `Invalid email format in ${columnName}`;
        } else if(columnName === 'Phone number' && !columnValue) {
          obj['PhoneNumbr'] = `${columnName} can't be empty`
        } else if(columnName === 'Phone number' && columnValue && ((!Number.isInteger(columnValue)) || columnValue.toString().length !== 10)) {
          // debugger
          obj['PhoneNumbr'] = `Invalid Phone Number`
        }
      })

      let errorKeys = Object.keys(obj)

      if(errorKeys.length > 0) {
         data[rowIndex]['errors'] = obj
      }
      
    })

    

    this.dataSource = data
    console.log('Data source ', this.dataSource)
  }

  generateSummaryReport() {
    sessionStorage.setItem('studentRecords', JSON.stringify(this.dataSource))
    this.router.navigate(['/summary']);
  }
  
}


// CsvPreviewPageComponent

