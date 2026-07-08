// app/admin/page.tsx
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Booking from "@/models/Booking";
import Order from "@/models/Order";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await connectDB();

  const [products, bookings, orders] = await Promise.all([
    Product.find().lean(),
    Booking.find().sort({ createdAt: -1 }).limit(10).lean(),
    Order.find().sort({ createdAt: -1 }).limit(10).lean(),
  ]);

  return (
    <div className="space-y-6 text-xs">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      <section className="glass-card p-4 space-y-2">
        <h2 className="font-semibold">Products ({products.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="border-b border-white/20 text-white/60">
              <tr>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => (
                <tr key={p._id} className="border-b border-white/10">
                  <td className="py-1 pr-4">{p.name}</td>
                  <td className="py-1 pr-4">{p.type}</td>
                  <td className="py-1 pr-4">{p.category}</td>
                  <td className="py-1 pr-4">₹{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-card p-4 space-y-2">
        <h2 className="font-semibold">Latest Bookings</h2>
        <ul className="space-y-1">
          {bookings.map((b: any) => (
            <li
              key={b._id}
              className="flex justify-between border-b border-white/10 pb-1"
            >
              <span>
                {b.name} • {b.service}
              </span>
              <span className="text-white/60">
                {b.date} {b.time}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-card p-4 space-y-4">
        <h2 className="text-sm font-semibold border-b border-white/20 pb-2">Latest Orders ({orders.length})</h2>
        <div className="space-y-4">
          {orders.map((o: any) => {
            // Support both schemas: 'products' array vs 'items' array
            const orderProducts = o.products
              ? o.products.map((p: any) => ({
                  productId: p.product,
                  name: p.name,
                  qty: p.quantity,
                  price: p.price,
                  size: p.size,
                }))
              : o.items
              ? o.items.map((item: any) => ({
                  productId: item.productId,
                  name: item.name,
                  qty: item.qty,
                  price: item.price,
                  size: "",
                }))
              : [];

            // Support both schemas: 'user' object vs top-level fields
            const customerName = o.user?.name || o.customerName || "No Name";
            const customerEmail = o.user?.email || o.customerEmail || "";
            const customerPhone = o.user?.phone || o.customerPhone || "";
            const shippingAddress = o.user?.address || o.shippingAddress || "";
            const orderDate = o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "";

            // Helper to get image URL for the product from Products model
            const getProductImgUrl = (prodId: any) => {
              if (!prodId) return "";
              const match = products.find((p: any) => String(p._id) === String(prodId));
              return match?.images?.[0] || "";
            };

            return (
              <div key={o._id} className="border-b border-white/10 pb-4 last:border-none space-y-3">
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-[11px] text-pink-400 select-all">Order ID: {String(o._id)}</span>
                    <div className="text-[10px] text-white/50">{orderDate}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-medium uppercase tracking-wider">
                      {o.status || o.paymentStatus || "pending"}
                    </span>
                    <div className="text-xs font-semibold text-white mt-1">₹{o.totalAmount}</div>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="bg-white/5 rounded-lg p-2 space-y-1">
                  <div className="font-semibold text-white/90 text-[10px]">Customer Details:</div>
                  <div className="text-white/80">{customerName}</div>
                  <div className="text-white/60 text-[10px]">
                    {customerPhone && <span>Phone: {customerPhone} • </span>}
                    {customerEmail && <span>Email: {customerEmail}</span>}
                  </div>
                  {shippingAddress && (
                    <div className="text-white/60 text-[10px] italic mt-0.5">
                      Address: {shippingAddress}
                    </div>
                  )}
                </div>

                {/* Products List */}
                <div className="space-y-2">
                  <div className="font-semibold text-white/90 text-[10px]">Items Ordered:</div>
                  {orderProducts.length === 0 ? (
                    <div className="text-white/60 italic text-[10px]">No products detailed in database.</div>
                  ) : (
                    <div className="space-y-2 pl-1">
                      {orderProducts.map((p: any, idx: number) => {
                        const imgUrl = getProductImgUrl(p.productId);
                        return (
                          <div key={idx} className="flex gap-3 items-center">
                            {/* Product thumbnail */}
                            <div className="h-9 w-9 min-w-[36px] rounded bg-white/10 overflow-hidden border border-white/15 flex items-center justify-center">
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt={p.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-[10px] text-white/40">📦</span>
                              )}
                            </div>
                            {/* Product Name & Quantity details */}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white text-[11px] truncate">{p.name}</div>
                              <div className="text-[10px] text-white/50">
                                Qty: {p.qty} • ₹{p.price} each {p.size && <span>• Size: {p.size}</span>}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[11px] font-semibold text-white">₹{p.price * p.qty}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
