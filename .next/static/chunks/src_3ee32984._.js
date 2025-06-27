(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-transform duration-150 ease-out", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-px active:translate-y-0",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-px active:translate-y-0",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:-translate-y-px active:translate-y-0",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-px active:translate-y-0",
            ghost: "hover:bg-accent hover:text-accent-foreground hover:-translate-y-px active:translate-y-0",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, this);
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/sheet.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Sheet": (()=>Sheet),
    "SheetClose": (()=>SheetClose),
    "SheetContent": (()=>SheetContent),
    "SheetDescription": (()=>SheetDescription),
    "SheetFooter": (()=>SheetFooter),
    "SheetHeader": (()=>SheetHeader),
    "SheetOverlay": (()=>SheetOverlay),
    "SheetPortal": (()=>SheetPortal),
    "SheetTitle": (()=>SheetTitle),
    "SheetTrigger": (()=>SheetTrigger)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const Sheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const SheetTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const SheetClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
const SheetPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const SheetOverlay = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props,
        ref: ref
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 22,
        columnNumber: 3
    }, this));
_c = SheetOverlay;
SheetOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const sheetVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
    variants: {
        side: {
            top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
        }
    },
    defaultVariants: {
        side: "right"
    }
});
const SheetContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c1 = ({ side = "right", className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SheetOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/sheet.tsx",
                lineNumber: 61,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(sheetVariants({
                    side
                }), className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/sheet.tsx",
                                lineNumber: 69,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/sheet.tsx",
                                lineNumber: 70,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/sheet.tsx",
                        lineNumber: 68,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/sheet.tsx",
                lineNumber: 62,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, this));
_c2 = SheetContent;
SheetContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const SheetHeader = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 81,
        columnNumber: 3
    }, this);
_c3 = SheetHeader;
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 95,
        columnNumber: 3
    }, this);
_c4 = SheetFooter;
SheetFooter.displayName = "SheetFooter";
const SheetTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c5 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold text-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 109,
        columnNumber: 3
    }, this));
_c6 = SheetTitle;
SheetTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const SheetDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c7 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sheet.tsx",
        lineNumber: 121,
        columnNumber: 3
    }, this));
_c8 = SheetDescription;
SheetDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "SheetOverlay");
__turbopack_context__.k.register(_c1, "SheetContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "SheetContent");
__turbopack_context__.k.register(_c3, "SheetHeader");
__turbopack_context__.k.register(_c4, "SheetFooter");
__turbopack_context__.k.register(_c5, "SheetTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "SheetTitle");
__turbopack_context__.k.register(_c7, "SheetDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "SheetDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
// UserPlus, LogIn, UserCircle2, LogOutIcon removed
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sheet.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function Header() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // const { toast } = useToast(); // Removed as logout toast is gone
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // isLoggedIn and isLoadingSession states are removed
    // useEffect for session checking is removed
    const handleAiAdvisorClick = (e)=>{
        if (pathname === '/') {
            e.preventDefault();
            const section = document.getElementById('ai-decor-advisor');
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        setIsMobileMenuOpen(false);
    };
    // handleLogout function is removed
    const NavLink = ({ href, label, icon: Icon, onClick, ariaLabel })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            asChild: true,
            variant: "ghost",
            className: "w-full md:w-auto justify-start md:justify-center text-base md:text-sm py-3 md:py-2 px-2 md:px-3",
            onClick: ()=>setIsMobileMenuOpen(false),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: href,
                "aria-label": ariaLabel || label,
                onClick: onClick,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "mr-3 md:mr-2 h-5 md:h-4 w-5 md:w-4 text-primary md:text-current"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    " ",
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/header.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/header.tsx",
            lineNumber: 45,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "py-4 px-2 md:px-4 border-b border-border/50 shadow-sm sticky top-0 bg-background/95 backdrop-blur-sm z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto flex justify-between items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "flex items-center group",
                    "aria-label": "Aarambh Decor Home",
                    onClick: ()=>setIsMobileMenuOpen(false),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b",
                            alt: "Aarambh Decor Logo",
                            width: 40,
                            height: 40,
                            priority: true,
                            className: "object-contain rounded-lg transition-opacity group-hover:opacity-80",
                            "data-ai-hint": "logo"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "ml-3 text-xl font-headline text-primary opacity-0 w-0 transform -translate-x-4 group-hover:opacity-100 group-hover:w-auto group-hover:translate-x-0 transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap",
                            children: "Aarambh Decor"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 65,
                            columnNumber: 12
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/header.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-1 sm:gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex items-center gap-0 sm:gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                    href: "/",
                                    label: "Home",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                    href: "/collections",
                                    label: "Collections",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                    href: "/#ai-decor-advisor",
                                    label: "AI Advisor",
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
                                    onClick: handleAiAdvisorClick
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            asChild: true,
                            variant: "ghost",
                            className: "relative",
                            size: "icon",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/cart",
                                "aria-label": "View Cart",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/header.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                                open: isMobileMenuOpen,
                                onOpenChange: setIsMobileMenuOpen,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            "aria-label": "Open menu",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/header.tsx",
                                                lineNumber: 92,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/header.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                                        side: "right",
                                        className: "w-[280px] sm:w-[300px] p-4 flex flex-col",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                                                className: "mb-6 pb-3 border-b border-border",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/",
                                                        onClick: ()=>setIsMobileMenuOpen(false),
                                                        className: "flex items-center group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b",
                                                                alt: "Aarambh Decor Logo",
                                                                width: 36,
                                                                height: 36,
                                                                priority: true,
                                                                className: "object-contain rounded-lg",
                                                                "data-ai-hint": "logo"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/header.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 24
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 text-lg font-headline text-primary",
                                                                children: "Aarambh Decor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/header.tsx",
                                                                lineNumber: 104,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/layout/header.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/header.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/header.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                                className: "flex flex-col space-y-1 flex-grow",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                                        href: "/",
                                                        label: "Home",
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/header.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                                        href: "/collections",
                                                        label: "Collections",
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/header.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavLink, {
                                                        href: "/#ai-decor-advisor",
                                                        label: "AI Advisor",
                                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
                                                        onClick: handleAiAdvisorClick
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/header.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/header.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/header.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/header.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/header.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/header.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/header.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(Header, "QoXQnXoV1iGvMcQddqTELXE2Hb8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/data/products.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("[{\"id\":\"p1\",\"name\":\"Floral Wall Art Set\",\"description\":\"Beautify your space with our elegant Set of 3 Floral Wall Art pieces. A perfect blend of nature and art for your walls!\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506007921_17843711043510460_6632509365454219861_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=pvzG9wUr7H8Q7kNvwEuFqZH&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY2MTM3MjI5NTY1NzkwMg%3D%3D.3-ccb7-5&oh=00_AfOAwg6OY-Sb3mBeStUs3WvIpLvil8-TLViMuLGFVhVnfg&oe=6854709F&_nc_sid=22de04\",\"dataAiHint\":\"floral art\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506304064_17843711037510460_8448706297656219597_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QFLe0zybFRZKHHr0m_mokIv88kxhdEUx-l2h_eakkUzqoGhndcHCVhHkBqGu_G6ogp8TOArxma3roper3VlPa0d&_nc_ohc=c12IT7QI5lkQ7kNvwGLunaZ&_nc_gid=GLy7feFQSYv7wkZBvzGNqQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY2MTM3MjI4NzI3MzczMA%3D%3D.3-ccb7-5&oh=00_AfPN_OefqQWV_aJCZg8rfxDR4l3H_dws-GhBhaDUyRPTDg&oe=68549915&_nc_sid=22de04\",\"dataAiHint\":\"floral art\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506076883_17843711040510460_6417994417989209370_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QFLe0zybFRZKHHr0m_mokIv88kxhdEUx-l2h_eakkUzqoGhndcHCVhHkBqGu_G6ogp8TOArxma3roper3VlPa0d&_nc_ohc=LvjA90NXuuwQ7kNvwEBcjH1&_nc_gid=GLy7feFQSYv7wkZBvzGNqQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY2MTM3MjQxMzAxMjE1Mw%3D%3D.3-ccb7-5&oh=00_AfMd6rqo1ZdJZxyaZAdtg3DW4pY0cklYGHpzoiBgrJyF8Q&oe=685479DF&_nc_sid=22de04\",\"dataAiHint\":\"floral art\"}],\"price\":\"Rs. 1850\",\"category\":\"Wall Art\",\"featured\":true,\"sizeAndDimensions\":\"Set of 3: 16 inches, 12 inches, & 8 inches\",\"material\":\"Metal/Canvas (Assumed)\",\"reviews\":[]},{\"id\":\"p2\",\"name\":\"Gold Sunburst Wall Décor Set\",\"description\":\"Set of 3 Gold Sunburst Wall Décor (9” each)! Perfect for living rooms, bedrooms, or hallways.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506021878_17843713338510460_5363780950113686003_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=P5JUOukZKB0Q7kNvwE5aXD6&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY2OTExOTQyNjcwOTk5Mg%3D%3D.3-ccb7-5&oh=00_AfOFfhUPXs2U1qv0jBD9L2ovoaymZiVJaSkHBc9mMN3R7g&oe=68546EF8&_nc_sid=22de04\",\"dataAiHint\":\"sunburst decor\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/505910212_17843713347510460_3520480563967540102_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QFLe0zybFRZKHHr0m_mokIv88kxhdEUx-l2h_eakkUzqoGhndcHCVhHkBqGu_G6ogp8TOArxma3roper3VlPa0d&_nc_ohc=8YbVNGOk0OgQ7kNvwGRRwCP&_nc_gid=GLy7feFQSYv7wkZBvzGNqQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY2OTExOTQzNTIyNzQ0NQ%3D%3D.3-ccb7-5&oh=00_AfOyynfnSOkCVYhXIhEqwXgsfg6dOIVBt7EGx-CMCzUytg&oe=68548510&_nc_sid=22de04\",\"dataAiHint\":\"sunburst decor\"}],\"price\":\"Rs. 1299\",\"category\":\"Wall Art\",\"featured\":true,\"sizeAndDimensions\":\"Set of 3: 9 inches each\",\"material\":\"Metal\",\"reviews\":[]},{\"id\":\"p3\",\"name\":\"Metal Rose Floral Wall Art\",\"description\":\"This Metal Floral Wall Art features elegant rose accents and leaf detailing — perfect for your hallway, living room, or entryway.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506294256_17843713923510460_482927659032378126_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=cvHGGBedIEsQ7kNvwGEVXrJ&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY3MjI3NDE4MDkxOTUxMQ%3D%3D.3-ccb7-5&oh=00_AfPUnmbV1DNSMY9JSYW7dK_8Q6ZJ9O_3m2fxe9Rc7MAG7w&oe=68545D4E&_nc_sid=22de04\",\"dataAiHint\":\"metal floral\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506415043_17843713932510460_7854610303872801084_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QFLe0zybFRZKHHr0m_mokIv88kxhdEUx-l2h_eakkUzqoGhndcHCVhHkBqGu_G6ogp8TOArxma3roper3VlPa0d&_nc_ohc=u4hey3qw3NoQ7kNvwGagas4&_nc_gid=GLy7feFQSYv7wkZBvzGNqQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY3MjI3Mzg3MDMwMzEwNw%3D%3D.3-ccb7-5&oh=00_AfNvuZ0kYIZGN7F6ixHVA7N0ORr27M4m0EGnjY57equo5g&oe=68547D9B&_nc_sid=22de04\",\"dataAiHint\":\"metal floral\"}],\"price\":\"Rs. 1299\",\"category\":\"Wall Art\",\"featured\":true,\"sizeAndDimensions\":\"32 inches x 0.5 inches x 8 inches\",\"material\":\"Metal\",\"reviews\":[]},{\"id\":\"p4\",\"name\":\"Set of 3 Metal Flower Wall Art\",\"description\":\"Add floral elegance to your walls with this Set of 3 Metal Flower Wall Art. A perfect blend of modern and natural design to enhance any room!\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506354722_17843714196510460_4844468962607956661_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG4C2z8WDV8_p4pCL47RpA8QF9BGc-5A7-ysOvygWrlG62kTRvpj1rV1l38g0Ez5vqrrxrc1huvIzmEHK_A0Tl7&_nc_ohc=nt6lmQlaL6kQ7kNvwGtw1u4&_nc_gid=nQjJp0gaIB6aSR60PMpgbQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY3MzU3MjQ5NDI4NTk1Ng%3D%3D.3-ccb7-5&oh=00_AfMhPrinAdlz8ZUP7SVcw1KqjQ5QtALY2hPxzkSooVkw6g&oe=6854522C&_nc_sid=22de04\",\"dataAiHint\":\"metal flower\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506056683_17843714205510460_8379628821909197792_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QFLe0zybFRZKHHr0m_mokIv88kxhdEUx-l2h_eakkUzqoGhndcHCVhHkBqGu_G6ogp8TOArxma3roper3VlPa0d&_nc_ohc=yJPDdtzqE-UQ7kNvwEDNAoW&_nc_gid=GLy7feFQSYv7wkZBvzGNqQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY3MzU3MjQ4NTg3MTkxMQ%3D%3D.3-ccb7-5&oh=00_AfN3h6pihT-FAMePDEAP7VDSez30zj77Asr6rMB6ICwEiA&oe=68548519&_nc_sid=22de04\",\"dataAiHint\":\"metal flower\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506379331_17843714214510460_5295468346543683645_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QFLe0zybFRZKHHr0m_mokIv88kxhdEUx-l2h_eakkUzqoGhndcHCVhHkBqGu_G6ogp8TOArxma3roper3VlPa0d&_nc_ohc=s8OQfBV53FQQ7kNvwFi107B&_nc_gid=GLy7feFQSYv7wkZBvzGNqQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzY1NDY3MzU3MjE3NTMwNDQ5OQ%3D%3D.3-ccb7-5&oh=00_AfO8jN1SDfEO4Q8VznEN33ggrbyaKLVrWZkBguObZ4Sa7A&oe=68549426&_nc_sid=22de04\",\"dataAiHint\":\"metal flower\"}],\"price\":\"Rs. 1450\",\"category\":\"Wall Art\",\"featured\":true,\"sizeAndDimensions\":\"Set of 3: 12 inches, 10 inches, and 8 inches\",\"material\":\"Metal\",\"reviews\":[]},{\"id\":\"p5\",\"name\":\"Rectangular Wall Mirror\",\"description\":\"Sleek, simple, and stylish — this Rectangular Wall Mirror with a classic black frame is a perfect addition to your hallway, bathroom, or vanity setup.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506029505_17843714382510460_3075828935137813528_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=-z3HuhE38sMQ7kNvwH-UYgY&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY3NDcyNDMyNTY0MDY3NA%3D%3D.3-ccb7-5&oh=00_AfMdZwif9RFeY_dgm-8ZRYotpOKTpkqFQ1ctfI7DdS9Npw&oe=6854896D&_nc_sid=7a9f4b\",\"dataAiHint\":\"rectangular mirror\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506041115_17843714379510460_4132420391243595336_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=9ruyaTHqQlYQ7kNvwEHopCf&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY3NDcyMzg3MjU5NDQ1Mg%3D%3D.3-ccb7-5&oh=00_AfMzELISQuQmm6ixFKVyK8pH3jc3SiUPj6seopMRXWAxcQ&oe=68549614&_nc_sid=7a9f4b\",\"dataAiHint\":\"rectangular mirror\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506338347_17843714391510460_8679688510143705741_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=rX2zoj8isicQ7kNvwHGQ_mH&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY3NDcyMzk5MDA1MDUwMQ%3D%3D.3-ccb7-5&oh=00_AfMeg6_Jx9u7PWtJ-w6BA0s0-sApXeY5eWNsjkiprPCGjA&oe=6854884B&_nc_sid=7a9f4b\",\"dataAiHint\":\"rectangular mirror\"}],\"price\":\"Rs. 2250\",\"category\":\"Mirrors\",\"featured\":true,\"sizeAndDimensions\":\"12 x 0.5 x 24 inches\",\"material\":\"Glass with frame\",\"reviews\":[]},{\"id\":\"p6\",\"name\":\"Dandelion Burst Wall Accents\",\"description\":\"Add a touch of elegance and dimension to your walls with this Set of 3 Dandelion Burst Wall Accents.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506261459_17843714595510460_5155406451022833964_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=pAKHa8Fb2KIQ7kNvwF3nQr1&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY3NTk4MzM4MDE4MjM1Ng%3D%3D.3-ccb7-5&oh=00_AfMRdafpL4KeAcFSDXoIDxsKTIK0SFfKfqJubSlNgFKOJQ&oe=68548960&_nc_sid=7a9f4b\",\"dataAiHint\":\"dandelion accents\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506057587_17843714610510460_2090169984179127882_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=WKqMHnQMl_UQ7kNvwEAs8jq&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY3NTk4MzUyMjcyMzM0NQ%3D%3D.3-ccb7-5&oh=00_AfM1ZtIRDEEqIeXPyr42ZDNBdAqwHT042YtWq4fUYvesJg&oe=68548797&_nc_sid=7a9f4b\",\"dataAiHint\":\"dandelion accents\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506057334_17843714613510460_4784752176565112729_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=hF70yW8vMiwQ7kNvwEWt_fQ&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY3NTk4MzcxNTc1NDUxMw%3D%3D.3-ccb7-5&oh=00_AfOwlhkO-JBrhhyYmyhz9DtArn_JnP8R0lJsanBmwPqEgA&oe=685493F2&_nc_sid=7a9f4b\",\"dataAiHint\":\"dandelion accents\"}],\"price\":\"Rs. 1350\",\"category\":\"Wall Accents\",\"featured\":true,\"sizeAndDimensions\":\"Set of 3: 6x6x2 inch (1), 5x5x2 inch (2)\",\"material\":\"Metal (Assumed)\",\"reviews\":[]},{\"id\":\"p7\",\"name\":\"Metal Wall Art Vases Set\",\"description\":\"Add a touch of elegance to your space with our set of 3 metal wall art vases – a perfect blend of minimalism and botanical beauty.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture. Not intended to hold water.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506063440_17843714808510460_7449642100627923265_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=C0FoqsHzLEIQ7kNvwGRiT6E&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY3NzY0NTk2MDIxNzM2MA%3D%3D.3-ccb7-5&oh=00_AfM9T14hs6Wo1XDIrV7vuzQhE8uJixgsyUzUJTesWPoQZg&oe=68546DD9&_nc_sid=7a9f4b\",\"dataAiHint\":\"metal vases\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/505986553_17843714817510460_1814485724713627303_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=aYPLqw2pZ-UQ7kNvwENebfi&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY3NzY0NTc5MjU0MTgyOA%3D%3D.3-ccb7-5&oh=00_AfP7Bzfxg6X32GDgN9z7RmOQh2yelMfCTTpGX6IuuMjBFA&oe=68546F55&_nc_sid=7a9f4b\",\"dataAiHint\":\"metal vases\"}],\"price\":\"Rs. 2050\",\"category\":\"Wall Art\",\"featured\":false,\"sizeAndDimensions\":\"8 x 24 inches (each)\",\"material\":\"Metal\",\"reviews\":[]},{\"id\":\"p8\",\"name\":\"Rose Gold Leaf Metal Wall Art\",\"description\":\"Bring a modern botanical vibe into your home with our Rose Gold Leaf Metal Wall Art. A subtle blend of gold and blush tones that adds warmth, charm, and luxury to any space.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506349908_17843715426510460_932020719147873200_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=Tf-FSDlqqXkQ7kNvwFFCekb&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4MDE0NDMwNTc5MTA3OQ%3D%3D.3-ccb7-5&oh=00_AfOIyVOI255a2L2OEB-zX2b7VXBwHbdExPGS4qtkNhHZoA&oe=68548479&_nc_sid=7a9f4b\",\"dataAiHint\":\"leaf art\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506382093_17843715417510460_6585397997252427072_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=GpAac6rSC-0Q7kNvwEWky4Q&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4MDE0NDA3MTAzNDk0Mw%3D%3D.3-ccb7-5&oh=00_AfNXUTa4p0mK9LFt5LIW83zTCkMFZd9PNnVHFLoIaAhyPw&oe=68546DD9&_nc_sid=7a9f4b\",\"dataAiHint\":\"leaf art\"}],\"price\":\"Rs. 1250\",\"category\":\"Wall Art\",\"featured\":false,\"sizeAndDimensions\":\"26 x 1 x 16 inches\",\"material\":\"Metal\",\"reviews\":[]},{\"id\":\"p9\",\"name\":\"Golden Floral Wall Art Set\",\"description\":\"Elevate your space with this Set of 3 Golden Floral Wall Art pieces — where elegance meets simplicity. Perfect for modern, boho, or classic interiors.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid abrasive cleaners.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506349379_17843715816510460_8856566165679947027_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=_iS8DRsRFy4Q7kNvwGmQiRK&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4MTg0NDYyNjM5OTE2Nw%3D%3D.3-ccb7-5&oh=00_AfM6BZ_BHPkxytL3d-GbehcoeSbYQlrK1YX7g1CyOwg9bw&oe=68546DC9&_nc_sid=7a9f4b\",\"dataAiHint\":\"floral art\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506308163_17843715807510460_6893235013212570346_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=ZtaAbq1a2qgQ7kNvwEpWYHR&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4MTg0NDk3MDM0Mjg0Nw%3D%3D.3-ccb7-5&oh=00_AfPfNQzc78_5iFLY0zagHSURrtC2azgiFGSJQ20qLiQnHg&oe=68547E85&_nc_sid=7a9f4b\",\"dataAiHint\":\"floral art\"}],\"price\":\"Rs. 1400\",\"category\":\"Wall Art\",\"featured\":false,\"sizeAndDimensions\":\"Set of 3: 10 x 1 x 10 inches (each)\",\"material\":\"Metal\",\"reviews\":[]},{\"id\":\"p10\",\"name\":\"Timeless Round Mirror\",\"description\":\"Simplicity Reflects Style. Elevate your space with this timeless Round Mirror – the perfect blend of minimalism and elegance.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506385302_17843716248510460_2903137308940832733_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=pCNQ2pTtNPkQ7kNvwGGg_J_&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4MzU2OTM5OTU4NDg3Mw%3D%3D.3-ccb7-5&oh=00_AfPU4FDfrj_gx1sDotY48Dr5rh9U5Nzcq8SCwQLmEnMfHw&oe=68548994&_nc_sid=7a9f4b\",\"dataAiHint\":\"round mirror\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506360426_17843716257510460_4067284787728403652_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=BIgxjVAXBfIQ7kNvwH6ZXTD&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4MzU2OTM5OTU3MjIzMw%3D%3D.3-ccb7-5&oh=00_AfPQ6HlqmCmDUgRb4qWf3WrYyw7n9v2HUNJNsqjllpYlDg&oe=68549D66&_nc_sid=7a9f4b\",\"dataAiHint\":\"round mirror\"}],\"price\":\"Rs. 2650\",\"category\":\"Mirrors\",\"featured\":false,\"sizeAndDimensions\":\"30 x 1 x 30 inches\",\"material\":\"Glass with frame\",\"reviews\":[]},{\"id\":\"p11\",\"name\":\"Handcrafted Carved Wall Art\",\"description\":\"Art that Speaks Tradition. Bring timeless elegance to your walls with our Handcrafted Carved Wall Art – a stunning piece of craftsmanship and character.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506275000_17843717028510460_4187012246346727243_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=CLzTAqnR7DYQ7kNvwGuxKWY&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4NjU2ODgwNTI1NTQ5OA%3D%3D.3-ccb7-5&oh=00_AfNll4PjqNBDsKGNlWCL4N0M8GLkVNf8VYWIdgylaPn9aA&oe=685484FB&_nc_sid=7a9f4b\",\"dataAiHint\":\"carved art\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506085331_17843717037510460_7066598568378604973_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=CCR1gnJ3NsUQ7kNvwFzVCb9&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4NjU2OTAwNjUyMjA3MA%3D%3D.3-ccb7-5&oh=00_AfOVP0BaA-nGbK3cFjc6tWp-3nvC_blpPiDXWLuMIS-Xlw&oe=68547FA8&_nc_sid=7a9f4b\",\"dataAiHint\":\"carved art\"}],\"price\":\"Rs. 2450\",\"category\":\"Wall Art\",\"featured\":false,\"sizeAndDimensions\":\"30 x 0.65 x 30 inches\",\"material\":\"MDF\",\"reviews\":[]},{\"id\":\"p12\",\"name\":\"Rectangular Carved Wall Art\",\"description\":\"Bring depth and charm to your walls with this Rectangular Handcrafted Carved Wall Art, beautifully made from high-quality MDF and finished with intricate detailing.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506063314_17843717403510460_2975558918503892178_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=vZHQFfi5Ke8Q7kNvwELotOe&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4ODQyNjYzMDA5ODYwNQ%3D%3D.3-ccb7-5&oh=00_AfMRgYlY_BQnaFzvXdVvDlIv2sRBC_S3y2fmxk7HY-TLXw&oe=6854830A&_nc_sid=7a9f4b\",\"dataAiHint\":\"carved art\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506021971_17843717412510460_1998598368786926409_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=44qSHP0jnU4Q7kNvwFZu_W6&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY4ODQyNjk0MDY0MjAzOQ%3D%3D.3-ccb7-5&oh=00_AfObJ8OCdsICNSx4tc_l-FKt2fiAkqs8q30VuSDN1c-_2g&oe=68549BA9&_nc_sid=7a9f4b\",\"dataAiHint\":\"carved art\"}],\"price\":\"Rs. 2350\",\"category\":\"Wall Art\",\"featured\":false,\"sizeAndDimensions\":\"16 x 0.75 x 36 inches\",\"material\":\"MDF\",\"reviews\":[]},{\"id\":\"p13\",\"name\":\"Handcrafted MDF Carved Mirror\",\"description\":\"Mirror Meets Art. Add elegance to your space with this stunning Handcrafted MDF Mirror, framed in a beautifully carved traditional design.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506043787_17843717685510460_8625272138072154618_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=h5hvDlj2nW4Q7kNvwF0TFEO&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MDM4MzU1ODMxMzE4NQ%3D%3D.3-ccb7-5&oh=00_AfNjFPxWdQCH9boAh69tsNpH7GoJsPjlCya8CQgtOsoyug&oe=6854A1B4&_nc_sid=7a9f4b\",\"dataAiHint\":\"carved mirror\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506347700_17843717694510460_4530369129118390444_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=3cZOH89THfgQ7kNvwGdbbJS&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MDM4MzY4NDA5NTA3OA%3D%3D.3-ccb7-5&oh=00_AfPCiKObgmdK4MV-d8ftcOwqxEe85QrD6VAhr9BLqKdDBw&oe=6854A173&_nc_sid=7a9f4b\",\"dataAiHint\":\"carved mirror\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506300579_17843717703510460_8201649255672936022_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=RYLc2e7smokQ7kNvwH_7hHS&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MDM4Mzg4NTMzOTM2NA%3D%3D.3-ccb7-5&oh=00_AfNDZsV5GtMU23EfmzwSIRi7H5zzJCJGz26cg6WJya92Hg&oe=68549932&_nc_sid=7a9f4b\",\"dataAiHint\":\"carved mirror\"}],\"price\":\"Rs. 2900\",\"category\":\"Mirrors\",\"featured\":false,\"sizeAndDimensions\":\"16 x 0.60 x 24 inches\",\"material\":\"MDF\",\"reviews\":[]},{\"id\":\"p14\",\"name\":\"Solid Mango Wood Wall Art\",\"description\":\"Crafted from solid Mango Wood, this elegant Wall Art adds warmth, texture, and artisanal charm to any space.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture. Treat with wood polish periodically.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506336794_17843718087510460_7788361128858448373_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=Z-kP0cp1UVQQ7kNvwGp11sj&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MTQ2MjI0OTI2MzQ5OA%3D%3D.3-ccb7-5&oh=00_AfP93fUyIuPoX2ObXoxmIatKEVvXOp43ONnKYSfie3wThg&oe=68548048&_nc_sid=7a9f4b\",\"dataAiHint\":\"wood art\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506057577_17843718084510460_6105844122431939127_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=LzBOfItXVCwQ7kNvwE7OwUM&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MTQ2MjI0MDgwOTU4Nw%3D%3D.3-ccb7-5&oh=00_AfMyH_JrX7weL_moTd0z7lj2dc2QhDU74KQdOXLcGjcr0Q&oe=685495F6&_nc_sid=7a9f4b\",\"dataAiHint\":\"wood art\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506290481_17843718096510460_4588953530629591995_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=gorQEggRCfIQ7kNvwEwzOnx&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MTQ2MjIzMjU3NjA1Ng%3D%3D.3-ccb7-5&oh=00_AfONuLuNuAaleIaU42ijltr45hsuZDmBmbgcl61RRhG42g&oe=68547B24&_nc_sid=7a9f4b\",\"dataAiHint\":\"wood art\"}],\"price\":\"Rs. 2750\",\"category\":\"Wall Art\",\"featured\":false,\"sizeAndDimensions\":\"20 x 20 x 2 inches\",\"material\":\"Mango Wood\",\"reviews\":[]},{\"id\":\"p15\",\"name\":\"Round Mirror with Golden Border\",\"description\":\"Reflect Elegance in Every Corner. This stunning Round Mirror with intricate golden border detailing adds a luxurious touch to any space.\",\"careInstructions\":\"Wipe clean with a soft, dry cloth. Avoid direct sunlight and moisture.\",\"imageUrls\":[{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506309392_17843718495510460_2073517584318478376_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=WgFbeWkmJJYQ7kNvwE_JDfw&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MjYzMTAyNTY3MjAzNQ%3D%3D.3-ccb7-5&oh=00_AfPuF-GMrpYvU9bdrHmrPCHtwnn14_ihpmyYtSw7Kss6HQ&oe=68549294&_nc_sid=7a9f4b\",\"dataAiHint\":\"round mirror\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506007921_17843718507510460_6959104181918595262_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=vfOC6_WfNCcQ7kNvwEDVQ4i&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MjYzMTE1OTc5NjgwMg%3D%3D.3-ccb7-5&oh=00_AfPnANvCsUU2_BwWogN9Zw8aJ6Jyeq4qWp1upD0YVucsig&oe=68546CD6&_nc_sid=7a9f4b\",\"dataAiHint\":\"round mirror\"},{\"url\":\"https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-15/506305475_17843718516510460_4528542147462850323_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QG5TatBFDZK_i_5ryUdLidWbHEIshUyVu7Z05NuozZXLIbcPfM7VFJhkDUn8rDc8WxlqW--rLSDN6W1bGM_06fw&_nc_ohc=F0UX2mXEZZ8Q7kNvwGx79iS&_nc_gid=I1f48jpTSV4UkrOOj59RmA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY1NDY5MjYzMTE2ODQxNDYzMQ%3D%3D.3-ccb7-5&oh=00_AfPmwssmIktaNbrYWd3QHzsjnloouTz8MG0jruXox63dVA&oe=68549652&_nc_sid=7a9f4b\",\"dataAiHint\":\"round mirror\"}],\"price\":\"Rs. 3250\",\"category\":\"Mirrors\",\"featured\":false,\"sizeAndDimensions\":\"26.5 x 0.60 x 27.5 inches\",\"material\":\"Glass with metal frame\",\"reviews\":[]}]"));}}),
"[project]/src/lib/mock-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "MOCK_PRODUCTS": (()=>MOCK_PRODUCTS)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$products$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/lib/data/products.json (json)");
;
const MOCK_PRODUCTS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$products$2e$json__$28$json$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/footer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Footer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Simple inline SVG for WhatsApp icon
const WhatsAppIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "h-5 w-5 group-hover:scale-110 transition-transform duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/footer.tsx",
            lineNumber: 25,
            columnNumber: 5
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/footer.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, this);
_c = WhatsAppIcon;
function Footer() {
    _s();
    const currentYear = new Date().getFullYear();
    const productCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Footer.useMemo[productCategories]": ()=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PRODUCTS"] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PRODUCTS"].length === 0) {
                return [];
            }
            const uniqueCategories = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_PRODUCTS"].map({
                "Footer.useMemo[productCategories]": (p)=>p.category
            }["Footer.useMemo[productCategories]"]).filter(Boolean));
            return Array.from(uniqueCategories).sort();
        }
    }["Footer.useMemo[productCategories]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "py-12 md:py-16 px-4 md:px-8 border-t border-border/50 mt-auto bg-secondary/30 text-foreground",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-10 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-headline text-xl text-primary mb-4",
                            children: "Aarambh Decor"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground leading-relaxed",
                            children: "Celebrating tradition, creativity, and individuality through thoughtfully curated home decor."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 items-start mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-lg mb-4 text-foreground text-center",
                                    children: "Quick Links"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2.5 text-center md:text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/about",
                                                className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                                children: "About Us"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 60,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/contact",
                                                className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                                children: "Contact Us"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 61,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/faq",
                                                className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                                children: "FAQs"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 62,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/shipping-returns",
                                                className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                                children: "Shipping & Returns"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 63,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/privacy-policy",
                                                className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                                children: "Privacy Policy"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 64,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 64,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/terms-conditions",
                                                className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                                children: "Terms & Conditions"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-lg mb-4 text-foreground text-center",
                                    children: "Collections"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2.5 text-center md:text-left",
                                    children: [
                                        productCategories.length > 0 ? productCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/collections?category=${encodeURIComponent(category)}`,
                                                    className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                                    children: category
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 21
                                                }, this)
                                            }, category, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: "No specific categories found."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 86,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 85,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/collections",
                                                className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                                children: "View All"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2 md:col-span-1 flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-lg mb-4 text-foreground text-center",
                                    children: "Connect With Us"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col space-y-3 items-center md:items-start",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://chat.whatsapp.com/F7s9qoIos56HiZBbN1H2O3",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            "aria-label": "Join our WhatsApp Community",
                                            className: "flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WhatsAppIcon, {}, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Join our WhatsApp Community"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://www.instagram.com/_aarambh_decor/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            "aria-label": "Join us on Instagram",
                                            className: "flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                    className: "h-5 w-5 group-hover:scale-110 transition-transform duration-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Join us on Instagram"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/footer.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 107,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2 md:col-span-1 flex justify-center items-start",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                "aria-label": "Aarambh Decor Home",
                                className: "block w-full max-w-[120px] sm:max-w-[150px] md:max-w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-full",
                                    style: {
                                        paddingTop: '100%'
                                    },
                                    children: [
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b",
                                            alt: "Aarambh Decor Logo",
                                            fill: true,
                                            style: {
                                                objectFit: 'contain'
                                            },
                                            className: "rounded-lg transition-opacity hover:opacity-80",
                                            "data-ai-hint": "logo",
                                            sizes: "(max-width: 768px) 120px, 150px"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 124,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 123,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/footer.tsx",
                                lineNumber: 122,
                                columnNumber: 14
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-border/30 pt-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: [
                                "© ",
                                currentYear,
                                " Aarambh Decor. All rights reserved."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted-foreground mt-2 flex items-center justify-center",
                            children: [
                                "Designed with ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                    className: "h-3.5 w-3.5 mx-1 text-primary fill-primary",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 142,
                                    columnNumber: 27
                                }, this),
                                " by a lover of tradition."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/footer.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/footer.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(Footer, "DfJ9juwRG32VQeYjiUCmQAMUhH4=");
_c1 = Footer;
var _c, _c1;
__turbopack_context__.k.register(_c, "WhatsAppIcon");
__turbopack_context__.k.register(_c1, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, this));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/wishlist-icon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "WishlistIcon": (()=>WishlistIcon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function WishlistIcon({ isWishlisted, onClick, className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        variant: "ghost",
        size: "icon",
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-full hover:bg-red-100 dark:hover:bg-red-900/50", // isWishlisted is false, so it will always be text-muted-foreground
        "text-muted-foreground hover:text-red-500", className),
        "aria-label": "Wishlist (disabled)",
        disabled: true,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-5 w-5 transition-all")
        }, void 0, false, {
            fileName: "[project]/src/components/wishlist-icon.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/wishlist-icon.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = WishlistIcon;
var _c;
__turbopack_context__.k.register(_c, "WishlistIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/product-card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ProductCard": (()=>ProductCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wishlist$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/wishlist-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function ProductCard({ product, className: propClassName }) {
    _s();
    const [currentImageIndex, setCurrentImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isHovering, setIsHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const imagesToDisplay = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [
        {
            url: 'https://placehold.co/600x400.png',
            dataAiHint: 'placeholder image'
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductCard.useEffect": ()=>{
            if (isHovering && imagesToDisplay.length > 1) {
                intervalRef.current = setInterval({
                    "ProductCard.useEffect": ()=>{
                        setCurrentImageIndex({
                            "ProductCard.useEffect": (prevIndex)=>(prevIndex + 1) % imagesToDisplay.length
                        }["ProductCard.useEffect"]);
                    }
                }["ProductCard.useEffect"], 1000);
            } else {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }
            return ({
                "ProductCard.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            })["ProductCard.useEffect"];
        }
    }["ProductCard.useEffect"], [
        isHovering,
        imagesToDisplay.length
    ]);
    const handleMouseEnter = ()=>{
        if (imagesToDisplay.length > 1) {
            setIsHovering(true);
        }
    };
    const handleMouseLeave = ()=>{
        if (imagesToDisplay.length > 1) {
            setIsHovering(false);
            setCurrentImageIndex(0);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    };
    const handleDisabledWishlist = ()=>{
        toast({
            title: "Feature Disabled",
            description: "Wishlist functionality is currently unavailable.",
            variant: "default"
        });
    };
    const handleDisabledCart = ()=>{
        toast({
            title: "Cart Disabled",
            description: "User-specific cart functionality is currently unavailable.",
            variant: "default"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("shadow-lg flex flex-col rounded-lg border-border/70 overflow-hidden", "w-[calc(50%-theme(spacing.3))] sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]", "transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl", "animate-pop-in", propClassName),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "p-0 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/product/${product.id}`,
                        "aria-label": `View details for ${product.name}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full aspect-square rounded-t-lg overflow-hidden" // Added overflow-hidden
                            ,
                            onMouseEnter: handleMouseEnter,
                            onMouseLeave: handleMouseLeave,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-full transition-transform duration-500 ease-in-out",
                                style: {
                                    width: `${imagesToDisplay.length * 100}%`,
                                    transform: `translateX(-${currentImageIndex / imagesToDisplay.length * 100}%)`
                                },
                                children: imagesToDisplay.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full flex-shrink-0 relative",
                                        style: {
                                            width: `${100 / imagesToDisplay.length}%`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: image.url,
                                            alt: `${product.name} image ${index + 1}`,
                                            fill: true,
                                            style: {
                                                objectFit: 'cover',
                                                objectPosition: 'top'
                                            },
                                            "data-ai-hint": image.dataAiHint,
                                            sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
                                            priority: index === 0
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/product-card.tsx",
                                            lineNumber: 102,
                                            columnNumber: 19
                                        }, this)
                                    }, index, false, {
                                        fileName: "[project]/src/components/product-card.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/product-card.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/product-card.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/product-card.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 right-2 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$wishlist$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WishlistIcon"], {
                            isWishlisted: false,
                            onClick: handleDisabledWishlist,
                            className: "bg-background/70 hover:bg-background",
                            disabled: true
                        }, void 0, false, {
                            fileName: "[project]/src/components/product-card.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/product-card.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product-card.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "p-3 flex flex-col flex-grow min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "font-headline text-lg mb-2 leading-tight break-words",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/product/${product.id}`,
                                    className: "hover:text-primary transition-colors",
                                    children: product.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product-card.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product-card.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                className: "text-sm text-muted-foreground mb-2 line-clamp-3",
                                children: product.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/product-card.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product-card.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mt-auto pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold text-primary text-lg",
                                children: product.price
                            }, void 0, false, {
                                fileName: "[project]/src/components/product-card.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                size: "icon",
                                className: "h-8 w-8",
                                onClick: handleDisabledCart,
                                "aria-label": "Add to cart (disabled)",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product-card.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/product-card.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product-card.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product-card.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                className: "px-3 pb-3 pt-0"
            }, void 0, false, {
                fileName: "[project]/src/components/product-card.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/product-card.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(ProductCard, "oXP8uG/P1ErGuitheZ3YRdCDX2A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/ai/flows/data:5bf238 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"4005e1060a3a5ae5f10a35c471fcac3cc4e9863a5b":"recommendProductsFromImage"},"src/ai/flows/recommend-products-from-image-flow.ts",""] */ __turbopack_context__.s({
    "recommendProductsFromImage": (()=>recommendProductsFromImage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var recommendProductsFromImage = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("4005e1060a3a5ae5f10a35c471fcac3cc4e9863a5b", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "recommendProductsFromImage"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcmVjb21tZW5kLXByb2R1Y3RzLWZyb20taW1hZ2UtZmxvdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcbi8qKlxuICogQGZpbGVPdmVydmlldyBBSS1wb3dlcmVkIHByb2R1Y3QgcmVjb21tZW5kYXRpb25zIGJhc2VkIG9uIGFuIHVwbG9hZGVkIGltYWdlIG9mIGEgdXNlcidzIHNwYWNlXG4gKiBhbmQgYSBsaXN0IG9mIGF2YWlsYWJsZSBwcm9kdWN0cy5cbiAqXG4gKiAtIHJlY29tbWVuZFByb2R1Y3RzRnJvbUltYWdlIC0gQSBmdW5jdGlvbiB0aGF0IHJlY29tbWVuZHMgcHJvZHVjdHMuXG4gKiAtIFJlY29tbWVuZFByb2R1Y3RzRnJvbUltYWdlSW5wdXQgLSBUaGUgaW5wdXQgdHlwZSBmb3IgdGhlIGZ1bmN0aW9uLlxuICogLSBSZWNvbW1lbmRQcm9kdWN0c0Zyb21JbWFnZU91dHB1dCAtIFRoZSByZXR1cm4gdHlwZSBmb3IgdGhlIGZ1bmN0aW9uLlxuICovXG5cbmltcG9ydCB7YWl9IGZyb20gJ0AvYWkvZ2Vua2l0JztcbmltcG9ydCB7en0gZnJvbSAnZ2Vua2l0JztcblxuLy8gRGVmaW5lIGEgc2NoZW1hIGZvciBzaW1wbGlmaWVkIHByb2R1Y3QgaW5mb3JtYXRpb24gdG8gYmUgcGFzc2VkIHRvIHRoZSBBSVxuY29uc3QgU2ltcGxpZmllZFByb2R1Y3RJbmZvU2NoZW1hID0gei5vYmplY3Qoe1xuICBpZDogei5zdHJpbmcoKSxcbiAgbmFtZTogei5zdHJpbmcoKSxcbiAgZGVzY3JpcHRpb246IHouc3RyaW5nKCksXG4gIGNhdGVnb3J5OiB6LnN0cmluZygpLm9wdGlvbmFsKCksXG59KTtcblxuY29uc3QgUmVjb21tZW5kUHJvZHVjdHNGcm9tSW1hZ2VJbnB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgaW1hZ2VEYXRhVXJpOiB6XG4gICAgLnN0cmluZygpXG4gICAgLmRlc2NyaWJlKFxuICAgICAgXCJBIHBob3RvIG9mIHRoZSB1c2VyJ3Mgc3BhY2UsIGFzIGEgZGF0YSBVUkkgdGhhdCBtdXN0IGluY2x1ZGUgYSBNSU1FIHR5cGUgYW5kIHVzZSBCYXNlNjQgZW5jb2RpbmcuIEV4cGVjdGVkIGZvcm1hdDogJ2RhdGE6PG1pbWV0eXBlPjtiYXNlNjQsPGVuY29kZWRfZGF0YT4nLlwiXG4gICAgKSxcbiAgYXZhaWxhYmxlUHJvZHVjdHNKc29uOiB6XG4gICAgLnN0cmluZygpXG4gICAgLmRlc2NyaWJlKFxuICAgICAgJ0EgSlNPTiBzdHJpbmcgcmVwcmVzZW50aW5nIGFuIGFycmF5IG9mIGF2YWlsYWJsZSBwcm9kdWN0cy4gRWFjaCBwcm9kdWN0IG9iamVjdCBzaG91bGQgaW5jbHVkZSBhdCBsZWFzdCBpZCwgbmFtZSwgYW5kIGRlc2NyaXB0aW9uLidcbiAgICApLFxufSk7XG5leHBvcnQgdHlwZSBSZWNvbW1lbmRQcm9kdWN0c0Zyb21JbWFnZUlucHV0ID0gei5pbmZlcjxcbiAgdHlwZW9mIFJlY29tbWVuZFByb2R1Y3RzRnJvbUltYWdlSW5wdXRTY2hlbWFcbj47XG5cbmNvbnN0IFJlY29tbWVuZGVkUHJvZHVjdFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgcHJvZHVjdElkOiB6LnN0cmluZygpLmRlc2NyaWJlKCdUaGUgSUQgb2YgdGhlIHJlY29tbWVuZGVkIHByb2R1Y3QuJyksXG4gIHByb2R1Y3ROYW1lOiB6LnN0cmluZygpLmRlc2NyaWJlKCdUaGUgbmFtZSBvZiB0aGUgcmVjb21tZW5kZWQgcHJvZHVjdC4nKSxcbiAgcmVhc29uOiB6XG4gICAgLnN0cmluZygpXG4gICAgLmRlc2NyaWJlKCdBIGJyaWVmIGV4cGxhbmF0aW9uIHdoeSB0aGlzIHByb2R1Y3QgaXMgYSBnb29kIGZpdCBmb3IgdGhlIHNwYWNlIGluIHRoZSBpbWFnZS4nKSxcbn0pO1xuXG5jb25zdCBSZWNvbW1lbmRQcm9kdWN0c0Zyb21JbWFnZU91dHB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgcmVjb21tZW5kYXRpb25zOiB6XG4gICAgLmFycmF5KFJlY29tbWVuZGVkUHJvZHVjdFNjaGVtYSlcbiAgICAuZGVzY3JpYmUoJ0EgbGlzdCBvZiByZWNvbW1lbmRlZCBwcm9kdWN0cyB3aXRoIHJlYXNvbnMuJyksXG4gIG92ZXJhbGxGZWVkYmFjazogei5zdHJpbmcoKS5vcHRpb25hbCgpLmRlc2NyaWJlKCdHZW5lcmFsIGZlZWRiYWNrIG9yIG9ic2VydmF0aW9ucyBhYm91dCB0aGUgc3BhY2UgaW4gdGhlIGltYWdlLCBpZiBhbnkuJylcbn0pO1xuZXhwb3J0IHR5cGUgUmVjb21tZW5kUHJvZHVjdHNGcm9tSW1hZ2VPdXRwdXQgPSB6LmluZmVyPFxuICB0eXBlb2YgUmVjb21tZW5kUHJvZHVjdHNGcm9tSW1hZ2VPdXRwdXRTY2hlbWFcbj47XG5leHBvcnQgdHlwZSBSZWNvbW1lbmRlZFByb2R1Y3QgPSB6LmluZmVyPHR5cGVvZiBSZWNvbW1lbmRlZFByb2R1Y3RTY2hlbWE+O1xuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWNvbW1lbmRQcm9kdWN0c0Zyb21JbWFnZShcbiAgaW5wdXQ6IFJlY29tbWVuZFByb2R1Y3RzRnJvbUltYWdlSW5wdXRcbik6IFByb21pc2U8UmVjb21tZW5kUHJvZHVjdHNGcm9tSW1hZ2VPdXRwdXQ+IHtcbiAgcmV0dXJuIHJlY29tbWVuZFByb2R1Y3RzRnJvbUltYWdlRmxvdyhpbnB1dCk7XG59XG5cbmNvbnN0IHByb21wdCA9IGFpLmRlZmluZVByb21wdCh7XG4gIG5hbWU6ICdyZWNvbW1lbmRQcm9kdWN0c0Zyb21JbWFnZVByb21wdCcsXG4gIGlucHV0OiB7c2NoZW1hOiBSZWNvbW1lbmRQcm9kdWN0c0Zyb21JbWFnZUlucHV0U2NoZW1hfSxcbiAgb3V0cHV0OiB7c2NoZW1hOiBSZWNvbW1lbmRQcm9kdWN0c0Zyb21JbWFnZU91dHB1dFNjaGVtYX0sXG4gIHByb21wdDogYFlvdSBhcmUgYW4gZXhwZXJ0IGludGVyaW9yIGRlc2lnbiBjb25zdWx0YW50IGZvciAnQWFyYW1iaCBEZWNvcicsIHNwZWNpYWxpemluZyBpbiBob21lIGRlY29yLlxuQSB1c2VyIGhhcyB1cGxvYWRlZCBhbiBpbWFnZSBvZiBhIHNwYWNlIHRoZXkgd2lzaCB0byBkZWNvcmF0ZS4gWW91ciB0YXNrIGlzIHRvIGFuYWx5emUgdGhpcyBpbWFnZTpcblVzZXIncyBTcGFjZToge3ttZWRpYSB1cmw9aW1hZ2VEYXRhVXJpfX1cblxuQmFzZWQgb24gdGhlIHN0eWxlLCBjb2xvcnMsIGxpZ2h0aW5nLCBleGlzdGluZyBlbGVtZW50cywgYW5kIG92ZXJhbGwgYW1iaWFuY2UgaW4gdGhlIGltYWdlLCByZWNvbW1lbmQgdXAgdG8gMy01IHByb2R1Y3RzIGZyb20gdGhlIGZvbGxvd2luZyBsaXN0IHRoYXQgd291bGQgY29tcGxlbWVudCBvciBlbmhhbmNlIHRoZSBzcGFjZS4gRm9yIGVhY2ggcmVjb21tZW5kZWQgcHJvZHVjdCwgcHJvdmlkZSBhIGNvbmNpc2UgcmVhc29uICgxLTIgc2VudGVuY2VzKSB3aHkgaXQncyBhIGdvb2QgZml0LlxuXG5BdmFpbGFibGUgQWFyYW1iaCBEZWNvciBwcm9kdWN0cyAoSlNPTiBmb3JtYXQpOlxue3t7YXZhaWxhYmxlUHJvZHVjdHNKc29ufX19XG5cbkZvY3VzIG9uIGhvdyB0aGUgcHJvZHVjdHMgd291bGQgdmlzdWFsbHkgYW5kIHN0eWxpc3RpY2FsbHkgaW50ZWdyYXRlIGludG8gdGhlIHVzZXIncyB1cGxvYWRlZCBpbWFnZS5cbklmIHRoZSBpbWFnZSBpcyB1bmNsZWFyIG9yIG5vdCBhIHJvb20sIHN0YXRlIHRoYXQgeW91IGNhbm5vdCBwcm92aWRlIHJlY29tbWVuZGF0aW9ucyBiYXNlZCBvbiB0aGUgaW1hZ2UuXG5Qcm92aWRlIHNvbWUgYnJpZWYgb3ZlcmFsbCBmZWVkYmFjayBvciBvYnNlcnZhdGlvbnMgYWJvdXQgdGhlIHVzZXIncyBzcGFjZSBpZiB5b3UgaGF2ZSBhbnksIHNlcGFyYXRlIGZyb20gdGhlIHByb2R1Y3QgcmVjb21tZW5kYXRpb25zLlxuUmV0dXJuIHlvdXIgcmVjb21tZW5kYXRpb25zIGFzIGEgbGlzdCBvZiBvYmplY3RzLCBlYWNoIGNvbnRhaW5pbmcgJ3Byb2R1Y3RJZCcsICdwcm9kdWN0TmFtZScsIGFuZCAncmVhc29uJy5cbkVuc3VyZSAncHJvZHVjdElkJyBhbmQgJ3Byb2R1Y3ROYW1lJyBleGFjdGx5IG1hdGNoIHRoZSBwcm92aWRlZCBwcm9kdWN0IGxpc3QuXG5gLFxufSk7XG5cbmNvbnN0IHJlY29tbWVuZFByb2R1Y3RzRnJvbUltYWdlRmxvdyA9IGFpLmRlZmluZUZsb3coXG4gIHtcbiAgICBuYW1lOiAncmVjb21tZW5kUHJvZHVjdHNGcm9tSW1hZ2VGbG93JyxcbiAgICBpbnB1dFNjaGVtYTogUmVjb21tZW5kUHJvZHVjdHNGcm9tSW1hZ2VJbnB1dFNjaGVtYSxcbiAgICBvdXRwdXRTY2hlbWE6IFJlY29tbWVuZFByb2R1Y3RzRnJvbUltYWdlT3V0cHV0U2NoZW1hLFxuICB9LFxuICBhc3luYyBpbnB1dCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIEpTT04ucGFyc2UoaW5wdXQuYXZhaWxhYmxlUHJvZHVjdHNKc29uKTsgLy8gVmFsaWRhdGUgSlNPTlxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgSlNPTiBmb3JtYXQgZm9yIGF2YWlsYWJsZVByb2R1Y3RzSnNvbi5cIik7XG4gICAgfVxuICAgIGNvbnN0IHtvdXRwdXR9ID0gYXdhaXQgcHJvbXB0KGlucHV0KTtcbiAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBSSBmYWlsZWQgdG8gZ2VuZXJhdGUgcmVjb21tZW5kYXRpb25zLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoic1VBMERzQiJ9
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Input": (()=>Input)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, this);
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/label.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Label": (()=>Label)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const labelVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, this));
_c1 = Label;
Label.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label$React.forwardRef");
__turbopack_context__.k.register(_c1, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/alert.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Alert": (()=>Alert),
    "AlertDescription": (()=>AlertDescription),
    "AlertTitle": (()=>AlertTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
    variants: {
        variant: {
            default: "bg-background text-foreground",
            destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Alert = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, variant, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert.tsx",
        lineNumber: 26,
        columnNumber: 3
    }, this));
_c1 = Alert;
Alert.displayName = "Alert";
const AlertTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mb-1 font-medium leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, this));
_c3 = AlertTitle;
AlertTitle.displayName = "AlertTitle";
const AlertDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm [&_p]:leading-relaxed", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
_c5 = AlertDescription;
AlertDescription.displayName = "AlertDescription";
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Alert$React.forwardRef");
__turbopack_context__.k.register(_c1, "Alert");
__turbopack_context__.k.register(_c2, "AlertTitle$React.forwardRef");
__turbopack_context__.k.register(_c3, "AlertTitle");
__turbopack_context__.k.register(_c4, "AlertDescription$React.forwardRef");
__turbopack_context__.k.register(_c5, "AlertDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/products/data:833986 [app-client] (ecmascript) <text/javascript>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"009c0e4f9c36b44a23d3734f13b4298bc7b33dd084":"getProducts"},"src/app/products/actions.ts",""] */ __turbopack_context__.s({
    "getProducts": (()=>getProducts)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var getProducts = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("009c0e4f9c36b44a23d3734f13b4298bc7b33dd084", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getProducts"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgZGIgfSBmcm9tICdAL2xpYi9maXJlYmFzZSc7XG5pbXBvcnQgeyBjb2xsZWN0aW9uLCBkb2MsIGdldERvYywgZ2V0RG9jcywgcXVlcnksIHdoZXJlLCBsaW1pdCwgb3JkZXJCeSwgc2V0RG9jLCB3cml0ZUJhdGNoIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcbmltcG9ydCB0eXBlIHsgUHJvZHVjdCwgUmV2aWV3LCBQcm9kdWN0SW1hZ2UgfSBmcm9tICdAL2xpYi90eXBlcyc7XG5pbXBvcnQgeyBNT0NLX1BST0RVQ1RTIH0gZnJvbSAnQC9saWIvbW9jay1kYXRhJztcblxuaW50ZXJmYWNlIFNlZWRSZXN1bHQge1xuICBzdWNjZXNzOiBib29sZWFuO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGNvdW50PzogbnVtYmVyO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VlZFByb2R1Y3RzVG9GaXJlc3RvcmUoKTogUHJvbWlzZTxTZWVkUmVzdWx0PiB7XG4gIGlmICghZGIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwic2VlZFByb2R1Y3RzVG9GaXJlc3RvcmU6IEZpcmVzdG9yZSBkYXRhYmFzZSBpbnN0YW5jZSBpcyBub3QgYXZhaWxhYmxlLiBBYm9ydGluZyBzZWVkLlwiKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJEYXRhYmFzZSBzZXJ2aWNlIGlzIG5vdCBhdmFpbGFibGUuIFNlZWRpbmcgYWJvcnRlZC5cIiB9O1xuICB9XG4gIGlmIChNT0NLX1BST0RVQ1RTLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnNvbGUud2FybihcInNlZWRQcm9kdWN0c1RvRmlyZXN0b3JlOiBObyBtb2NrIHByb2R1Y3RzIGZvdW5kIHRvIHNlZWQuXCIpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIk5vIG1vY2sgcHJvZHVjdHMgZm91bmQgdG8gc2VlZC5cIiB9O1xuICB9XG4gIGNvbnNvbGUubG9nKGBzZWVkUHJvZHVjdHNUb0ZpcmVzdG9yZTogQXR0ZW1wdGluZyB0byBzZWVkICR7TU9DS19QUk9EVUNUUy5sZW5ndGh9IHByb2R1Y3RzLi4uYCk7XG5cbiAgY29uc3QgYmF0Y2ggPSB3cml0ZUJhdGNoKGRiKTtcbiAgbGV0IHNlZWRlZENvdW50ID0gMDtcblxuICBNT0NLX1BST0RVQ1RTLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgY29uc3QgcHJvZHVjdERvY1JlZiA9IGRvYyhkYiwgJ3Byb2R1Y3RzJywgcHJvZHVjdC5pZCk7XG4gICAgY29uc3QgcHJvZHVjdERhdGE6IE9taXQ8UHJvZHVjdCwgJ2lkJz4gPSB7XG4gICAgICBuYW1lOiBwcm9kdWN0Lm5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogcHJvZHVjdC5kZXNjcmlwdGlvbixcbiAgICAgIGNhcmVJbnN0cnVjdGlvbnM6IHByb2R1Y3QuY2FyZUluc3RydWN0aW9ucyxcbiAgICAgIGltYWdlVXJsczogcHJvZHVjdC5pbWFnZVVybHMubWFwKGltZyA9PiAoeyB1cmw6IGltZy51cmwsIGRhdGFBaUhpbnQ6IGltZy5kYXRhQWlIaW50IH0gYXMgUHJvZHVjdEltYWdlKSksXG4gICAgICBwcmljZTogcHJvZHVjdC5wcmljZSxcbiAgICAgIGNhdGVnb3J5OiBwcm9kdWN0LmNhdGVnb3J5LFxuICAgICAgZmVhdHVyZWQ6IHByb2R1Y3QuZmVhdHVyZWQgfHwgZmFsc2UsXG4gICAgICBzaXplQW5kRGltZW5zaW9uczogcHJvZHVjdC5zaXplQW5kRGltZW5zaW9ucyxcbiAgICAgIG1hdGVyaWFsOiBwcm9kdWN0Lm1hdGVyaWFsLFxuICAgICAgcmV2aWV3czogcHJvZHVjdC5yZXZpZXdzID8gcHJvZHVjdC5yZXZpZXdzLm1hcChyID0+ICh7IC4uLnIgfSBhcyBSZXZpZXcpKSA6IFtdLFxuICAgIH07XG4gICAgYmF0Y2guc2V0KHByb2R1Y3REb2NSZWYsIHByb2R1Y3REYXRhKTtcbiAgICBzZWVkZWRDb3VudCsrO1xuICB9KTtcblxuICB0cnkge1xuICAgIGF3YWl0IGJhdGNoLmNvbW1pdCgpO1xuICAgIGNvbnNvbGUubG9nKGBzZWVkUHJvZHVjdHNUb0ZpcmVzdG9yZTogU3VjY2Vzc2Z1bGx5IHNlZWRlZCAke3NlZWRlZENvdW50fSBwcm9kdWN0cy5gKTtcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBgU3VjY2Vzc2Z1bGx5IHNlZWRlZCAke3NlZWRlZENvdW50fSBwcm9kdWN0cyB0byBGaXJlc3RvcmUuYCwgY291bnQ6IHNlZWRlZENvdW50IH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNlZWRpbmcgcHJvZHVjdHMgdG8gRmlyZXN0b3JlOlwiLCBlcnJvcik7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIkFuIHVua25vd24gZXJyb3Igb2NjdXJyZWQgZHVyaW5nIHNlZWRpbmcuXCI7XG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGBGYWlsZWQgdG8gc2VlZCBwcm9kdWN0czogJHtlcnJvck1lc3NhZ2V9YCB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9kdWN0cygpOiBQcm9taXNlPFByb2R1Y3RbXT4ge1xuICBpZiAoIWRiKSB7XG4gICAgY29uc29sZS5lcnJvcihcImdldFByb2R1Y3RzOiBGaXJlc3RvcmUgZGF0YWJhc2UgaW5zdGFuY2UgaXMgbm90IGF2YWlsYWJsZS4gRmFsbGluZyBiYWNrIHRvIE1PQ0tfUFJPRFVDVFMuXCIpO1xuICAgIHJldHVybiBNT0NLX1BST0RVQ1RTO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coJ2dldFByb2R1Y3RzOiBBdHRlbXB0aW5nIHRvIGZldGNoIHByb2R1Y3RzIGZyb20gRmlyZXN0b3JlLi4uJyk7XG4gICAgY29uc3QgcHJvZHVjdHNDb2xSZWYgPSBjb2xsZWN0aW9uKGRiLCAncHJvZHVjdHMnKTtcbiAgICBsZXQgcHJvZHVjdHNTbmFwID0gYXdhaXQgZ2V0RG9jcyhwcm9kdWN0c0NvbFJlZik7XG5cbiAgICBpZiAocHJvZHVjdHNTbmFwLmVtcHR5KSB7XG4gICAgICBjb25zb2xlLmxvZygnZ2V0UHJvZHVjdHM6IEZpcmVzdG9yZSBpcyBlbXB0eS4gQXR0ZW1wdGluZyB0byBzZWVkIGRhdGFiYXNlIHdpdGggbW9jayBkYXRhIGZyb20gcHJvZHVjdHMuanNvbi4uLicpO1xuICAgICAgY29uc3Qgc2VlZFJlc3VsdCA9IGF3YWl0IHNlZWRQcm9kdWN0c1RvRmlyZXN0b3JlKCk7XG4gICAgICBpZiAoc2VlZFJlc3VsdC5zdWNjZXNzICYmIHNlZWRSZXN1bHQuY291bnQgJiYgc2VlZFJlc3VsdC5jb3VudCA+IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coYGdldFByb2R1Y3RzOiBTZWVkaW5nIHN1Y2Nlc3NmdWw6ICR7c2VlZFJlc3VsdC5tZXNzYWdlfS4gUmUtZmV0Y2hpbmcgcHJvZHVjdHMgZnJvbSBGaXJlc3RvcmUuYCk7XG4gICAgICAgIHByb2R1Y3RzU25hcCA9IGF3YWl0IGdldERvY3MocHJvZHVjdHNDb2xSZWYpO1xuICAgICAgICBpZiAocHJvZHVjdHNTbmFwLmVtcHR5KSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFwiZ2V0UHJvZHVjdHM6IEZpcmVzdG9yZSBpcyBzdGlsbCBlbXB0eSBhZnRlciBzdWNjZXNzZnVsIHNlZWRpbmcgYW5kIHJlLWZldGNoLiBUaGlzIG1pZ2h0IGluZGljYXRlIGFuIGlzc3VlIHdpdGggZGF0YSBwcm9wYWdhdGlvbiBvciBGaXJlc3RvcmUgcnVsZXMuIEZhbGxpbmcgYmFjayB0byBNT0NLX1BST0RVQ1RTIChmcm9tIHByb2R1Y3RzLmpzb24pLlwiKTtcbiAgICAgICAgICByZXR1cm4gTU9DS19QUk9EVUNUUztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgZ2V0UHJvZHVjdHM6IFNlZWRpbmcgZmFpbGVkIG9yIHlpZWxkZWQgbm8gcHJvZHVjdHM6ICR7c2VlZFJlc3VsdC5tZXNzYWdlfS4gRmFsbGluZyBiYWNrIHRvIE1PQ0tfUFJPRFVDVFMgKGZyb20gcHJvZHVjdHMuanNvbikuYCk7XG4gICAgICAgIHJldHVybiBNT0NLX1BST0RVQ1RTO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBwcm9kdWN0czogUHJvZHVjdFtdID0gcHJvZHVjdHNTbmFwLmRvY3MubWFwKGRvY1NuYXAgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IGRvY1NuYXAuZGF0YSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGRvY1NuYXAuaWQsXG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSB8fCAnJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgIGNhcmVJbnN0cnVjdGlvbnM6IGRhdGEuY2FyZUluc3RydWN0aW9ucyB8fCAnJyxcbiAgICAgICAgaW1hZ2VVcmxzOiBkYXRhLmltYWdlVXJscyAmJiBkYXRhLmltYWdlVXJscy5sZW5ndGggPiAwID8gZGF0YS5pbWFnZVVybHMgOiBbeyB1cmw6ICdodHRwczovL3BsYWNlaG9sZC5jby82MDB4NDAwLnBuZycsIGRhdGFBaUhpbnQ6ICdwbGFjZWhvbGRlciBpbWFnZScgfV0sXG4gICAgICAgIHByaWNlOiBkYXRhLnByaWNlIHx8ICdScy4gMCcsXG4gICAgICAgIGNhdGVnb3J5OiBkYXRhLmNhdGVnb3J5IHx8ICdVbmNhdGVnb3JpemVkJyxcbiAgICAgICAgZmVhdHVyZWQ6IGRhdGEuZmVhdHVyZWQgfHwgZmFsc2UsXG4gICAgICAgIHNpemVBbmREaW1lbnNpb25zOiBkYXRhLnNpemVBbmREaW1lbnNpb25zIHx8ICdOL0EnLFxuICAgICAgICBtYXRlcmlhbDogZGF0YS5tYXRlcmlhbCB8fCAnTi9BJyxcbiAgICAgICAgcmV2aWV3czogZGF0YS5yZXZpZXdzIHx8IFtdLFxuICAgICAgfSBhcyBQcm9kdWN0O1xuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKGBnZXRQcm9kdWN0czogU3VjY2Vzc2Z1bGx5IGZldGNoZWQgJHtwcm9kdWN0cy5sZW5ndGh9IHByb2R1Y3RzIGZyb20gRmlyZXN0b3JlLmApO1xuICAgIHJldHVybiBwcm9kdWN0cztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiZ2V0UHJvZHVjdHM6IEVycm9yIGR1cmluZyBGaXJlc3RvcmUgb3BlcmF0aW9uOlwiLCBlcnJvciwgXCJGYWxsaW5nIGJhY2sgdG8gTU9DS19QUk9EVUNUUyAoZnJvbSBwcm9kdWN0cy5qc29uKS5cIik7XG4gICAgcmV0dXJuIE1PQ0tfUFJPRFVDVFM7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2R1Y3RCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFByb2R1Y3QgfCBudWxsPiB7XG4gIGlmICghZGIpIHtcbiAgICBjb25zb2xlLmVycm9yKGBnZXRQcm9kdWN0QnlJZDogRmlyZXN0b3JlIGRhdGFiYXNlIGluc3RhbmNlIGlzIG5vdCBhdmFpbGFibGUgZm9yIHByb2R1Y3QgJHtpZH0uIFJldHVybmluZyBudWxsLmApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coYGdldFByb2R1Y3RCeUlkOiBBdHRlbXB0aW5nIHRvIGZldGNoIHByb2R1Y3Qgd2l0aCBJRCAke2lkfSBmcm9tIEZpcmVzdG9yZS4uLmApO1xuICAgIGNvbnN0IHByb2R1Y3REb2NSZWYgPSBkb2MoZGIsICdwcm9kdWN0cycsIGlkKTtcbiAgICBjb25zdCBwcm9kdWN0U25hcCA9IGF3YWl0IGdldERvYyhwcm9kdWN0RG9jUmVmKTtcblxuICAgIGlmIChwcm9kdWN0U25hcC5leGlzdHMoKSkge1xuICAgICAgY29uc29sZS5sb2coYGdldFByb2R1Y3RCeUlkOiBQcm9kdWN0ICR7aWR9IGZvdW5kIGluIEZpcmVzdG9yZS5gKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBwcm9kdWN0U25hcC5kYXRhKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogcHJvZHVjdFNuYXAuaWQsXG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSB8fCAnJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24gfHwgJycsXG4gICAgICAgIGNhcmVJbnN0cnVjdGlvbnM6IGRhdGEuY2FyZUluc3RydWN0aW9ucyB8fCAnJyxcbiAgICAgICAgaW1hZ2VVcmxzOiBkYXRhLmltYWdlVXJscyAmJiBkYXRhLmltYWdlVXJscy5sZW5ndGggPiAwID8gZGF0YS5pbWFnZVVybHMgOiBbeyB1cmw6ICdodHRwczovL3BsYWNlaG9sZC5jby82MDB4NDAwLnBuZycsIGRhdGFBaUhpbnQ6ICdwbGFjZWhvbGRlciBpbWFnZScgfV0sXG4gICAgICAgIHByaWNlOiBkYXRhLnByaWNlIHx8ICdScy4gMCcsXG4gICAgICAgIGNhdGVnb3J5OiBkYXRhLmNhdGVnb3J5IHx8ICdVbmNhdGVnb3JpemVkJyxcbiAgICAgICAgZmVhdHVyZWQ6IGRhdGEuZmVhdHVyZWQgfHwgZmFsc2UsXG4gICAgICAgIHNpemVBbmREaW1lbnNpb25zOiBkYXRhLnNpemVBbmREaW1lbnNpb25zIHx8ICdOL0EnLFxuICAgICAgICBtYXRlcmlhbDogZGF0YS5tYXRlcmlhbCB8fCAnTi9BJyxcbiAgICAgICAgcmV2aWV3czogZGF0YS5yZXZpZXdzIHx8IFtdLFxuICAgICAgfSBhcyBQcm9kdWN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgZ2V0UHJvZHVjdEJ5SWQ6IFByb2R1Y3Qgd2l0aCBJRCAke2lkfSBub3QgZm91bmQgaW4gRmlyZXN0b3JlLmApO1xuICAgICAgY29uc3QgcHJvZHVjdHNDb2xSZWYgPSBjb2xsZWN0aW9uKGRiLCAncHJvZHVjdHMnKTtcbiAgICAgIGNvbnN0IHF1aWNrQ2hlY2tTbmFwID0gYXdhaXQgZ2V0RG9jcyhxdWVyeShwcm9kdWN0c0NvbFJlZiwgbGltaXQoMSkpKTtcbiAgICAgIGlmIChxdWlja0NoZWNrU25hcC5lbXB0eSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgZ2V0UHJvZHVjdEJ5SWQ6IFByb2R1Y3QgJHtpZH0gbm90IGZvdW5kLCBhbmQgcHJvZHVjdHMgY29sbGVjdGlvbiBzZWVtcyBlbXB0eS4gQXR0ZW1wdGluZyB0byBzZWVkLi4uYCk7XG4gICAgICAgIGNvbnN0IHNlZWRSZXN1bHQgPSBhd2FpdCBzZWVkUHJvZHVjdHNUb0ZpcmVzdG9yZSgpO1xuICAgICAgICAgaWYgKHNlZWRSZXN1bHQuc3VjY2VzcyAmJiBzZWVkUmVzdWx0LmNvdW50ICYmIHNlZWRSZXN1bHQuY291bnQgPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgZ2V0UHJvZHVjdEJ5SWQ6IFNlZWRpbmcgc3VjY2Vzc2Z1bCBhZnRlciAke2lkfSBub3QgZm91bmQuIFJlLWZldGNoaW5nIHByb2R1Y3QgJHtpZH0uYCk7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0U25hcEFmdGVyU2VlZCA9IGF3YWl0IGdldERvYyhwcm9kdWN0RG9jUmVmKTtcbiAgICAgICAgICAgIGlmIChwcm9kdWN0U25hcEFmdGVyU2VlZC5leGlzdHMoKSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgZ2V0UHJvZHVjdEJ5SWQ6IFByb2R1Y3QgJHtpZH0gZm91bmQgYWZ0ZXIgc2VlZGluZy5gKTtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHByb2R1Y3RTbmFwQWZ0ZXJTZWVkLmRhdGEoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogcHJvZHVjdFNuYXBBZnRlclNlZWQuaWQsXG4gICAgICAgICAgICAgICAgbmFtZTogZGF0YS5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLmRlc2NyaXB0aW9uIHx8ICcnLFxuICAgICAgICAgICAgICAgIGNhcmVJbnN0cnVjdGlvbnM6IGRhdGEuY2FyZUluc3RydWN0aW9ucyB8fCAnJyxcbiAgICAgICAgICAgICAgICBpbWFnZVVybHM6IGRhdGEuaW1hZ2VVcmxzICYmIGRhdGEuaW1hZ2VVcmxzLmxlbmd0aCA+IDAgPyBkYXRhLmltYWdlVXJscyA6IFt7IHVybDogJ2h0dHBzOi8vcGxhY2Vob2xkLmNvLzYwMHg0MDAucG5nJywgZGF0YUFpSGludDogJ3BsYWNlaG9sZGVyIGltYWdlJyB9XSxcbiAgICAgICAgICAgICAgICBwcmljZTogZGF0YS5wcmljZSB8fCAnUnMuIDAnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBkYXRhLmNhdGVnb3J5IHx8ICdVbmNhdGVnb3JpemVkJyxcbiAgICAgICAgICAgICAgICBmZWF0dXJlZDogZGF0YS5mZWF0dXJlZCB8fCBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaXplQW5kRGltZW5zaW9uczogZGF0YS5zaXplQW5kRGltZW5zaW9ucyB8fCAnTi9BJyxcbiAgICAgICAgICAgICAgICBtYXRlcmlhbDogZGF0YS5tYXRlcmlhbCB8fCAnTi9BJyxcbiAgICAgICAgICAgICAgICByZXZpZXdzOiBkYXRhLnJldmlld3MgfHwgW10sXG4gICAgICAgICAgICAgIH0gYXMgUHJvZHVjdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBnZXRQcm9kdWN0QnlJZDogUHJvZHVjdCAke2lkfSBzdGlsbCBub3QgZm91bmQgYWZ0ZXIgYXR0ZW1wdGluZyB0byBzZWVkLiBSZXR1cm5pbmcgbnVsbC5gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZ2V0UHJvZHVjdEJ5SWQ6IFNlZWRpbmcgZmFpbGVkIG9yIHlpZWxkZWQgbm8gcHJvZHVjdHMgd2hlbiB0cnlpbmcgdG8gZmluZCAke2lkfTogJHtzZWVkUmVzdWx0Lm1lc3NhZ2V9LiBSZXR1cm5pbmcgbnVsbC5gKTtcbiAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coYGdldFByb2R1Y3RCeUlkOiBQcm9kdWN0ICR7aWR9IG5vdCBmb3VuZCBhbmQgY29sbGVjdGlvbiB3YXMgbm90IGVtcHR5IG9yIHNlZWRpbmcgZGlkIG5vdCBmaW5kIGl0LiBSZXR1cm5pbmcgbnVsbC5gKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBnZXRQcm9kdWN0QnlJZDogRXJyb3IgZmV0Y2hpbmcgcHJvZHVjdCB3aXRoIElEICR7aWR9OmAsIGVycm9yLCBcIlJldHVybmluZyBudWxsLlwiKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RmVhdHVyZWRQcm9kdWN0cyhjb3VudDogbnVtYmVyKTogUHJvbWlzZTxQcm9kdWN0W10+IHtcbiAgaWYgKCFkYikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJnZXRGZWF0dXJlZFByb2R1Y3RzOiBGaXJlc3RvcmUgZGF0YWJhc2UgaW5zdGFuY2UgaXMgbm90IGF2YWlsYWJsZS4gRmFsbGluZyBiYWNrIHRvIE1PQ0tfUFJPRFVDVFMuXCIpO1xuICAgIHJldHVybiBNT0NLX1BST0RVQ1RTLmZpbHRlcihwID0+IHAuZmVhdHVyZWQpLnNsaWNlKDAsIGNvdW50KTtcbiAgfVxuICB0cnkge1xuICAgIGNvbnNvbGUubG9nKGBnZXRGZWF0dXJlZFByb2R1Y3RzOiBBdHRlbXB0aW5nIHRvIGZldGNoICR7Y291bnR9IGZlYXR1cmVkIHByb2R1Y3RzIGZyb20gRmlyZXN0b3JlLi4uYCk7XG4gICAgY29uc3QgcHJvZHVjdHNDb2xSZWYgPSBjb2xsZWN0aW9uKGRiLCAncHJvZHVjdHMnKTtcbiAgICBsZXQgZmVhdHVyZWRQcm9kdWN0c1F1ZXJ5ID0gcXVlcnkocHJvZHVjdHNDb2xSZWYsIHdoZXJlKCdmZWF0dXJlZCcsICc9PScsIHRydWUpLCBsaW1pdChjb3VudCkpO1xuICAgIGxldCBwcm9kdWN0c1NuYXAgPSBhd2FpdCBnZXREb2NzKGZlYXR1cmVkUHJvZHVjdHNRdWVyeSk7XG5cbiAgICBsZXQgcHJvZHVjdHNUb1JldHVybjogUHJvZHVjdFtdID0gW107XG5cbiAgICBpZiAocHJvZHVjdHNTbmFwLmVtcHR5KSB7XG4gICAgICBjb25zb2xlLmxvZyhcImdldEZlYXR1cmVkUHJvZHVjdHM6ICdmZWF0dXJlZCcgcXVlcnkgcmV0dXJuZWQgbm8gcmVzdWx0cy4gQ2hlY2tpbmcgaWYgZW50aXJlIGNvbGxlY3Rpb24gaXMgZW1wdHkgZm9yIHNlZWRpbmcuLi5cIik7XG4gICAgICBjb25zdCBhbGxQcm9kdWN0c0NoZWNrUXVlcnkgPSBxdWVyeShwcm9kdWN0c0NvbFJlZiwgbGltaXQoMSkpO1xuICAgICAgY29uc3QgYW55UHJvZHVjdFNuYXAgPSBhd2FpdCBnZXREb2NzKGFsbFByb2R1Y3RzQ2hlY2tRdWVyeSk7XG5cbiAgICAgIGlmIChhbnlQcm9kdWN0U25hcC5lbXB0eSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZ2V0RmVhdHVyZWRQcm9kdWN0czogUHJvZHVjdHMgY29sbGVjdGlvbiBpcyBlbnRpcmVseSBlbXB0eS4gQXR0ZW1wdGluZyB0byBzZWVkIGRhdGFiYXNlIHdpdGggbW9jayBkYXRhLi4uJyk7XG4gICAgICAgIGNvbnN0IHNlZWRSZXN1bHQgPSBhd2FpdCBzZWVkUHJvZHVjdHNUb0ZpcmVzdG9yZSgpO1xuICAgICAgICBpZiAoc2VlZFJlc3VsdC5zdWNjZXNzICYmIHNlZWRSZXN1bHQuY291bnQgJiYgc2VlZFJlc3VsdC5jb3VudCA+IDApIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgZ2V0RmVhdHVyZWRQcm9kdWN0czogU2VlZGluZyBzdWNjZXNzZnVsOiAke3NlZWRSZXN1bHQubWVzc2FnZX0uIFJlLWZldGNoaW5nIGZlYXR1cmVkIHByb2R1Y3RzLmApO1xuICAgICAgICAgIHByb2R1Y3RzU25hcCA9IGF3YWl0IGdldERvY3MoZmVhdHVyZWRQcm9kdWN0c1F1ZXJ5KTtcbiAgICAgICAgICBpZiAocHJvZHVjdHNTbmFwLmVtcHR5KSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImdldEZlYXR1cmVkUHJvZHVjdHM6ICdmZWF0dXJlZCcgcXVlcnkgc3RpbGwgZW1wdHkgYWZ0ZXIgc3VjY2Vzc2Z1bCBzZWVkLlwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgZ2V0RmVhdHVyZWRQcm9kdWN0czogU2VlZGluZyBmYWlsZWQgb3IgeWllbGRlZCBubyBwcm9kdWN0czogJHtzZWVkUmVzdWx0Lm1lc3NhZ2V9LmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChwcm9kdWN0c1NuYXAuZW1wdHkpIHsgXG4gICAgICAgICBjb25zb2xlLmxvZyhcImdldEZlYXR1cmVkUHJvZHVjdHM6IE5vICdmZWF0dXJlZCcgcHJvZHVjdHMgZm91bmQuIEZhbGxpbmcgYmFjayB0byBhIGdlbmVyYWwgcXVlcnkgZm9yIGFueSBwcm9kdWN0cy5cIik7XG4gICAgICAgICBjb25zdCBmYWxsYmFja1F1ZXJ5ID0gcXVlcnkocHJvZHVjdHNDb2xSZWYsIG9yZGVyQnkoJ25hbWUnKSwgbGltaXQoY291bnQpKTsgXG4gICAgICAgICBwcm9kdWN0c1NuYXAgPSBhd2FpdCBnZXREb2NzKGZhbGxiYWNrUXVlcnkpO1xuICAgICAgICAgaWYgKHByb2R1Y3RzU25hcC5lbXB0eSkge1xuICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldEZlYXR1cmVkUHJvZHVjdHM6IEZhbGxiYWNrIHF1ZXJ5IGFsc28gcmV0dXJuZWQgbm8gcmVzdWx0cy4gVGhlIGNvbGxlY3Rpb24gbWlnaHQgYmUgdHJ1bHkgZW1wdHkgb3Igc2VlZGluZyBmYWlsZWQuIEZhbGxpbmcgYmFjayB0byBNT0NLX1BST0RVQ1RTLlwiKTtcbiAgICAgICAgICAgcmV0dXJuIE1PQ0tfUFJPRFVDVFMuc2xpY2UoMCwgY291bnQpOyBcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcHJvZHVjdHNUb1JldHVybiA9IHByb2R1Y3RzU25hcC5kb2NzLm1hcChkb2NTbmFwID0+IHtcbiAgICAgICBjb25zdCBkYXRhID0gZG9jU25hcC5kYXRhKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogZG9jU25hcC5pZCxcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lIHx8ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS5kZXNjcmlwdGlvbiB8fCAnJyxcbiAgICAgICAgY2FyZUluc3RydWN0aW9uczogZGF0YS5jYXJlSW5zdHJ1Y3Rpb25zIHx8ICcnLFxuICAgICAgICBpbWFnZVVybHM6IGRhdGEuaW1hZ2VVcmxzICYmIGRhdGEuaW1hZ2VVcmxzLmxlbmd0aCA+IDAgPyBkYXRhLmltYWdlVXJscyA6IFt7IHVybDogJ2h0dHBzOi8vcGxhY2Vob2xkLmNvLzYwMHg0MDAucG5nJywgZGF0YUFpSGludDogJ3BsYWNlaG9sZGVyIGltYWdlJyB9XSxcbiAgICAgICAgcHJpY2U6IGRhdGEucHJpY2UgfHwgJ1JzLiAwJyxcbiAgICAgICAgY2F0ZWdvcnk6IGRhdGEuY2F0ZWdvcnkgfHwgJ1VuY2F0ZWdvcml6ZWQnLFxuICAgICAgICBmZWF0dXJlZDogZGF0YS5mZWF0dXJlZCB8fCBmYWxzZSxcbiAgICAgICAgc2l6ZUFuZERpbWVuc2lvbnM6IGRhdGEuc2l6ZUFuZERpbWVuc2lvbnMgfHwgJ04vQScsXG4gICAgICAgIG1hdGVyaWFsOiBkYXRhLm1hdGVyaWFsIHx8ICdOL0EnLFxuICAgICAgICByZXZpZXdzOiBkYXRhLnJldmlld3MgfHwgW10sXG4gICAgICB9IGFzIFByb2R1Y3Q7XG4gICAgfSk7XG5cbiAgICBpZiAocHJvZHVjdHNUb1JldHVybi5sZW5ndGggPT09IDAgJiYgTU9DS19QUk9EVUNUUy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcImdldEZlYXR1cmVkUHJvZHVjdHM6IEFsbCBGaXJlc3RvcmUgZmV0Y2hlcyByZXN1bHRlZCBpbiBubyBwcm9kdWN0cy4gRmFsbGluZyBiYWNrIHRvIE1PQ0tfUFJPRFVDVFMgZm9yIGZlYXR1cmVkIHByb2R1Y3RzLlwiKTtcbiAgICAgICAgcmV0dXJuIE1PQ0tfUFJPRFVDVFMuZmlsdGVyKHAgPT4gcC5mZWF0dXJlZCkuc2xpY2UoMCwgY291bnQpO1xuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmxvZyhgZ2V0RmVhdHVyZWRQcm9kdWN0czogRmV0Y2hlZCAke3Byb2R1Y3RzVG9SZXR1cm4ubGVuZ3RofSBwcm9kdWN0cy5gKTtcbiAgICByZXR1cm4gcHJvZHVjdHNUb1JldHVybjtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJnZXRGZWF0dXJlZFByb2R1Y3RzOiBFcnJvciBmZXRjaGluZyBmZWF0dXJlZCBwcm9kdWN0czpcIiwgZXJyb3IsIFwiRmFsbGluZyBiYWNrIHRvIE1PQ0tfUFJPRFVDVFMuXCIpO1xuICAgIHJldHVybiBNT0NLX1BST0RVQ1RTLmZpbHRlcihwID0+IHAuZmVhdHVyZWQpLnNsaWNlKDAsIGNvdW50KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJnU0F5RHNCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/image-based-product-recommender.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ImageBasedProductRecommender": (()=>ImageBasedProductRecommender)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$5bf238__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:5bf238 [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-client] (ecmascript) <export default as Wand2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-image.js [app-client] (ecmascript) <export default as FileImage>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-up.js [app-client] (ecmascript) <export default as ImageUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f$data$3a$833986__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/products/data:833986 [app-client] (ecmascript) <text/javascript>"); // Action to fetch products
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function ImageBasedProductRecommender() {
    _s();
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewUrl, setPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [recommendations, setRecommendations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [overallFeedback, setOverallFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingProducts, setIsLoadingProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [availableProducts, setAvailableProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageBasedProductRecommender.useEffect": ()=>{
            async function fetchInitialProducts() {
                setIsLoadingProducts(true);
                try {
                    const productsFromDb = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f$data$3a$833986__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getProducts"])();
                    setAvailableProducts(productsFromDb);
                } catch (error) {
                    console.error("Failed to fetch products for recommender:", error);
                    toast({
                        title: "Error",
                        description: "Could not load products for AI recommender.",
                        variant: "destructive"
                    });
                    setAvailableProducts([]);
                } finally{
                    setIsLoadingProducts(false);
                }
            }
            fetchInitialProducts();
        }
    }["ImageBasedProductRecommender.useEffect"], [
        toast
    ]);
    const handleFileChange = (event)=>{
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "File Too Large",
                    description: "Please upload an image smaller than 5MB.",
                    variant: "destructive"
                });
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
            setRecommendations([]); // Clear previous recommendations
            setOverallFeedback(null);
        }
    };
    const handleSubmit = async ()=>{
        if (!selectedFile || !previewUrl) {
            toast({
                title: "No Image Selected",
                description: "Please upload an image of your space first.",
                variant: "destructive"
            });
            return;
        }
        if (isLoadingProducts || availableProducts.length === 0) {
            toast({
                title: "Products Not Loaded",
                description: "Product information is still loading or unavailable. Please try again shortly.",
                variant: "destructive"
            });
            return;
        }
        setIsLoading(true);
        setRecommendations([]);
        setOverallFeedback(null);
        try {
            const simplifiedProducts = availableProducts.map((p)=>({
                    id: p.id,
                    name: p.name,
                    description: p.description.substring(0, 200) + (p.description.length > 200 ? '...' : ''),
                    category: p.category
                }));
            const input = {
                imageDataUri: previewUrl,
                availableProductsJson: JSON.stringify(simplifiedProducts)
            };
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$5bf238__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["recommendProductsFromImage"])(input);
            setRecommendations(result.recommendations || []);
            setOverallFeedback(result.overallFeedback || null);
            if (!result.recommendations || result.recommendations.length === 0) {
                toast({
                    title: "No Specific Recommendations",
                    description: result.overallFeedback || "The AI couldn't find specific product matches for this image, but check out the general feedback!",
                    variant: "default"
                });
            }
        } catch (error) {
            console.error('Error getting recommendations:', error);
            let errorMessage = "Failed to get recommendations. Please try again.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive"
            });
        } finally{
            setIsLoading(false);
        }
    };
    const triggerFileInput = ()=>{
        fileInputRef.current?.click();
    };
    const getFullProductDetails = (productId)=>{
        return availableProducts.find((p)=>p.id === productId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "w-full max-w-3xl mx-auto shadow-xl rounded-lg border-border/70",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageUp$3e$__["ImageUp"], {
                                className: "h-8 w-8 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "font-headline text-xl md:text-2xl",
                                children: "AI Decor Advisor"
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                        className: "pt-2 text-sm md:text-base",
                        children: "Upload an image of your space, and our AI will recommend Aarambh Decor products that complement your style!"
                    }, void 0, false, {
                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "imageUpload",
                                className: "block text-sm font-medium text-foreground mb-2",
                                children: "Upload Image of Your Space"
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                id: "imageUpload",
                                type: "file",
                                accept: "image/png, image/jpeg, image/webp",
                                onChange: handleFileChange,
                                ref: fileInputRef,
                                className: "hidden"
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: triggerFileInput,
                                className: "w-full border-dashed border-primary/50 hover:border-primary text-primary/80 hover:text-primary-foreground flex justify-start items-center gap-1",
                                "aria-label": "Upload an image of your space",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileImage$3e$__["FileImage"], {
                                        className: "h-5 w-5 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                        lineNumber: 176,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate overflow-hidden whitespace-nowrap",
                                        children: selectedFile ? `Selected: ${selectedFile.name}` : "Choose an image (PNG, JPG, WEBP, max 5MB)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    previewUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 p-2 border rounded-md bg-muted/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-center mb-2 text-muted-foreground",
                                children: "Image Preview:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: previewUrl,
                                alt: "Preview of uploaded space",
                                width: 600,
                                height: 400,
                                className: "rounded-md object-contain max-h-[300px] w-auto mx-auto shadow-md",
                                "data-ai-hint": "user space"
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                className: "flex flex-col items-stretch",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleSubmit,
                        disabled: isLoading || !selectedFile || isLoadingProducts,
                        className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "mr-2 h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this),
                                "Analyzing Your Space..."
                            ]
                        }, void 0, true) : isLoadingProducts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "mr-2 h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this),
                                "Loading Product Data..."
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wand2$3e$__["Wand2"], {
                                    className: "mr-2 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this),
                                "Get Product Recommendations"
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    overallFeedback && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                        className: "mt-6 text-left bg-secondary/30 border-secondary/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "h-5 w-5 text-primary"
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 220,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertTitle"], {
                                className: "font-headline text-base md:text-lg text-primary",
                                children: "AI Observations"
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 221,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                className: "mt-2 whitespace-pre-wrap font-body text-foreground text-sm",
                                children: overallFeedback
                            }, void 0, false, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 222,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                        lineNumber: 219,
                        columnNumber: 13
                    }, this),
                    recommendations.length > 0 && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "h-6 w-6 text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                        lineNumber: 231,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg md:text-xl font-headline text-foreground",
                                        children: "Our AI Recommends:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                        lineNumber: 232,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this),
                            recommendations.map((rec, index)=>{
                                const product = getFullProductDetails(rec.productId);
                                if (!product) return null;
                                const displayImage = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : {
                                    url: 'https://placehold.co/300x300.png?text=Decor',
                                    dataAiHint: 'placeholder decor'
                                };
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "overflow-hidden shadow-md border-border/70 animate-pop-in",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "md:w-1/3 relative aspect-square md:aspect-auto",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: displayImage.url,
                                                    alt: product.name,
                                                    fill: true,
                                                    sizes: "(max-width: 768px) 100vw, 33vw",
                                                    className: "object-cover",
                                                    "data-ai-hint": displayImage.dataAiHint
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 24
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                                lineNumber: 242,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "md:w-2/3 p-4 flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                        className: "font-headline text-base md:text-lg text-primary mb-1",
                                                        children: rec.productName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs md:text-sm text-muted-foreground mb-2 font-semibold",
                                                        children: "AI's Reason:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                                        lineNumber: 254,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                        className: "text-xs md:text-sm text-foreground mb-3 flex-grow",
                                                        children: rec.reason
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        asChild: true,
                                                        variant: "outline",
                                                        size: "sm",
                                                        className: "mt-auto self-start text-xs md:text-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/product/${rec.productId}`,
                                                            children: "View Product"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                                lineNumber: 252,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                        lineNumber: 241,
                                        columnNumber: 19
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/src/components/image-based-product-recommender.tsx",
                                    lineNumber: 240,
                                    columnNumber: 17
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/image-based-product-recommender.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/image-based-product-recommender.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/image-based-product-recommender.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_s(ImageBasedProductRecommender, "JXE7S3UfCob3cVfjCUGf8S8RcWE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = ImageBasedProductRecommender;
var _c;
__turbopack_context__.k.register(_c, "ImageBasedProductRecommender");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/separator.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Separator": (()=>Separator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Separator = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, orientation = "horizontal", decorative = true, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/separator.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this));
_c1 = Separator;
Separator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Separator$React.forwardRef");
__turbopack_context__.k.register(_c1, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/search-bar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SearchBar": (()=>SearchBar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function SearchBar({ onSearch, placeholder = "Search products...", initialValue = '', className, debounceDelay = 300 }) {
    _s();
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValue);
    const debounceTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const searchContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchBar.useEffect": ()=>{
            setInputValue(initialValue);
        }
    }["SearchBar.useEffect"], [
        initialValue
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchBar.useEffect": ()=>{
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            // If input is cleared immediately by user, reflect that quickly
            if (inputValue.trim() === '' && initialValue !== '') {
                onSearch('');
                return;
            }
            debounceTimeoutRef.current = setTimeout({
                "SearchBar.useEffect": ()=>{
                    // Trigger search if value changed or if it was initially empty and now has content
                    if (inputValue !== initialValue || initialValue === '' && inputValue !== '') {
                        onSearch(inputValue);
                    }
                }
            }["SearchBar.useEffect"], debounceDelay);
            return ({
                "SearchBar.useEffect": ()=>{
                    if (debounceTimeoutRef.current) {
                        clearTimeout(debounceTimeoutRef.current);
                    }
                }
            })["SearchBar.useEffect"];
        }
    }["SearchBar.useEffect"], [
        inputValue,
        onSearch,
        debounceDelay,
        initialValue
    ]);
    const handleSubmit = (event)=>{
        event?.preventDefault();
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        onSearch(inputValue);
    };
    const handleInputChange = (e)=>{
        setInputValue(e.target.value);
    };
    const handleClearSearch = ()=>{
        setInputValue('');
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        onSearch('');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-full max-w-lg", className),
        ref: searchContainerRef,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: "flex items-center space-x-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex-grow",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            type: "search",
                            placeholder: placeholder,
                            value: inputValue,
                            onChange: handleInputChange,
                            className: "pr-16",
                            "aria-label": placeholder
                        }, void 0, false, {
                            fileName: "[project]/src/components/search-bar.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-8 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center",
                            children: inputValue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "ghost",
                                size: "icon",
                                className: "h-full w-full p-0 text-muted-foreground hover:text-foreground flex items-center justify-center",
                                onClick: handleClearSearch,
                                "aria-label": "Clear search",
                                tabIndex: -1,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/search-bar.tsx",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/search-bar.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/search-bar.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/search-bar.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    type: "submit",
                    "aria-label": "Search",
                    variant: "default",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search-bar.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/search-bar.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/search-bar.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/search-bar.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(SearchBar, "TX4TDxAwIOq3Nl6R7bRNQs2ETJk=");
_c = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/welcome-loader.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>WelcomeLoader)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)"); // Import cn utility
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function WelcomeLoader() {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Start as not visible, set true in useEffect
    const [isFadingOut, setIsFadingOut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WelcomeLoader.useEffect": ()=>{
            setIsMounted(true);
        }
    }["WelcomeLoader.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WelcomeLoader.useEffect": ()=>{
            if (!isMounted) {
                return;
            }
            // Always show the welcome loader
            setIsVisible(true); // Make it visible immediately to start content animations
            // Timer to start fade-out of the entire loader
            // Content shown for 1.5 seconds, then 0.5s fade-out for a total of 2 seconds.
            const displayTimer = setTimeout({
                "WelcomeLoader.useEffect.displayTimer": ()=>{
                    setIsFadingOut(true); // Trigger fade-out animation for the loader
                    // Timer to actually hide the loader after fade-out animation completes
                    const fadeOutCompletionTimer = setTimeout({
                        "WelcomeLoader.useEffect.displayTimer.fadeOutCompletionTimer": ()=>{
                            setIsVisible(false); // Fully hide the loader component
                        }
                    }["WelcomeLoader.useEffect.displayTimer.fadeOutCompletionTimer"], 500); // This duration should match your fade-out animation (0.5s)
                    return ({
                        "WelcomeLoader.useEffect.displayTimer": ()=>clearTimeout(fadeOutCompletionTimer)
                    })["WelcomeLoader.useEffect.displayTimer"];
                }
            }["WelcomeLoader.useEffect.displayTimer"], 1500); // Show content for 1.5 seconds before starting loader fade-out
            return ({
                "WelcomeLoader.useEffect": ()=>clearTimeout(displayTimer)
            })["WelcomeLoader.useEffect"];
        }
    }["WelcomeLoader.useEffect"], [
        isMounted
    ]);
    if (!isMounted || !isVisible) {
        return null;
    }
    return(// This outer div is the fixed overlay. It is immediately opaque if not fading out.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background", isFadingOut && "animate-fade-out" // Apply fade-out to the main loader container
        ),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center p-4 animate-fade-in-down",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.2885-19/505746725_17843352006510460_4000077421691590872_n.jpg?_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QGrole3olHTzDhyipLFazMcqxTH3BTY1mp1iUgGHh4vS9EKAKzwAqkfF7dIo9auedjAk-OgM_5e06tRXQpcQ518&_nc_ohc=PWAubMoouIAQ7kNvwGXkA7l&_nc_gid=FmC7UlvNMxPMW8Vr6tpdOA&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfPdwAvgOVVQOsnHh8uHrqXaxpnddaWxkGxDWyAHrd0Uzw&oe=685472D7&_nc_sid=7a9f4b",
                    alt: "Aarambh Decor Logo",
                    width: 80,
                    height: 80,
                    priority: true,
                    className: "object-contain rounded-lg mx-auto mb-4 md:mb-6 md:w-[100px] md:h-[100px] animate-pop-in",
                    "data-ai-hint": "logo"
                }, void 0, false, {
                    fileName: "[project]/src/components/welcome-loader.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl md:text-5xl font-headline text-primary mb-3 md:mb-4 animate-fade-in-up animation-delay-200",
                    children: "Welcome to Aarambh Decor"
                }, void 0, false, {
                    fileName: "[project]/src/components/welcome-loader.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-base md:text-lg text-muted-foreground animate-fade-in-up animation-delay-400",
                    children: "Crafting stories, one space at a time."
                }, void 0, false, {
                    fileName: "[project]/src/components/welcome-loader.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/welcome-loader.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/welcome-loader.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this));
}
_s(WelcomeLoader, "m9GXKVYeTZdr/issK8zIJqGWSdw=");
_c = WelcomeLoader;
var _c;
__turbopack_context__.k.register(_c, "WelcomeLoader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/carousel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Carousel": (()=>Carousel),
    "CarouselContent": (()=>CarouselContent),
    "CarouselItem": (()=>CarouselItem),
    "CarouselNext": (()=>CarouselNext),
    "CarouselPrevious": (()=>CarouselPrevious)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/embla-carousel-react/esm/embla-carousel-react.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const CarouselContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function useCarousel() {
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }
    return context;
}
_s(useCarousel, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const Carousel = /*#__PURE__*/ _s1((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s1(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref)=>{
    _s1();
    const [carouselRef, api] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])({
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
    }, plugins);
    const [canScrollPrev, setCanScrollPrev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canScrollNext, setCanScrollNext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const onSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Carousel.useCallback[onSelect]": (api)=>{
            if (!api) {
                return;
            }
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }
    }["Carousel.useCallback[onSelect]"], []);
    const scrollPrev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Carousel.useCallback[scrollPrev]": ()=>{
            api?.scrollPrev();
        }
    }["Carousel.useCallback[scrollPrev]"], [
        api
    ]);
    const scrollNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Carousel.useCallback[scrollNext]": ()=>{
            api?.scrollNext();
        }
    }["Carousel.useCallback[scrollNext]"], [
        api
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Carousel.useCallback[handleKeyDown]": (event)=>{
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                scrollNext();
            }
        }
    }["Carousel.useCallback[handleKeyDown]"], [
        scrollPrev,
        scrollNext
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Carousel.useEffect": ()=>{
            if (!api || !setApi) {
                return;
            }
            setApi(api);
        }
    }["Carousel.useEffect"], [
        api,
        setApi
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Carousel.useEffect": ()=>{
            if (!api) {
                return;
            }
            onSelect(api);
            api.on("reInit", onSelect);
            api.on("select", onSelect);
            return ({
                "Carousel.useEffect": ()=>{
                    api?.off("select", onSelect);
                }
            })["Carousel.useEffect"];
        }
    }["Carousel.useEffect"], [
        api,
        onSelect
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CarouselContext.Provider, {
        value: {
            carouselRef,
            api: api,
            opts,
            orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            onKeyDownCapture: handleKeyDown,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/carousel.tsx",
            lineNumber: 138,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/carousel.tsx",
        lineNumber: 125,
        columnNumber: 7
    }, this);
}, "72w3/pym1wz2ZcTGqySg56b8KiQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
})), "72w3/pym1wz2ZcTGqySg56b8KiQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$embla$2d$carousel$2d$react$2f$esm$2f$embla$2d$carousel$2d$react$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c1 = Carousel;
Carousel.displayName = "Carousel";
const CarouselContent = /*#__PURE__*/ _s2((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = _s2(({ className, ...props }, ref)=>{
    _s2();
    const { carouselRef, orientation } = useCarousel();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: carouselRef,
        className: "overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/carousel.tsx",
            lineNumber: 162,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/carousel.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}, "YNqN7/p8l2NfYueiPechI4IqsYo=", false, function() {
    return [
        useCarousel
    ];
})), "YNqN7/p8l2NfYueiPechI4IqsYo=", false, function() {
    return [
        useCarousel
    ];
});
_c3 = CarouselContent;
CarouselContent.displayName = "CarouselContent";
const CarouselItem = /*#__PURE__*/ _s3((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = _s3(({ className, ...props }, ref)=>{
    _s3();
    const { orientation } = useCarousel();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: "group",
        "aria-roledescription": "slide",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/carousel.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}, "bPPpMbUdjWnfcwMzP4altEp5ZJs=", false, function() {
    return [
        useCarousel
    ];
})), "bPPpMbUdjWnfcwMzP4altEp5ZJs=", false, function() {
    return [
        useCarousel
    ];
});
_c5 = CarouselItem;
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = /*#__PURE__*/ _s4((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = _s4(({ className, variant = "outline", size = "icon", ...props }, ref)=>{
    _s4();
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        ref: ref,
        variant: variant,
        size: size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute  h-8 w-8 rounded-full", orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/carousel.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Previous slide"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/carousel.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/carousel.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}, "StVzzFT/dKvE6v0nHx014nh7DNA=", false, function() {
    return [
        useCarousel
    ];
})), "StVzzFT/dKvE6v0nHx014nh7DNA=", false, function() {
    return [
        useCarousel
    ];
});
_c7 = CarouselPrevious;
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = /*#__PURE__*/ _s5((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = _s5(({ className, variant = "outline", size = "icon", ...props }, ref)=>{
    _s5();
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
        ref: ref,
        variant: variant,
        size: size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute h-8 w-8 rounded-full", orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/carousel.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Next slide"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/carousel.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/carousel.tsx",
        lineNumber: 234,
        columnNumber: 5
    }, this);
}, "VthXVrvg+0LPsG5FRGeAaBGswm4=", false, function() {
    return [
        useCarousel
    ];
})), "VthXVrvg+0LPsG5FRGeAaBGswm4=", false, function() {
    return [
        useCarousel
    ];
});
_c9 = CarouselNext;
CarouselNext.displayName = "CarouselNext";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Carousel$React.forwardRef");
__turbopack_context__.k.register(_c1, "Carousel");
__turbopack_context__.k.register(_c2, "CarouselContent$React.forwardRef");
__turbopack_context__.k.register(_c3, "CarouselContent");
__turbopack_context__.k.register(_c4, "CarouselItem$React.forwardRef");
__turbopack_context__.k.register(_c5, "CarouselItem");
__turbopack_context__.k.register(_c6, "CarouselPrevious$React.forwardRef");
__turbopack_context__.k.register(_c7, "CarouselPrevious");
__turbopack_context__.k.register(_c8, "CarouselNext$React.forwardRef");
__turbopack_context__.k.register(_c9, "CarouselNext");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/home-page-client.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePageClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$image$2d$based$2d$product$2d$recommender$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/image-based-product-recommender.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$search$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/search-bar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$welcome$2d$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/welcome-loader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/carousel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function HomePageClient({ initialFeaturedProducts, initialAllProducts, errorFetchingInitialData }) {
    _s();
    // State now initialized from props
    const [featuredProducts, setFeaturedProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialFeaturedProducts);
    const [allProductsForSearch, setAllProductsForSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAllProducts);
    // This state indicates if there was an issue loading initial data from server,
    // or if client logic determines products are "loading" or unavailable.
    const [productsUnavailable, setProductsUnavailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(errorFetchingInitialData);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePageClient.useEffect": ()=>{
            setIsClient(true);
            if (errorFetchingInitialData) {
                toast({
                    title: "Error",
                    description: "Could not load initial products for the homepage. Some features might be limited.",
                    variant: "destructive"
                });
                // Update state to reflect that products are unavailable if an error occurred
                setProductsUnavailable(true);
            }
            // Update local state if props change (e.g., after a server action followed by revalidation)
            // This might not be strictly necessary if navigation handles re-fetching, but good for consistency
            setFeaturedProducts(initialFeaturedProducts);
            setAllProductsForSearch(initialAllProducts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["HomePageClient.useEffect"], [
        initialFeaturedProducts,
        initialAllProducts,
        errorFetchingInitialData
    ]);
    const handleToggleWishlist = (productId)=>{
        console.log("Wishlist functionality disabled for product:", productId);
        toast({
            title: "Feature Disabled",
            description: "Wishlist functionality is currently unavailable.",
            variant: "default"
        });
    };
    const handleAddToCart = (product)=>{
        console.log("Add to cart clicked for product:", product.name);
        toast({
            title: "Cart Disabled",
            description: "User-specific cart functionality is currently unavailable.",
            variant: "default"
        });
    };
    const handleHomepageSearch = (searchTerm)=>{
        const trimmedSearchTerm = searchTerm.trim();
        if (!trimmedSearchTerm) {
            if (pathname.includes('/collections') && searchParams.has('search')) {
                router.push('/collections');
            }
            return;
        }
        const lowerSearchTerm = trimmedSearchTerm.toLowerCase();
        const uniqueProductCategories = Array.from(new Set(allProductsForSearch.map((p)=>p.category).filter(Boolean)));
        const matchedCategory = uniqueProductCategories.find((cat)=>cat.toLowerCase() === lowerSearchTerm);
        if (matchedCategory) {
            router.push(`/collections?category=${encodeURIComponent(matchedCategory)}&search=${encodeURIComponent(trimmedSearchTerm)}`);
        } else {
            router.push(`/collections?search=${encodeURIComponent(trimmedSearchTerm)}`);
        }
    };
    const handleAiAdvisorClick = (e)=>{
        if (pathname === '/') {
            e.preventDefault();
            const section = document.getElementById('ai-decor-advisor');
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };
    // Determine if products are considered "loading" or unavailable for display
    // This is true if an error occurred OR if products array is empty without an error (implies no data)
    const showLoadingOrNoProductsMessage = productsUnavailable || !errorFetchingInitialData && featuredProducts.length === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isClient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$welcome$2d$loader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/home-page-client.tsx",
                lineNumber: 106,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col min-h-screen bg-background",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/home-page-client.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-grow container mx-auto px-2 py-8 md:py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "text-center pt-8 pb-12 md:pt-12 md:pb-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-5xl md:text-6xl font-headline text-primary mb-6 animate-fade-in-down",
                                        children: "Discover Your Signature Style"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up",
                                        children: "Explore Aarambh Decor's curated collection of home decor that tells a story. Find pieces that resonate with your soul and transform your space."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        asChild: true,
                                        size: "lg",
                                        className: "bg-accent hover:bg-accent/90 text-accent-foreground animate-fade-in-up animation-delay-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/collections",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                    className: "mr-2 h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/home-page-client.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this),
                                                "Shop The Collection"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/home-page-client.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/home-page-client.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                className: "my-12 md:my-16 border-border/70"
                            }, void 0, false, {
                                fileName: "[project]/src/app/home-page-client.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "homepage-search",
                                "aria-labelledby": "homepage-search-title",
                                className: "py-8 md:py-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center space-y-6 mb-10 md:mb-12 animate-fade-in-up animation-delay-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-row items-center justify-center space-x-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                    className: "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/home-page-client.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    id: "homepage-search-title",
                                                    className: "text-2xl sm:text-3xl md:text-4xl font-headline text-center text-foreground",
                                                    children: "Find Your Perfect Piece"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/home-page-client.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/home-page-client.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg text-muted-foreground max-w-xl mx-auto text-center",
                                            children: "Search our collections by product name or category to quickly find what you're looking for."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/home-page-client.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$search$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchBar"], {
                                            onSearch: handleHomepageSearch,
                                            placeholder: "Search products or categories...",
                                            className: "mt-4",
                                            debounceDelay: 500
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/home-page-client.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/home-page-client.tsx",
                                    lineNumber: 130,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/home-page-client.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                className: "my-12 md:my-16 border-border/70"
                            }, void 0, false, {
                                fileName: "[project]/src/app/home-page-client.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "featured-product-showcase",
                                "aria-labelledby": "featured-product-showcase-title",
                                className: "py-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center space-x-3 mb-10 md:mb-12 animate-fade-in-up animation-delay-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "h-10 w-10 text-accent"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/home-page-client.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                id: "featured-product-showcase-title",
                                                className: "text-3xl md:text-4xl font-headline text-center text-foreground",
                                                children: "Featured Products"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/home-page-client.tsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 152,
                                        columnNumber: 13
                                    }, this),
                                    showLoadingOrNoProductsMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-center items-center h-64",
                                        children: productsUnavailable && !(featuredProducts.length > 0) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-center text-destructive text-lg",
                                            children: "Featured products could not be loaded. Please try again later."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/home-page-client.tsx",
                                            lineNumber: 161,
                                            columnNumber: 22
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-12 w-12 text-primary animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/home-page-client.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 22
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "ml-4 text-lg text-muted-foreground",
                                                    children: "Loading featured items..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/home-page-client.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 22
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this) : featuredProducts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Carousel"], {
                                        opts: {
                                            align: "start",
                                            loop: featuredProducts.length > 3
                                        },
                                        className: "w-full max-w-5xl mx-auto animate-fade-in-up animation-delay-400 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CarouselContent"], {
                                                className: "-ml-4",
                                                children: featuredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CarouselItem"], {
                                                        className: "pl-4 basis-1/2 md:basis-1/3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-1 h-full flex",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                                                                product: product,
                                                                isWishlisted: false,
                                                                onToggleWishlist: handleToggleWishlist,
                                                                onAddToCart: handleAddToCart,
                                                                isProductInCart: false,
                                                                className: "w-full flex flex-col"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/home-page-client.tsx",
                                                                lineNumber: 181,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/home-page-client.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, product.id, false, {
                                                        fileName: "[project]/src/app/home-page-client.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/home-page-client.tsx",
                                                lineNumber: 177,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CarouselPrevious"], {
                                                variant: "ghost",
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute left-[-10px] top-1/2 -translate-y-1/2 z-10", "h-10 w-10 rounded-full", "bg-background/70 text-foreground/70", "hover:bg-background/90 hover:text-primary", "shadow-md", "opacity-0 group-hover:opacity-100 focus-visible:opacity-100", "transition-opacity duration-200 ease-in-out", "md:left-[-20px]", "disabled:opacity-30 disabled:cursor-not-allowed")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/home-page-client.tsx",
                                                lineNumber: 193,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$carousel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CarouselNext"], {
                                                variant: "ghost",
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-[-10px] top-1/2 -translate-y-1/2 z-10", "h-10 w-10 rounded-full", "bg-background/70 text-foreground/70", "hover:bg-background/90 hover:text-primary", "shadow-md", "opacity-0 group-hover:opacity-100 focus-visible:opacity-100", "transition-opacity duration-200 ease-in-out", "md:right-[-20px]", "disabled:opacity-30 disabled:cursor-not-allowed")
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/home-page-client.tsx",
                                                lineNumber: 207,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-center text-muted-foreground text-lg",
                                        children: "No featured products to display at the moment. Please check back soon!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mt-12 animate-fade-in-up",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            asChild: true,
                                            variant: "outline",
                                            size: "lg",
                                            className: "border-primary text-primary hover:bg-primary/10",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/collections",
                                                children: "View All Collections"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/home-page-client.tsx",
                                                lineNumber: 227,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/home-page-client.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/home-page-client.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                className: "my-12 md:my-20 border-border/70"
                            }, void 0, false, {
                                fileName: "[project]/src/app/home-page-client.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "ai-decor-advisor",
                                "aria-labelledby": "ai-decor-advisor-title",
                                className: "py-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center space-x-3 mb-10 md:mb-12 animate-fade-in-up animation-delay-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "ai-decor-advisor-title",
                                            className: "text-3xl md:text-4xl font-headline text-center text-foreground",
                                            children: [
                                                "Need Inspiration?",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                    fileName: "[project]/src/app/home-page-client.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 34
                                                }, this),
                                                "Try Our AI Advisor!"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/home-page-client.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-fade-in-up animation-delay-400",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$image$2d$based$2d$product$2d$recommender$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageBasedProductRecommender"], {}, void 0, false, {
                                            fileName: "[project]/src/app/home-page-client.tsx",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/home-page-client.tsx",
                                        lineNumber: 240,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/home-page-client.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/home-page-client.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/home-page-client.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/home-page-client.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(HomePageClient, "V0fAA9MmU+PkUgzmmvT4Agt5PzU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = HomePageClient;
var _c;
__turbopack_context__.k.register(_c, "HomePageClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_3ee32984._.js.map