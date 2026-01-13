"use client"
import React from 'react'
import Navbar from "@/app/(home)/components/navbar";
import TemplateGallery from "@/app/(home)/components/template-gallery";
import {usePaginatedQuery, useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import DocumentsTable from "@/app/(home)/components/documents-table";
import {useSerchParam} from "@/hooks/user-search-param";

function Page() {
    const [search] = useSerchParam("search");
    const {results,status,loadMore} = usePaginatedQuery(api.documents.get,{search},{initialNumItems : 5})


    return (
        <div className="min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
                <Navbar/>
            </div>
            <div className="mt-16">
                <TemplateGallery/>
                <DocumentsTable
                    documents={results}
                    loadMore={loadMore}
                    status={status}
                />
            </div>
        </div>
    )
}

export default Page
