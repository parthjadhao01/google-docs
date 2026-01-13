"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import SearchInput from "./serch-input"
import {OrganizationSwitcher, UserButton} from "@clerk/nextjs"


function Navbar() {
    return (
        <nav className="flex items-center justify-between h-full w-full">
            <div className="flex gap-3  items-center shrink-0 pr-6">
                <Link href="/public">
                    <Image src="/logo.svg" alt="logo" width={36} height={36}/>
                </Link>
                <h3 className="text-xl">Docly</h3>
            </div>
            <SearchInput></SearchInput>
            <div>
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton></UserButton>
            </div>
        </nav>
    )
}

export default Navbar
