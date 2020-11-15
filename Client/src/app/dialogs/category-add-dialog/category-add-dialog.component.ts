import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from '../../delegate';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-category-add-dialog',
  templateUrl: './category-add-dialog.component.html',
  styleUrls: ['./category-add-dialog.component.css']
})
export class CategoryAddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoryAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}
