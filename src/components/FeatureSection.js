import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeatureSection = () => {
    const features = [
        {
            title: "Premium Electronics",
            desc: "Experience the cutting edge of technology. From high-performance laptops specifically designed for creators to smart home devices that automate your life, we curate only the best. Our gadgets are sourced from top-tier manufacturers ensuring reliability and innovation.",
            img: "https://images.unsplash.com/photo-1498049381351-b45c29b21fc1?q=80&w=2069&auto=format&fit=crop",
            link: "/gadgets",
            btnText: "View Electronics"
        },
        {
            title: "Trendy Fashion",
            desc: "Style that speaks volumes. Our clothing collection is a blend of contemporary trends and timeless classics. Whether you're looking for sustainable fabrics, streetwear essentials, or elegant evening wear, find your unique look with our diverse range.",
            img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
            link: "/clothing",
            btnText: "Browse Fashion"
        },
        {
            title: "Fun & Educational Toys",
            desc: "Spark creativity and joy. Our toy selection focuses on both entertainment and development. providing a wide array of educational games, creative building sets, and interactive playmates that help children learn and grow while having the time of their lives.",
            img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop",
            link: "/toys",
            btnText: "Shop Toys"
        }
    ];

    return (
        <div className="w-full py-20 bg-white">
            <div className="max-w-container mx-auto px-4 flex flex-col gap-20">
                {features.map((feature, index) => (
                    <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20`}>
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl"
                        >
                            <img src={feature.img} alt={feature.title} className="w-full h-full object-cover hover:scale-105 duration-700" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full md:w-1/2 flex flex-col items-start gap-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold font-titleFont text-primeColor">{feature.title}</h2>
                            <p className="text-gray-500 text-lg leading-relaxed">{feature.desc}</p>
                            <Link to={feature.link}>
                                <button className="px-8 py-3 bg-indigo text-white rounded-full font-bold shadow-md hover:bg-softBlue hover:shadow-lg transition-all duration-300">
                                    {feature.btnText}
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureSection;
