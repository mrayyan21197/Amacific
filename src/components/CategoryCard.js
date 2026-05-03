import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoryCard = ({ img, title, category, link }) => {
    return (
        <Link to={link || "/shop"} className="w-full">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden cursor-pointer shadow-lg group"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 duration-300 group-hover:bg-black/50" />
                <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 z-20">
                    <span className="text-accent-sky text-sm font-bold uppercase tracking-wider mb-2 block">{category}</span>
                    <h3 className="text-3xl font-bold text-white font-titleFont mb-4">{title}</h3>

                    <button className="bg-white/20 hover:bg-white text-white hover:text-indigo backdrop-blur-sm px-6 py-2 rounded-full font-semibold transition-all duration-300">
                        Explore Collection
                    </button>
                </div>
            </motion.div>
        </Link>
    );
};

export default CategoryCard;
