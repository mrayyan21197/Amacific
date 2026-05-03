import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full flex flex-col h-full"
        >
            <Link to={`/blogs/${blog.id}`} className="block h-60 overflow-hidden relative group">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 duration-300" />
            </Link>
            <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-accent-sky uppercase tracking-wider">{blog.category || "Lifestyle"}</span>
                    <span className="text-xs text-gray-400 font-semibold">{blog.date}</span>
                </div>
                <Link to={`/blogs/${blog.id}`}>
                    <h3 className="text-xl font-bold text-primeColor font-titleFont line-clamp-2 hover:text-indigo duration-300 cursor-pointer">
                        {blog.title}
                    </h3>
                </Link>
                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-auto">
                    {blog.shortDescription}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link to={`/blogs/${blog.id}`} className="flex items-center gap-2 text-indigo font-bold hover:text-softBlue duration-300 group w-fit">
                        Read Full Article
                        <span className="group-hover:translate-x-1 duration-300">→</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;
