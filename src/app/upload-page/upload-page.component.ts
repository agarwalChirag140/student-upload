import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent {
  errorMessage: string | null = null;
  parsedData: any[] = [];
  isFileValid: boolean = false;
  fileName: string | null = null; // Holds the selected file name
  csvUrl: string = ''; // Holds the URL value

  constructor(private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      this.errorMessage = null;
      this.fileName = file.name;  // Set the file name
      this.parseCSV(file);
    } else {
      this.errorMessage = 'Invalid file format. Please upload a CSV file.';
      this.isFileValid = false;
      this.fileName = null;  // Reset the file name if the upload fails
    }
  }

  parseCSV(file: any) {
    Papa.parse(file, {
      complete: (result) => {
        this.parsedData = result.data;
        console.log("Parsed Data ", this.parsedData)
        this.validateCSV();
      },
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true // Automatically convert numeric strings to numbers
    });
  }

  uploadFromUrl() {
    if (this.csvUrl && this.csvUrl.endsWith('.csv')) {
      // Fetch and parse the CSV from URL (example using fetch API)
      fetch(this.csvUrl)
        .then(response => response.text())
        .then(csvText => {
          Papa.parse(csvText, {
            complete: (result) => {
              this.parsedData = result.data;
              this.validateCSV();
              this.fileName = 'Uploaded from URL'; // Indicate that the file was uploaded via URL
            },
            header: true,
            skipEmptyLines: true
          });
        })
        .catch(error => {
          this.errorMessage = 'Failed to load CSV from URL.';
          this.isFileValid = false;
          this.fileName = null;
        });
    } else {
      this.errorMessage = 'Invalid URL. Please ensure it ends with ".csv".';
      this.fileName = null;
    }
  }

  validateCSV() {
    const validHeaders = ['Name', 'Email', 'Phone number', 'City', 'Address', 'GPA'];
    const headers = Object.keys(this.parsedData[0]);

    if (headers.length !== validHeaders.length || !headers.every(h => validHeaders.includes(h))) {
      // debugger
      this.errorMessage = 'Invalid CSV headers. Please ensure the CSV matches the required format.';
      this.isFileValid = false;
    } else {
      // debugger
      this.isFileValid = true;
    }
  }

  goToPreview() {
    if (this.isFileValid) {
      console.log("Parsed Data ", this.parsedData)
      sessionStorage.setItem('csvData', JSON.stringify(this.parsedData));
      this.router.navigate(['/preview']);
    }
  }
}

