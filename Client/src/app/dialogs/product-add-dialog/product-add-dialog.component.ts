import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData, DialogDataProduct} from '../../delegate';
import {CategoryServiceService} from '../../services/category-service.service';
import {MatFormFieldControl} from '@angular/material/form-field';

class Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent implements OnInit {

  categories: Category[];
  selected = 0;

  constructor(public dialogRef: MatDialogRef<ProductAddDialogComponent>, private  categoryServices: CategoryServiceService,
              @Inject(MAT_DIALOG_DATA) public data: DialogDataProduct) { }

  ngOnInit(): void {
    this.categoryServices.GetCategories().subscribe((resp: any) => {
      this.selected = this.data.categoryID;
      this.categories = resp.data;
    });
  }

}
