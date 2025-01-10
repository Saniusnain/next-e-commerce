import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { db } from '@/db/db';

const getSalesData = async () => {
	const data = await db.order.aggregate({
		_sum: { pricePaidInCents: true },
		_count: true,
	});

	return {
		amount: (data._sum.pricePaidInCents || 0) / 100,
		numberOfSales: data._count,
	};
};

const getUserData = async () => {
    const [userCount, orderData] = await Promise.all([db.user.count(), db.order.aggregate({
		_sum: { pricePaidInCents: true },
	})]);

	return {
		userCount,
        averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
	};
};

const getProductData = async () => {

const [activeCount, inActiveCount] =  await Promise.all([db.product.count({where: { isAvailableForPurchase: true}}),
    db.product.count({where: { isAvailableForPurchase: false}})]);

	return {
		activeCount,
        inActiveCount,
	};
};

const AdminDashboard = async () => {
    const [salesData, userData, productData] = await Promise.all([getSalesData(), getUserData(), getProductData()]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			<DashboardCard
				title='Sales'
				subtitle={`${salesData.numberOfSales} Orders`}
				body={`$ ${salesData.amount}`}
			/>

			<DashboardCard
				title='Customer'
				subtitle={`$ ${userData.averageValuePerUser} Average Value`}
				body={`${userData.userCount}`}
			/>

			<DashboardCard
				title='Active Products'
				subtitle={`${productData.inActiveCount} Inactive`}
				body={`${productData.activeCount}`}
			/>
		</div>
	);
};

export default AdminDashboard;

type DashboardProps = {
	title: string;
	subtitle: string;
	body: string;
};

const DashboardCard = ({ title, subtitle, body }: DashboardProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{subtitle}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{body}</p>
			</CardContent>
		</Card>
	);
};
