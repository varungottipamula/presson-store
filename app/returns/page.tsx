import { RefreshCw, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 font-[family-name:var(--font-playfair)]">
                        Returns & Exchanges
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Our goal is your complete satisfaction.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto space-y-12">

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-pink-50 rounded-2xl text-center">
                            <RefreshCw className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">7 Day Returns</h3>
                            <p className="text-sm text-gray-600">Easy return process</p>
                        </div>
                        <div className="p-6 bg-pink-50 rounded-2xl text-center">
                            <ShieldCheck className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">Secure</h3>
                            <p className="text-sm text-gray-600">Money back guarantee</p>
                        </div>
                        <div className="p-6 bg-pink-50 rounded-2xl text-center">
                            <HelpCircle className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">Support</h3>
                            <p className="text-sm text-gray-600">Dedicated assistance</p>
                        </div>
                    </div>

                    <div className="prose prose-pink max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Policy</h2>
                        <p className="text-gray-600 mb-6">
                            We have a 7-day return policy, which means you have 7 days after receiving your item to request a return.
                            To be eligible for a return, your item must be in the same condition that you received it, unworn or unused,
                            with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Start a Return</h2>
                        <p className="text-gray-600 mb-6">
                            To start a return, you can contact us at <span className="font-semibold text-pink-500">returns@jerryglam.com</span>.
                            If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package.
                            Items sent back to us without first requesting a return will not be accepted.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Damages and Issues</h2>
                        <p className="text-gray-600 mb-6">
                            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item,
                            so that we can evaluate the issue and make it right.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Exceptions / Non-returnable Items</h2>
                        <p className="text-gray-600 mb-6">
                            Certain types of items cannot be returned, like custom products (such as special orders or personalized items)
                            and personal care goods (such as beauty products). Please get in touch if you have questions or concerns about your specific item.
                            Unfortunately, we cannot accept returns on sale items or gift cards.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Exchanges</h2>
                        <p className="text-gray-600 mb-6">
                            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted,
                            make a separate purchase for the new item.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Refunds</h2>
                        <p className="text-gray-600 mb-6">
                            We will notify you once we've received and inspected your return, and let you know if the refund was approved or not.
                            If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time
                            for your bank or credit card company to process and post the refund too.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
