import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title }) => {
    return (
        <div className="py-10">
            {title && (
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-4xl font-bold font-titleFont text-primeColor mb-2 text-center">{title}</h2>
                    <div className="w-20 h-1 bg-indigo rounded-full"></div>
                </div>
            )}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
