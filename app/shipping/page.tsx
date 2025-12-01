import { Truck, Globe, Clock } from 'lucide-react';

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 font-[family-name:var(--font-playfair)]">
                        Shipping Policy
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Everything you need to know about our delivery process.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto space-y-12">

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-pink-50 rounded-2xl text-center">
                            <Truck className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">Free Shipping</h3>
                            <p className="text-sm text-gray-600">On orders over ₹999</p>
                        </div>
                        <div className="p-6 bg-pink-50 rounded-2xl text-center">
                            <Clock className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">Fast Delivery</h3>
                            <p className="text-sm text-gray-600">3-5 business days</p>
                        </div>
                        <div className="p-6 bg-pink-50 rounded-2xl text-center">
                            <Globe className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">Pan India</h3>
                            <p className="text-sm text-gray-600">Delivery across India</p>
                        </div>
                    </div>

                    <div className="prose prose-pink max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing</h2>
                        <p className="text-gray-600 mb-6">
                            All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
                            If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Rates & Delivery Estimates</h2>
                        <p className="text-gray-600 mb-6">
                            Shipping charges for your order will be calculated and displayed at checkout.
                        </p>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Delivery Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Standard Shipping</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">3-5 business days</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹49 (Free over ₹999)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Express Shipping</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">1-2 business days</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹149</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipment Confirmation & Order Tracking</h2>
                        <p className="text-gray-600 mb-6">
                            You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).
                            The tracking number will be active within 24 hours.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Damages</h2>
                        <p className="text-gray-600 mb-6">
                            Jerry Glam Store is not liable for any products damaged or lost during shipping. If you received your order damaged,
                            please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
