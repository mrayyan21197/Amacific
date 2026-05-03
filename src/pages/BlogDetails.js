import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogsData } from "../constants/data";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalendarAlt, FaTag } from "react-icons/fa";
import SeoHead from "../components/SeoHead";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const blogId = Number(id);
    const blog = blogsData.find((b) => b.id === blogId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold text-primeColor">Blog Post Not Found</h1>
                <Link to="/blogs">
                    <button className="px-6 py-2 bg-indigo text-white rounded-lg">Back to Blogs</button>
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full bg-white pb-20">
            <SeoHead title={blog.title} description={blog.shortDescription} canonicalPath={`/blogs/${blog.id}`} />
            {/* Hero Header */}
            <div className="w-full h-[400px] md:h-[500px] relative">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-accent-sky text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4"
                    >
                        {blog.category}
                    </motion.span>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-titleFont leading-tight"
                    >
                        {blog.title}
                    </motion.h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-30">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8 text-gray-500 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-indigo" />
                            {blog.date || "Feb 12, 2026"}
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTag className="text-indigo" />
                            {blog.category}
                        </div>
                    </div>

                    <div className="prose prose-lg prose-indigo max-w-none font-bodyFont text-gray-600 leading-relaxed whitespace-pre-line">
                        {blog.fullContent}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                        <button
                            onClick={() => navigate('/blogs')}
                            className="flex items-center gap-2 text-indigo font-bold hover:text-softBlue transition-colors group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 duration-300" />
                            Back to All Blogs
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogDetails;
