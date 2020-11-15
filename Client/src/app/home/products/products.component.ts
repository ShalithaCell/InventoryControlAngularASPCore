import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {CategoryServiceService} from '../../services/category-service.service';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../services/product.service';
import {CategoryAddDialogComponent} from '../../dialogs/category-add-dialog/category-add-dialog.component';
import {ProductAddDialogComponent} from '../../dialogs/product-add-dialog/product-add-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';

class Product {
  id: number;
  name: string;
  description: string;
  categoryID: number;
  category: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  title = 'Products';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  products: Product[];

  id = 0;
  description = '';
  name = '';
  categoryID = 0;

  constructor(private  productServices: ProductService,
              public dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.productServices.GetProducts().subscribe((resp: any) => {

          this.products = resp.data;
          console.log(resp.data);

          callback({
            recordsTotal: resp.data.length,
            recordsFiltered: 1,
            data: []
          });
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
      },
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'description' },
        { data: 'description' },
        { data: '' },
        { data: '' }]
    };
  }

  openDialog(action , categoryID): void {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      width: '30%',
      data: {id : this.id, name: this.name, description: this.description, typeAction : action, categoryID}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.type === 'new'){
        this.name = result.name;
        this.description = result.description;
        this.categoryID = result.categoryID;
        this.saveProduct();
        this.rerender();
      }

      if (result.type === 'update'){
        this.id = result.id;
        this.name = result.name;
        this.description = result.description;
        this.categoryID = result.categoryID;

        this.updateCategory();
        this.rerender();
      }
    });
  }

  saveProduct(): void {
    this.productServices.SaveProduct(this.name, this.description, this.categoryID).subscribe((resp: any) => {
      this.toastr.success('Product Added Successfully', 'info');
      // this.rerender();
    });
  }


  editCategory(id, name, description, categoryID): void {
    this.id = id;
    this.name = name;
    this.description = description;
    this.categoryID = categoryID;
    this.openDialog('update', categoryID);
  }

  updateCategory(): void {
    this.productServices.UpdateProduct(this.id, this.name, this.description, this.categoryID).subscribe((resp: any) => {
      this.toastr.success('Category Updated Successfully', 'info');
      this.rerender();
    });
  }

  removeProduct(id): void {
    this.productServices.RemoveProduct(id).subscribe((resp: any) => {
      this.toastr.success('Category Removed Successfully', 'info');
      this.rerender();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
