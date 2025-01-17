import React from 'react';
import { Nav, NavLink } from '@/components/Nav';

// export const dynamic = 'forced-dynamic';
const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Nav>
				<NavLink href='/'>Home</NavLink>
				<NavLink href='/products'>Products</NavLink>
				<NavLink href='/orders'>My Orders</NavLink>
			</Nav>
			<div className=' my-6 px-11'>{children}</div>
		</>
	);
};

export default Layout;
