export const nails = Array.from({ length: 53 }, (_, i) => {
    const id = i + 1;
    return {
        id,
        name: `Elegant Press-on Nails Style ${id}`,
        description: "Handcrafted, premium quality press-on nails. Easy to apply, reusable, and designed for a salon-perfect look in minutes. Includes adhesive tabs and mini file.",
        price: 499,
        originalPrice: 999,
        category: "nails",
        images: [`/nails/nail${id}.jpg`],
        stock: 50,
        sizes: ["XS", "S", "M", "L"],
        shapes: ["Almond", "Coffin", "Square", "Stiletto"],
        isFeatured: id <= 8,
    };
});
