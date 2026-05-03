import React from "react";
import BlogCard from "../components/BlogCard";
import { blogsData } from "../constants/data";
import SeoHead from "../components/SeoHead";

const Blogs = () => {
    return (
        <div className="max-w-container mx-auto px-4 py-16 min-h-screen">
            <SeoHead
                title="Blog — Shopping Guides for Pakistan"
                description="Student carts, payday deals, fake-product tips & gift guides for young Pakistani shoppers."
                canonicalPath="/blogs"
            />
            <div className="flex flex-col items-center mb-16 text-center">
                <h2 className="text-4xl font-bold font-titleFont text-navy mb-4">Amacific Journal</h2>
                <p className="text-gray-500 max-w-2xl text-lg">
                    SEO-friendly guides for online shopping Pakistan — campus budgets, beauty authenticity & TikTok-era haul strategy.
                </p>
                <div className="w-20 h-1 bg-brandOrange rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogsData.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
