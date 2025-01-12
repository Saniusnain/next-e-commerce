import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { db } from '@/db/db';
import { Product } from '@prisma/client';
import React, { Suspense } from 'react';

async function getProducts() {
	return await db.product.findMany({
		where: { isAvailableForPurchase: true },
	});
}
const ProductsPage = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			<Suspense
				fallback={
					<>
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
					</>
				}
			>
				<ProductsSuspense />
			</Suspense>
		</div>
	);
};

export default ProductsPage;

async function ProductsSuspense() {
	const products = await getProducts();
	return products.map((product: Product) => (
		<ProductCard key={product.id} {...product} />
	));
}
