import React from 'react';
import { motion } from 'framer-motion';
import { FaShippingFast, FaShieldAlt, FaUndo, FaHeadset } from 'react-icons/fa';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: FaShippingFast,
            title: "Fast Delivery",
            desc: "Get your orders delivered to your doorstep in record time with our optimized logistics."
        },
        {
            icon: FaShieldAlt,
            title: "Secure Payment",
            desc: "Your transactions are protected with state-of-the-art encryption technologies."
        },
        {
            icon: FaUndo,
            title: "Easy Returns",
            desc: "Not satisfied? Return your products easily within 30 days, no questions asked."
        },
        {
            icon: FaHeadset,
            title: "24/7 Support",
            desc: "Our dedicated support team is available around the clock to assist you."
        }
    ];

    return (
        <div className="w-full py-20 bg-gray-50">
            <div className="max-w-container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-titleFont text-primeColor mb-4">Why Shop With Us</h2>
                    <div className="w-20 h-1 bg-indigo rounded-full mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center gap-4 border border-gray-100"
                        >
                            <div className="w-16 h-16 rounded-full bg-indigo/10 flex items-center justify-center text-indigo mb-2">
                                <reason.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold font-titleFont text-primeColor">{reason.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
