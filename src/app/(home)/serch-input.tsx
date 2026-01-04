"use client"
import React,{useState,useRef} from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SearchIcon, XIcon} from "lucide-react";
import {useSerchParam} from "@/hooks/user-search-param";

function SerchInput() {
    const [search,setSearch] = useSerchParam("search")
    const [value,setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const handleClear = () => {
        setValue("");
        inputRef.current?.blur();
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputRef.current?.blur();
    }

    return (
        <div className="flex-1 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
                <Input
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}
                    placeholder="Search..."
                    className="md:text-base placeholder:text-neutral-800 px-16 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-4 rounded-full"
                >
                    <SearchIcon/>
                </Button>
                {value &&
                    <Button
                        onClick={handleClear}
                        type="button"
                        variant="ghost"
                        className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-4 rounded-full"
                    >
                        <XIcon/>
                    </Button>
                }
            </form>
        </div>
    )
}

export default SerchInput
