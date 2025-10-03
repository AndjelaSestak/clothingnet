import { Component, inject, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Order } from '../../shared/models/order';
import { AdminService } from '../../core/services/admin.service';
import { OrderParams } from '../../shared/models/orderParams';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatLabel, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { DialogService } from '../../core/services/dialog.service';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../../shared/components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    MatIcon,
    MatSelectModule,
    DatePipe,
    CurrencyPipe,
    MatLabel,
    MatTooltipModule,
    MatTabsModule,
    RouterLink,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'buyerEmail', 'orderDate', 'total', 'status', 'action'];
  dataSource = new MatTableDataSource<Order>([]);
  private adminService = inject(AdminService);
  private dialogService = inject(DialogService);
  orderParams = new OrderParams();
  totalItems = 0;
  statusOptions = ['All', 'PaymentReceived', 'PaymentMismatch', 'Refunded', 'Pending'];

  // Products
  displayedProductColumns: string[] = ['id', 'name', 'price', 'brand', 'type', 'quantityInStock', 'actions'];
  productDataSource = new MatTableDataSource<Product>([]);
  productParams = new ShopParams();
  totalProducts = 0;

  //private adminService = inject(AdminService);
  //private dialogService = inject(DialogService);
  private snackbar = inject(SnackbarService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadOrders();
    //
    this.loadProducts();
  }

  loadOrders() {
    this.adminService.getOrders(this.orderParams).subscribe({
      next: response => {
        if (response.data) {
          this.dataSource.data = response.data;
          this.totalItems = response.count;
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.orderParams.pageNumber = event.pageIndex + 1;
    this.orderParams.pageSize = event.pageSize;
    this.loadOrders();
  }

  onFilterSelect(event: MatSelectChange) {
    this.orderParams.filter = event.value;
    this.orderParams.pageNumber = 1;
    this.loadOrders();
  }

  async openConfirmDialog(id: number) {
    const confirmed = await this.dialogService.confirm(
      'Confirm refund',
      'Are you sure you want to issue this refund? This cannot be undone'
    )

    if (confirmed) this.refundOrder(id);
  }

  refundOrder(id: number) {
    this.adminService.refundOrder(id).subscribe({
      next: order => {
        this.dataSource.data = this.dataSource.data.map(o => o.id === id ? order : o)
      }
    })
  }

   // PRODUCT METHODS
  loadProducts() {
    this.adminService.getProducts(this.productParams).subscribe({
      next: response => {
        if (response.data) {
          this.productDataSource.data = response.data;
          this.totalProducts = response.count;
        }
      }
    });
  }

  onProductPageChange(event: PageEvent) {
    this.productParams.pageNumber = event.pageIndex + 1;
    this.productParams.pageSize = event.pageSize;
    this.loadProducts();
  }

  /*
  createProduct() {
    const newProduct = {
      name: prompt('Product Name:') || '',
      description: prompt('Description:') || '',
      price: Number(prompt('Price:') || '0'),
      pictureUrl: prompt('Picture URL:') || '',
      type: prompt('Type:') || '',
      brand: prompt('Brand:') || '',
      quantityInStock: Number(prompt('Quantity:') || '0')
    };

    if (newProduct.name && newProduct.description) {
      this.adminService.createProduct(newProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.snackbar.success('Product created successfully');
        },
        error: (error) => {
          this.snackbar.error('Error creating product');
          console.error('Error creating product:', error);
        }
      });
    }
  }

  editProduct(product: Product) {
    const name = prompt('Product Name:', product.name);
    const description = prompt('Description:', product.description);
    const price = prompt('Price:', product.price.toString());
    const pictureUrl = prompt('Picture URL:', product.pictureUrl);
    const type = prompt('Type:', product.type);
    const brand = prompt('Brand:', product.brand);
    const quantityInStock = prompt('Quantity:', product.quantityInStock.toString());

    if (name !== null && description !== null) {
      const updatedProduct: Product = {
        ...product,
        name: name || product.name,
        description: description || product.description,
        price: Number(price) || product.price,
        pictureUrl: pictureUrl || product.pictureUrl,
        type: type || product.type,
        brand: brand || product.brand,
        quantityInStock: Number(quantityInStock) || product.quantityInStock
      };

      this.adminService.updateProduct(product.id, updatedProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.snackbar.success('Product updated successfully');
        },
        error: (error) => {
          this.snackbar.error('Error updating product');
          console.error('Error updating product:', error);
        }
      });
    }
  }*/


  createProduct() {
  // Otvaramo modal sa praznim podacima
  const dialogRef = this.dialog.open(ProductFormComponent, {
    width: '400px',
    data: null
  });

  dialogRef.afterClosed().subscribe(result => {
    // result sadrži vrednosti iz forme
    if (result && result.name && result.description) {
      const newProduct = {
        name: result.name,
        description: result.description,
        price: Number(result.price),
        pictureUrl: result.pictureUrl,
        type: result.type,
        brand: result.brand,
        quantityInStock: Number(result.quantityInStock)
      };

      this.adminService.createProduct(newProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.snackbar.success('Product created successfully');
        },
        error: (error) => {
          this.snackbar.error('Error creating product');
          console.error('Error creating product:', error);
        }
      });
    }
  });
}

editProduct(product: Product) {
  const dialogRef = this.dialog.open(ProductFormComponent, {
    width: '400px',
    data: product // prosleđujemo postojeći proizvod
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Kreiramo DTO bez id-a, jer backend već zna koji proizvod da update-uje preko URL-a
      const updatedProduct: Product = {
        ...product,
        name: result.name?.trim() || product.name,
        description: result.description?.trim() || product.description,
        type: result.type?.trim() || product.type,
        brand: result.brand?.trim() || product.brand,
        price: Number(result.price ?? product.price),
        quantityInStock: Number(result.quantityInStock ?? product.quantityInStock),
        pictureUrl: result.pictureUrl?.trim() || product.pictureUrl
      };

      this.adminService.updateProduct(product.id, updatedProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.snackbar.success('Product updated successfully');
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.snackbar.error('Error updating the product');
        }
      });
    }
  });
}

  async deleteProduct(product: Product) {
    const confirmed = await this.dialogService.confirm(
      'Delete Product',
      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
    );

    if (confirmed) {
      this.adminService.deleteProduct(product.id).subscribe({
        next: () => {
          this.loadProducts();
          this.snackbar.success('Product deleted successfully');
        },
        error: (error) => {
          this.snackbar.error('Error deleting product');
          console.error('Error deleting product:', error);
        }
      });
    }
  }
}
