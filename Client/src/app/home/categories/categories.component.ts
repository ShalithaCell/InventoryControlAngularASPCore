import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CategoryServiceService} from '../../services/category-service.service';
import {MatDialog} from '@angular/material/dialog';
import {CategoryAddDialogComponent} from '../../dialogs/category-add-dialog/category-add-dialog.component';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

class Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  title = 'Categories';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categories: Category[];

  id = 0;
  description = '';
  name = '';

  constructor(
    private  categoryServices: CategoryServiceService,
    public dialog: MatDialog,
    private toastr: ToastrService)
  { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.categoryServices.GetCategories().subscribe((resp: any) => {

          this.categories = resp.data;
          console.log(resp.data);

          callback({
            recordsTotal: resp.data.length,
            recordsFiltered: 1,
            data: []
          });
        });
      },
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'description' },
        { data: '' },
        { data: '' }]
    };
  }

  openDialog(action): void {
    const dialogRef = this.dialog.open(CategoryAddDialogComponent, {
      width: '30%',
      data: {id : this.id, name: this.name, description: this.description, typeAction : action}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.type === 'new'){
        this.name = result.name;
        this.description = result.description;
        this.saveCategory();
      }

      if (result.type === 'update'){
        this.id = result.id;
        this.name = result.name;
        this.description = result.description;
        this.updateCategory();
      }
    });
  }

  editCategory(id, name, description): void {
    this.id = id;
    this.name = name;
    this.description = description;
    this.openDialog('update');
  }

  saveCategory(): void {
    this.categoryServices.SaveCategory(this.name, this.description).subscribe((resp: any) => {
      this.toastr.success('Category Added Successfully', 'info');
      this.rerender();
    });
  }

  removeCategory(id): void {
    this.categoryServices.RemoveCategory(id).subscribe((resp: any) => {
      this.toastr.success('Category Removed Successfully', 'info');
      this.rerender();
    }, (error: HttpErrorResponse) => {
      if (error.status === 409){
        this.toastr.error('Category cannot be deleted. It references from products.', 'info');
      }
    });
  }

  updateCategory(): void {
    this.categoryServices.UpdateCategory(this.id, this.name, this.description).subscribe((resp: any) => {
      this.toastr.success('Category Updated Successfully', 'info');
      this.rerender();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
