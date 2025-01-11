import React from 'react'
import PageHeader from '../_components/PageHeader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const AdminProductsPage = () => {
  return (
		<>
			<div className='flex justify-between items-center gap-4'>
				<PageHeader>Prodcuts</PageHeader>
				<Button>
					<Link href='/admin/products/new'>Add Product</Link>
				</Button>
			</div>
            <ProductsTable />
		</>
	);
}

export default AdminProductsPage;

const ProductsTable = () => {
    return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-0'>
							<span className='sr-only'>Available for Purchase</span>
						</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Orders</TableHead>
						<TableHead className='w-0'>
							<span className='sr-only'>Actions</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
 						<TableCell>Paid</TableCell>
						<TableCell>Credit Card</TableCell>
 					</TableRow>
				</TableBody>
			</Table>
		);

};