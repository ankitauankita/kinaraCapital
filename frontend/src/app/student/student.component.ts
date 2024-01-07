import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../APIService/api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  filterForm: FormGroup;
  studentData: any;
  errorFlag: boolean = false;
  errorMessage: string = 'No records found';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.filterForm = this.fb.group({
      name: [''],
      college: [''],
      branch: [''],
      CGPA: [''],
      city: [''],
      pageSize: [''],
      pageNumber: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.errorFlag = false;
      this.studentData = await this.getAllStudentData();
    } catch (error) {
      console.log('Error occoured while loading the page.', error);
    }
  }

  async getAllStudentData(): Promise<any> {
    return (await this.apiService.getAllRecords()).toPromise();
  }

  async applyFilters() {
    this.errorFlag = false;
    this.studentData = await this.getData(this.filterForm.value);
  }

  async getData(filter: any): Promise<any> {
    let res = (await this.apiService.getFilterData(filter))
      .toPromise()
      .catch((error) => {
        console.log('Error occoured while fetching the data.', error);
        this.errorFlag = true;
      });
    return res;
  }

  resetFilters() {
    this.filterForm.reset();
  }
}
