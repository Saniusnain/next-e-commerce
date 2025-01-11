import React from 'react';
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { db } from '@/db/db';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import {
	ActiveToggleDropdownItem,
	DeleteDropdownItem,
} from './_components/ProductActions';

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
};

export default AdminProductsPage;

const ProductsTable = async () => {
	const products = await db.product.findMany({
		select: {
			id: true,
			name: true,
			priceInCents: true,
			isAvailableForPurchase: true,
			_count: { select: { orders: true } },
		},
		orderBy: { name: 'asc' },
	});

	if (products.length === 0) return <p>No products found</p>;
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
				{products.map((product) => (
					<TableRow key={product.id}>
						<TableCell>
							{product.isAvailableForPurchase ? (
								<>
									<span className='sr-only'>Available</span>
									<CheckCircle2 />
								</>
							) : (
								<>
									<span className='sr-only'>Unavailable</span>
									<XCircle className='stroke-destructive' />
								</>
							)}
						</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>${product.priceInCents}</TableCell>
						<TableCell>{product._count.orders}</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger>
									<MoreVertical />
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem asChild>
										<a download href={'/admin/products/${prodcut.id}/download'}>
											Download
										</a>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href={'/admin/products/${product.id}/edit'}>
											Edit
										</Link>
									</DropdownMenuItem>
									<ActiveToggleDropdownItem
										id={product.id}
										isAvailableForPurchase={product.isAvailableForPurchase}
									/>
									<DeleteDropdownItem
										id={product.id}
										disabled={product._count.orders > 0}
									/>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
