"use client"
import React, {ReactNode, useState} from 'react'
import {
    BoldIcon,
    ItalicIcon,
    ListTodoIcon,
    LucideIcon,
    MessageSquareIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon,
    ChevronsDownIcon,
    HighlighterIcon,
    Link2Icon, ImageIcon, UploadIcon, SearchIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon,
    ListIcon, ListOrderedIcon, MinusIcon, PlusIcon, ListCollapseIcon
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import useEditorStore from "@/app/store/use-editor-store";
import {Separator} from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {type Level} from "@tiptap/extension-heading"
import { type ColorResult, SketchPicker} from "react-color"

interface ToolBarButtonProps{
    onClick?:()=> void;
    isActive?:boolean;
    icon:LucideIcon;
}
function ToolBarButton({
    onClick,
    icon : Icon,
    isActive
} : ToolBarButtonProps){
    return <Button
        onClick={onClick}
        variant="ghost"
        className={cn("text-sm h-7 min-w-7 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80",
        )}
    >
        <Icon className="size-4"/>
    </Button>
}

function LineHeightButton(){
    const {editor} = useEditorStore();
    const lineHeights = [
        {label : "Default",value : "normal"},
        {label : "Single",value : "1"},
        {label : "1.15",value : "1.15"},
        {label : "1.5",value : "1.5"},
        {label : "Double",value : "2"},
    ]

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button
                className="text-sm h-7 min-w-7 p-1 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <ListCollapseIcon className="size-4"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {lineHeights.map(({label,value}) :ReactNode=>{
                return <button
                    key={value}
                    onClick={()=>editor?.chain().focus().setLineHeight(value).run()}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
                    )}
                >
                    <span className="text-sm">{label}</span>
                </button>
            })}
        </DropdownMenuContent>
    </DropdownMenu>
}


function TextColorButton(){
    const {editor} = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000"
    const onChange = (color : ColorResult)=>{
        editor?.chain().focus().setColor(color.hex).run()
    }
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button
                className="text-sm h-7 min-w-7 p-1 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <span className="text-xs">A</span>
                <div className="h-0.5 w-full" style={{backgroundColor : value}}></div>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <SketchPicker
                color={value}
                onChange={onChange}
            />
        </DropdownMenuContent>
    </DropdownMenu>
}

function HighlightColorButton(){
    const {editor} = useEditorStore();
    const value = editor?.getAttributes("highlight").color || "#FFFFFF"
    const onChange = (color : ColorResult)=>{
        editor?.chain().focus().setHighlight({color : color.hex}).run()
    }
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button
                className="text-sm h-7 min-w-7 p-1 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <HighlighterIcon className="size-4"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <SketchPicker
                color={value}
                onChange={onChange}
            />
        </DropdownMenuContent>
    </DropdownMenu>
}

function FontSizeButton(){
    const {editor} = useEditorStore();
    const curretFonstSize = editor?.getAttributes("textStyle").fontSize ? editor?.getAttributes("textStyle").fontSize.replace("px","") : "16"
    const [fonstSize,setFonstSize] = useState(curretFonstSize);
    const [inputValue,setInputValue] = useState(fonstSize);
    const [isEditing,setIsEditing] = useState(false);
    const updateFontSize = (newSize : string) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0){
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFonstSize(newSize);
            setInputValue(newSize);
            setIsEditing(false);
        }
    }
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue);
    }

    const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>)=> {
        if (e.key === "Enter"){
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }
    const increment = () => {
        const newSize = parseInt(fonstSize) + 1;
        updateFontSize(newSize.toString());
    }
    const decrement = () => {
        const newSize = parseInt(fonstSize) - 1;
        if (newSize > 0){
            updateFontSize(newSize.toString());
        }
    }

    return <div className="flex items-center gap-x-0.5">
        <button
            onClick={decrement}
            className="size-4 text-sm h-7 w-7 p-1 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        >
            <MinusIcon className="size-4"/>
        </button>
        { isEditing ? (
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="size-4 text-sm h-7 w-10 p-1 text-center rounded-sm border border-neutral-400 bg-transparent focus:outline-none focus:ring-0"
            />
        ) : (
            <button
                onClick={()=> {
                    setIsEditing(true);
                    setFonstSize(curretFonstSize);
                }}
                className="size-4 text-sm h-7 w-10 p-1 text-center rounded-sm border border-neutral-400 hover:bg-neutral-200/80">
                {curretFonstSize}
            </button>
        )}
        <button
            onClick={increment}
            className="size-4 text-sm h-7 w-7 p-1 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        >
            <PlusIcon className="size-4"/>
        </button>
    </div>
}


function ListButton(){
    const {editor} = useEditorStore();
    const lists = [
        {
            label : "Bullet list",
            icon : ListIcon,
            isActive : () => editor?.isActive("bulletList"),
            onClick : () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label : "Ordered list",
            icon : ListOrderedIcon,
            isActive : () => editor?.isActive("orderedList"),
            onClick : () => editor?.chain().focus().toggleOrderedList().run()
        }

    ]

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button
                className="text-sm h-7 min-w-7 p-1 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <ListIcon className="size-4"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {lists.map(({label,icon : Icon,onClick,isActive}) :ReactNode=>{
                return <button
                    key={label}
                    onClick={onClick}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        isActive() && "bg-neutral-200/80"
                    )}
                >
                    <Icon className="size-4"/>
                    <span className="text-sm">{label}</span>
                </button>
            })}
        </DropdownMenuContent>
    </DropdownMenu>
}

function AlignButton(){
    const {editor} = useEditorStore();
    const alignment = [
        {
            label : "Align Left",
            value : "left",
            icon : AlignLeftIcon
        },
        {
            label : "Align Center",
            value : "center",
            icon : AlignCenterIcon
        },
        {
            label : "Align Right",
            value : "right",
            icon : AlignRightIcon
        },
        {
            label : "Align Justify",
            value : "justify",
            icon : AlignJustifyIcon
        }
    ]

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button
                className="text-sm h-7 min-w-7 p-1 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <AlignLeftIcon className="size-4"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {alignment.map(({label,value,icon : Icon}) :ReactNode=>{
                return <button
                    key={value}
                    onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.isActive({textAlign: value}) && "bg-neutral-200/80"
                    )}
                >
                    <Icon className="size-4"/>
                    <span className="text-sm">{label}</span>
                </button>
            })}
        </DropdownMenuContent>
    </DropdownMenu>
}

function HeadingButton(){
    const {editor} = useEditorStore();
    const headings = [
        {
            label : "Normal text",
            value : 0,
            fontSize : '16px'
        },
        {
            label : "Heading 1",
            value : 1,
            fontSize : '32px'
        },
        {
            label : "Heading 2",
            value : 2,
            fontSize : '24px'
        },
        {
            label : "Heading 3",
            value : 3,
            fontSize : '20px'
        },
        {
            label : "Heading 4",
            value : 4,
            fontSize : '18px'
        },
        {
            label : "Heading 5",
            value : 5,
            fontSize : '16px'
        },
    ]
    function getCurrentHeading(){
        for(let level=1; level<=5;level++){
            if(editor?.isActive("heading",{level})){
                return `Heading ${level}`;
            }
        }
        return "Normal text"
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                <ChevronsDownIcon className="ml-2 size-4 shrink-0"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {headings.map(({label,value,fontSize}):ReactNode=>{
                return <button
                    onClick={()=>{
                        if(value===0){
                            editor?.chain().focus().setParagraph().run();
                        }else {
                            editor?.chain().focus().toggleHeading({level : value as Level}).run();
                        }

                    }}
                    key={value}
                    style={{fontSize}}
                    className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        (value===0 && !editor?.isActive("heading") || editor?.isActive("heading",{level : value})) && "bg-neutral-200/80")
                    }
                >
                    {label}
                </button>
            })}
        </DropdownMenuContent>
    </DropdownMenu>
}

function FontFamilyButton(){
    const {editor} = useEditorStore();
    const fonts = [
        {
            label : "Arial",
            value : "Arial"
        },
        {
            label : "Times New Roman",
            value : "Times New Roman"
        },
        {
            label : "Courier New",
            value : "Courier New"
        },
        {
            label : "Georgia",
            value : "Georgia"
        },
        {
            label : "Verdana",
            value : "Verdana"
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
                    <span className="truncate">
                        {editor?.getAttributes('textStyle').fontFamily || "Arial"}
                    </span>
                    <ChevronsDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map((item):ReactNode=>{
                        return <button
                            key={item.value}
                            onClick={()=>{
                                editor?.chain().focus().setFontFamily(item.value).run()
                            }}
                            className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily == item.value && "bg-neutral-200/80")
                            }
                            style={{fontFamily : item.value}}

                        >
                            <span className="text-sm">
                                {item.label}
                            </span>
                        </button>
                    }
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function LinkButton(){
    const {editor} = useEditorStore();
    const [value,setValue] = useState(editor?.getAttributes("link").href || "");
    const onChange = (href : string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
        setValue("");
    }

    return <DropdownMenu onOpenChange={(open)=>{
        if (open){
            setValue(editor?.getAttributes("link").href || "")}
        }
    }>
        <DropdownMenuTrigger asChild>
            <button
                className="text-sm h-7 min-w-7 p-1 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <Link2Icon className="size-4"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
            <Input
                placeholder={"Paste the link"}
                value={value}
                onChange={(e)=> setValue(e.target.value)}
            />
            <Button onClick={()=>onChange(value)}>
                Apply
            </Button>
        </DropdownMenuContent>
    </DropdownMenu>
}

function ImageButton(){
    const {editor} = useEditorStore();
    const [imageUrl,setImageUrl] = useState("");
    const [isDialogOpen,setIsDialogOpen] = useState(false)
    const onChange = (src : string) => {
        editor?.chain().focus().setImage({src}).run()
    }

    const onUpload = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file){
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl);
            }
        }
        input.click();
    }

    const handleImageUrlSubmit = () => {
        if (imageUrl){
            onChange(imageUrl);
            setImageUrl(imageUrl);
            setIsDialogOpen(false)
        }
    }

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="text-sm h-7 min-w-7 p-1 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80"
                >
                    <ImageIcon className="size-4"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <DropdownMenuItem onClick={onUpload}>
                    <UploadIcon className="size-4 mr-2"/>
                    Upload
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SearchIcon className="size-4 mr-2"/>
                    Paste image url
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insert Image URL</DialogTitle>
                </DialogHeader>
                <Input
                    placeholder="Insert Image URL"
                    value={imageUrl}
                    onChange={(e)=> setImageUrl(e.target.value)}
                    onKeyDown={(e)=> {
                            if (e.key === "Enter") {handleImageUrlSubmit();}
                        }
                    }
                >

                </Input>
                <DialogFooter>
                    <Button onClick={handleImageUrlSubmit}>Insert</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}


function Toolbar() {
    const {editor} = useEditorStore()
    const sections: {
        lable : string ;
        icon : LucideIcon;
        onClick : () => void;
        isActive?: boolean
    }[][] = [
        [
            {
                lable : "undo",
                icon : Undo2Icon,
                onClick : ()=> editor?.chain().focus().undo().run()
            },
            {
                lable : "Redo",
                icon : Redo2Icon,
                onClick : () => editor?.chain().focus().redo().run()
            },
            {
                lable : "Print",
                icon : PrinterIcon,
                onClick : ()=> window.print()
            },
            {
                lable : "SpellCheck",
                icon : SpellCheckIcon,
                onClick : ()=> {
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck", current==="false"? "true" : "false")
                }
            }
        ],
        [
            {
                lable : "Bold",
                icon : BoldIcon,
                isActive : editor?.isActive("bold"),
                onClick : ()=> {editor?.chain().focus().toggleBold().run()}
            },
            {
                lable : "Italic",
                icon : ItalicIcon,
                isActive : editor?.isActive("italic"),
                onClick : ()=> {editor?.chain().focus().toggleItalic().run()}
            },
            {
                lable : "Underline",
                icon : UnderlineIcon,
                isActive : editor?.isActive("underline"),
                onClick : ()=> {editor?.chain().focus().toggleUnderline().run()}
            }
        ],
        [
            {
                lable : "Comment",
                icon : MessageSquareIcon,
                onClick : ()=> console.log("Todo : comment"),
                isActive : false
            },
            {
                lable : "List Todo",
                icon : ListTodoIcon,
                onClick : ()=> editor?.chain().focus().toggleTaskList().run(),
                isActive : editor?.isActive("taskList")
            },
            {
                lable : "Remove Formatting ",
                icon : RemoveFormattingIcon,
                onClick : ()=> editor?.chain().focus().unsetAllMarks().run(),
                isActive : editor?.isActive("taskList")
            }
        ]
    ]

    return <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
        {sections[0].map((item) :ReactNode=>{
            return <ToolBarButton {...item} key={item.lable}/>
        })}
        <Separator orientation={"vertical"} className="h-6 bg-neutral-300"/>
        <FontFamilyButton/>
        <Separator orientation={"vertical"} className="h-6 bg-neutral-300"/>
        <HeadingButton/>
        <Separator orientation={"vertical"} className="h-6 bg-neutral-300"/>
        <FontSizeButton/>
        <Separator orientation={"vertical"} className="h-6 bg-neutral-300"/>
        {sections[1].map((item) :ReactNode=>{
            return <ToolBarButton {...item} key={item.lable}/>
        })}
        <TextColorButton/>
        <HighlightColorButton/>
        <Separator orientation={"vertical"} className="h-6 bg-neutral-300"/>
        <LinkButton/>
        <ImageButton/>
        <AlignButton/>
        <LineHeightButton/>
        <ListButton/>
        {sections[2].map((item) :ReactNode=>{
            return <ToolBarButton {...item} key={item.lable}/>
        })}
    </div>

}

export default Toolbar