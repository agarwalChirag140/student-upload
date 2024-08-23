import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent {
  constructor(private router: Router) {}
  studentDetails:any = []
  successRecord:any=0
  failureRecord:any=0

  ngOnInit() {
    let studentDetails = JSON.parse(sessionStorage.getItem('studentRecords') || '')
    this.studentDetails = studentDetails
    this.getSuccessFailureRecord()
  }

  getSuccessFailureRecord() {
    this.studentDetails.forEach((item:any) => {
      if(item.hasOwnProperty('errors')) {
         this.failureRecord += 1
      } else {
        this.successRecord += 1
      }
    })
  }


  // Define the data for your table
  dataSource = [
    { employeeDetails: 'Employee Details', success: 20, failure: 0 },
    // More rows can be added here
  ];

  // Specify the columns to be displayed in the table
  displayedColumns: string[] = ['employeeDetails', 'totalRecord', 'success', 'failure' ];

  navigateToUpload() {
    this.router.navigate(['/upload'])
    sessionStorage.removeItem('/upload')
  }
}
