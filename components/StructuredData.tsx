'use client';

interface StructuredDataProps {
    type: 'organization' | 'website' | 'product';
    data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
    const getSchema = () => {
        switch (type) {
            case 'organization':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'Jerry Glam Store',
                    description: 'Premium press-on nails and fashion accessories store',
                    url: 'https://jerrysglamstore.com',
                    logo: 'https://jerrysglamstore.com/logo.png',
                    sameAs: [
                        // Add your social media URLs here when available
                        // 'https://www.facebook.com/jerrysglamstore',
                        // 'https://www.instagram.com/jerrysglamstore',
                    ],
                    contactPoint: {
                        '@type': 'ContactPoint',
                        contactType: 'Customer Service',
                        availableLanguage: 'English',
                    },
                };

            case 'website':
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: 'Jerry Glam Store',
                    url: 'https://jerrysglamstore.com',
                    description: 'Shop premium press-on nails, bags, watches, jewelry, and fashion accessories',
                    potentialAction: {
                        '@type': 'SearchAction',
                        target: 'https://jerrysglamstore.com/shop?q={search_term_string}',
                        'query-input': 'required name=search_term_string',
                    },
                };

            case 'product':
                if (!data) return null;
                return {
                    '@context': 'https://schema.org',
                    '@type': 'Product',
                    name: data.name,
                    description: data.description || 'Premium quality product from Jerry Glam Store',
                    image: data.images?.[0] || '',
                    sku: data._id,
                    offers: {
                        '@type': 'Offer',
                        url: `https://jerrysglamstore.com/product/${data._id}`,
                        priceCurrency: 'INR',
                        price: data.price,
                        availability: data.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                        seller: {
                            '@type': 'Organization',
                            name: 'Jerry Glam Store',
                        },
                    },
                    brand: {
                        '@type': 'Brand',
                        name: 'Jerry Glam Store',
                    },
                };

            default:
                return null;
        }
    };

    const schema = getSchema();
    if (!schema) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
