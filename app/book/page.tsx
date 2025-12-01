'use client';

import { useState } from 'react';

export default function BookingPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: 'custom-set',
        date: '',
        time: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    service: formData.service,
                    date: formData.date,
                    time: formData.time,
                    notes: formData.notes,
                }),
            });

            if (res.ok) {
                setIsSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: 'custom-set',
                    date: '',
                    time: '',
                    notes: ''
                });
            } else {
                alert('Failed to create booking. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto px-4 py-16 text-center max-w-md">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h1 className="text-2xl font-bold mb-2">Booking Request Sent!</h1>
                <p className="text-muted-foreground mb-8">
                    Thank you for booking with Jerry Glam. We will confirm your appointment shortly via email/phone.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
                >
                    Book Another
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-2 text-center">Book an Appointment</h1>
            <p className="text-center text-muted-foreground mb-8">
                Schedule a consultation or a custom press-on sizing session.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-xl border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md bg-background"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md bg-background"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md bg-background"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium">Service Type</label>
                    <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md bg-background"
                    >
                        <option value="custom-set">Custom Press-on Set Consultation</option>
                        <option value="sizing">Sizing Session</option>
                        <option value="bridal">Bridal Consultation</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium">Preferred Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md bg-background"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium">Preferred Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            required
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md bg-background"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">Additional Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md bg-background"
                        placeholder="Tell us about your design ideas..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
    );
}
