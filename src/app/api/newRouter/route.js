// app/api/newRouter/route.js

import { NextResponse } from 'next/server';

const DIRECTUS_URL = 'http://10.10.20.77:8057';
const COLLECTION = 'tin_tuc';

export async function GET() {
    try {
        // Lấy 6 tin mới nhất, sort theo date_created giảm dần
        const res = await fetch(
            `${DIRECTUS_URL}/items/${COLLECTION}?fields=id,Ten,Tom_Tat,anh_dai_dien.id,date_created&sort=-date_created&limit=6`,
            { cache: 'no-store' }
        );

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch from Directus' }, { status: 500 });
        }

        const apiData = await res.json();
        const data = apiData.data || [];

        if (data.length === 0) {
            return NextResponse.json({ featuredImage: '', news: [] });
        }

        // Tin mới nhất (data[0]) làm ảnh featured
        const featuredItem = data[0];
        const featuredImageId = featuredItem.Anh_Dai_Dien?.id;
        const featuredImage = featuredImageId
            ? `${DIRECTUS_URL}/assets/${featuredImageId}`
            : '/IMAGE/placeholder.jpg'; // fallback nếu không có ảnh (bạn tạo ảnh placeholder trong public)

        const formattedData = {
            featuredImage,
            news: data.map(item => ({
                id: item.id,
                title: item.Ten || 'Không có tiêu đề',
                description: item.Tom_Tat || 'Không có tóm tắt',
            })),
        };

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}