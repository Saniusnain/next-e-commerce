import React from 'react';
import { Nav, NavLink } from '@/components/Nav';

// export const dynamic = 'forced-dynamic';
const AdminLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Nav>
				<NavLink href='/admin'>Dasboard</NavLink>
				<NavLink href='/admin/products'>Products</NavLink>
				<NavLink href='/admin/users'>Users</NavLink>
				<NavLink href='/admin/orders'>Orders</NavLink>
			</Nav>
			<div className='container my-6 px-11'>{children}</div>
		</>
	);
};

export default AdminLayout;
