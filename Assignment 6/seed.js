const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected for Seeding');

        // Check if a user exists to be the seller
        let user = await User.findOne();
        if (!user) {
            // Create a dummy user if none exists
            user = await User.create({
                name: 'Seed User',
                email: 'seed@example.com',
                password: 'password123',
                phone: '1234567890'
            });
            console.log('Created dummy user');
        }

        // Clear existing products
        await Product.deleteMany();
        console.log('Cleared existing products');

        const dummyProducts = [
            {
                title: 'Used iPhone 12',
                price: 500,
                category: 'Mobiles',
                description: 'Good condition, 64GB, minor scratches on the back.',
                imageUrl: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&auto=format&fit=crop&q=60',
                seller: user._id
            },
            {
                title: 'Honda Civic 2015',
                price: 12000,
                category: 'Cars',
                description: 'Well maintained, 80k miles, clean title.',
                imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60',
                seller: user._id
            },
            {
                title: 'Sony Bravia 55" 4K TV',
                price: 400,
                category: 'Electronics',
                description: 'Works perfectly, upgraded to a larger size.',
                imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60',
                seller: user._id
            },
            {
                title: 'IKEA Sofa 3-seater',
                price: 150,
                category: 'Furniture',
                description: 'Comfortable sofa, slightly used. Gray color.',
                imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60',
                seller: user._id
            }
        ];

        await Product.insertMany(dummyProducts);
        console.log('Dummy products seeded successfully');

        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
