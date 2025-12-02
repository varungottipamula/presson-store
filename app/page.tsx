import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { ArrowRight, Package, Check, Shield } from 'lucide-react';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

async function getBestSellers() {
  await dbConnect();
  // Get random products from nails category only
  const products = await Product.aggregate([
    { $match: { category: 'nails' } },
    { $sample: { size: 4 } }
  ]);

  // Serialize MongoDB documents
  return (products || []).map(p => ({
    ...p,
    _id: p._id.toString(),
    images: p.images || [],
    createdAt: p.createdAt?.toISOString?.() || new Date().toISOString(),
    updatedAt: p.updatedAt?.toISOString?.() || new Date().toISOString(),
  }));
}

async function getCollectionProducts() {
  await dbConnect();
  // Get random products from different categories (excluding nails)
  const products = await Product.aggregate([
    { $match: { category: { $ne: 'nails' } } },
    { $sample: { size: 8 } }
  ]);

  // Serialize MongoDB documents
  return (products || []).map(p => ({
    ...p,
    _id: p._id.toString(),
    images: p.images || [],
    createdAt: p.createdAt?.toISOString?.() || new Date().toISOString(),
    updatedAt: p.updatedAt?.toISOString?.() || new Date().toISOString(),
  }));
}

export default async function Home() {
  const bestSellers = (await getBestSellers()) || [];
  const collectionProducts = (await getCollectionProducts()) || [];

  const categories = [
    {
      name: 'Press on Nails',
      slug: 'nails',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Bag',
      slug: 'bag',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Watch',
      slug: 'watch',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Hair Rubber',
      slug: 'hair-rubber',
      image: '/hair_rubber_category_1764436899418.png',
    },
    {
      name: 'Bracelet',
      slug: 'bracelet',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Rings',
      slug: 'rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Necklace',
      slug: 'necklace',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Earrings',
      slug: 'earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Glasses',
      slug: 'glasses',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Phone Cover',
      slug: 'phone-cover',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Hairclip',
      slug: 'hairclip',
      image: '/hairclip_category_1764436883173.png',
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - HD Quality */}
        <div className="absolute inset-0">
          <img
            src="/hero-nails-hd.png"
            alt="Beautiful press-on nails"
            className="w-full h-full object-cover"
          />
          {/* Very light overlay for text readability only */}
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight font-[family-name:var(--font-poppins)] bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm whitespace-nowrap px-4">
              Instant Glam, Zero Salon Time.
            </h1>

            <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto font-medium drop-shadow-sm">
              Our Press nails blend style and durability for a perfect manicure experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/shop/nails"
                className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Seller Section */}
      {bestSellers.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 font-[family-name:var(--font-playfair)]">
                BestSeller
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Bring out your bold side with our best-selling collections. Easy to apply, long-lasting, and salon-perfect – because your nails deserve the spotlight.
              </p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto pb-6 sm:pb-0 scrollbar-hide">
              {bestSellers.map((product: any) => (
                <Link
                  key={product._id.toString()}
                  href={`/product/${product._id.toString()}`}
                  className="group min-w-[260px] sm:min-w-0 snap-center"
                >
                  <div className="bg-white rounded-[2rem] sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    <div className="aspect-[4/5] sm:aspect-square bg-gradient-to-br from-pink-50 to-rose-50 relative overflow-hidden">
                      <ProductImage
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.stock <= 0 && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          Sold Out
                        </div>
                      )}
                    </div>
                    <div className="p-5 text-center">
                      <p className="text-xs text-rose-500 font-semibold mb-1 uppercase tracking-wider">{product.category}</p>
                      <h3 className="font-bold text-gray-900 mb-2 text-base line-clamp-2">{product.name}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-xl font-black text-gray-900">
                          ₹{(product.price || 0).toLocaleString()}
                        </p>
                        {product.originalPrice && product.price && product.originalPrice > product.price && (
                          <>
                            <p className="text-sm text-gray-400 line-through">
                              ₹{(product.originalPrice || 0).toLocaleString()}
                            </p>
                            <span className="text-xs font-bold text-red-500">
                              -{Math.round((((product.originalPrice || 0) - (product.price || 0)) / (product.originalPrice || 1)) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/shop/nails"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-bold text-base hover:shadow-xl hover:scale-105 transition-all"
              >
                Get It <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Our Collection */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 font-[family-name:var(--font-playfair)]">
              Our Collection
            </h2>
            <p className="text-gray-600 text-lg">Explore our curated collections</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto pb-6 sm:pb-0 scrollbar-hide">
            {collectionProducts.map((product: any) => (
              <Link
                key={product._id.toString()}
                href={`/product/${product._id.toString()}`}
                className="group min-w-[260px] sm:min-w-0 snap-center"
              >
                <div className="bg-white rounded-[2rem] sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="aspect-[4/5] sm:aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                    <ProductImage
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.stock <= 0 && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        Sold Out
                      </div>
                    )}
                  </div>
                  <div className="p-5 text-center">
                    <p className="text-xs text-rose-500 font-semibold mb-1 uppercase tracking-wider">{product.category}</p>
                    <h3 className="font-bold text-gray-900 mb-2 text-base line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-xl font-black text-gray-900">
                        ₹{(product.price || 0).toLocaleString()}
                      </p>
                      {product.originalPrice && product.price && product.originalPrice > product.price && (
                        <>
                          <p className="text-sm text-gray-400 line-through">
                            ₹{(product.originalPrice || 0).toLocaleString()}
                          </p>
                          <span className="text-xs font-bold text-red-500">
                            -{Math.round((((product.originalPrice || 0) - (product.price || 0)) / (product.originalPrice || 1)) * 100)}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop/nails"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-bold text-base hover:bg-gray-800 transition-all"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why We Slay Section */}
      <section className="py-20 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 font-[family-name:var(--font-playfair)]">
              Why We Slay
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Welcome to Jerry Glam Store — where nails meet next-level glam!
            </h3>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                We're all about making your mani game strong without breaking the bank or your schedule. Our press-on nails are made for trendsetters, go-getters, and anyone who loves a quick glow-up without the salon drama.
              </p>
              <p>
                From viral cat-eye vibes to chic minimal looks, we create styles that slay every occasion. Easy to apply, reusable, and totally Insta-worthy — because nails should be as fierce as you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">FLAT RATE SHIPPING</h3>
              <p className="text-gray-600">₹99 on all orders</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">SECURE PAYMENT</h3>
              <p className="text-gray-600">100% Secure Online Payment</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Quality Guarantee</h3>
              <p className="text-gray-600">Premium quality assured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 font-[family-name:var(--font-playfair)]">
              Shop By Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 max-w-7xl mx-auto">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="relative w-24 h-24 mb-3 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-rose-300 transition-all duration-300 shadow-md group-hover:shadow-xl">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-center font-semibold text-gray-800 group-hover:text-rose-500 transition-colors text-sm">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
