import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import fs from 'fs/promises';
export async function GET(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } }
) {
	const data = await db.product.findUnique({
		where: { id },
		select: { filePath: true, name: true },
	});
	if (data === null) return null;
	const { size } = await fs.stat(data.filePath);
	const file = await fs.readFile(data.filePath);
	const extension = data.filePath.split('.').pop();

	return new NextResponse(file, {
		headers: {
			'Content-Disposition': `attachment; filename="${data.name}.${extension}"`,
			'Content-Length': size.toString(),
		},
	});
}
