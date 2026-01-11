"use client"
import React from 'react'
import Navbar from "@/app/(home)/components/navbar";
import TemplateGallery from "@/app/(home)/components/template-gallery";
import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";

function Page() {
    const documents = useQuery(api.documents.get)

    return (
        <div className="min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
                <Navbar/>
            </div>
            <div className="mt-16">
                <TemplateGallery/>
            </div>
        </div>
    )
}

export default Page
