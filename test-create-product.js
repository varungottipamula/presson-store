const fetch = require('node-fetch');

async function testCreateProduct() {
    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: "Test Discount Product",
                description: "Test description",
                price: 1000,
                category: "nails",
                images: ["/nails/nail1.jpg"],
                stock: 10
            }),
        });

        const data = await response.json();
        console.log('Created Product:', data);

        if (data.originalPrice === 1500) {
            console.log('SUCCESS: originalPrice was automatically set to 1500 (1000 + 500)');
        } else {
            console.log('FAILURE: originalPrice is', data.originalPrice);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testCreateProduct();
