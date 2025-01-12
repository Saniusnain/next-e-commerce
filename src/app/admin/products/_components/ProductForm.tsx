'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useActionState } from 'react';
import { addProduct, updateProduct } from '../../_actions/products';
import { useFormStatus } from 'react-dom';
import { Product } from '@prisma/client';
import Image from 'next/image';
const ProductForm = ({ product }: { product?: Product | null }) => {
	console.log('product is 000000000', product);
	const [error, action] = useActionState(
		product === null || product === undefined
			? addProduct
			: updateProduct.bind(null, product?.id as string),
		{}
	);
	const [priceInCents, setPriceInCents] = React.useState<number | undefined>(
		product?.priceInCents || 0
	);

	return (
		<form action={action} className='space-y-8'>
			<div className='space-y-2'>
				<Label htmlFor='name'>Name</Label>
				<Input
					type='text'
					id='name'
					name='name'
					required
					defaultValue={product?.name || ''}
				/>
				{error.name && <div className='text-destructive'>{error.name}</div>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='priceInCents'>Price in cents</Label>
				<Input
					type='number'
					id='priceInCents'
					name='priceInCents'
					required
					value={priceInCents || ''}
					onChange={(e) => setPriceInCents(Number(e.target.value))}
				/>
				{error.priceInCents && (
					<div className='text-destructive'>{error.priceInCents}</div>
				)}
			</div>

			<div className='text-muted-foreground'>${(priceInCents || 0) / 100}</div>

			<div className='space-y-2'>
				<Label htmlFor='description'>Description</Label>
				<Textarea
					id='description'
					name='description'
					required
					defaultValue={product?.description || ''}
				/>
				{error.description && (
					<div className='text-destructive'>{error.description}</div>
				)}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='file'>File</Label>
				<Input type='file' id='file' name='file' required={product == null} />
				{product !== null && (
					<div className='text-muted-foreground'>{product?.filePath}</div>
				)}
				{error.file && <div className='text-destructive'>{error.file}</div>}
			</div>

			<div className='space-y-2'>
				<Label htmlFor='image'>Image</Label>
				<Input type='file' id='image' name='image' required={product == null} />
				{product?.imagePath && (
					<Image
						src={product && product?.imagePath}
						height='200'
						width='200'
						alt='product image'
					/>
				)}
				{error.image && <div className='text-desctructive'>{error.image}</div>}
			</div>
			<SubmitButton />
		</form>
	);
};

export default ProductForm;

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button type='submit' disabled={pending}>
			{pending ? 'Saving' : 'Save'}
		</Button>
	);
}
