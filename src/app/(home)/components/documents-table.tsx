import React from 'react'
import {Doc} from "../../../../convex/_generated/dataModel"
import {PaginationStatus} from "convex/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {LoaderIcon} from "lucide-react";
import DocumentRow from "@/app/(home)/components/document";
import {Button} from "@/components/ui/button";

interface DocumentTableProps {
    documents : Doc<"documents">[] | undefined;
    loadMore: (numItems:number) => void;
    status: PaginationStatus
}

function DocumentsTable({documents,loadMore,status} : DocumentTableProps) {
    return (
        <div className="max-w-screen mx-auto px-24 py-6 flex flex-col gap-5">
            {documents === undefined ? (
                <div className="flex justify-center items-center h-24">
                    <LoaderIcon className="animate-spin"/>
                </div>
            ):(
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead>Name</TableHead>
                                <TableHead>&nbsp;</TableHead>
                                <TableHead>Shared</TableHead>
                                <TableHead>CreatedAt</TableHead>
                            </TableRow>
                        </TableHeader>
                        {documents.length ===0 ? (
                            <TableBody>
                                <TableRow className="hover:bg-transparent">
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No documents found
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) :(
                            <TableBody>
                                {documents.map((document,index) => (
                                    <DocumentRow key={index} document={document} />
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </div>
            )}
            <div className="flex items-center justify-center">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={()=> loadMore(5)} disabled={status !== "CanLoadMore"}
                >
                    {status === "CanLoadMore" ? "Load More" : "End of the results"}
                </Button>
            </div>
        </div>
    )
}

export default DocumentsTable
