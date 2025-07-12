import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const IconExpandUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
);

const IconExpandDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

type AccordionContextType = {
    activeItem: string | null;
    setActiveItem: (id: string | null) => void;
    expandIcon?: React.ReactNode;
    collapseIcon?: React.ReactNode;
};

type AccordionProps = {
    children: React.ReactNode;
    className?: string;
    defaultValue?: string | null;
    expandIcon?: React.ReactNode;
    collapseIcon?: React.ReactNode;
};

type AccordionItemProps = {
    children: React.ReactNode;
    value: string;
    className?: string;
};

type AccordionTriggerProps = {
    children: React.ReactNode;
    className?: string;
};

type AccordionContentProps = {
    children: React.ReactNode | React.FC<{ isOpen: boolean }>;
    className?: string;
};

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

const useAccordion = () => {
    const context = React.useContext(AccordionContext);
    if (!context) {
        throw new Error("useAccordion must be used within an Accordion");
    }
    return context;
};

const AccordionItemContext = React.createContext<{ value: string } | undefined>(undefined);

const useAccordionItem = () => {
    const context = React.useContext(AccordionItemContext);
    if (!context) {
        throw new Error("useAccordionItem must be used within an AccordionItem");
    }
    return context;
};


const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
    ({ children, className, defaultValue = null, expandIcon = <IconExpandDown />, collapseIcon = <IconExpandUp />, ...props }, ref) => {
        const [activeItem, setActiveItem] = React.useState<string | null>(defaultValue);

        const handleSetActiveItem = (id: string | null) => {
            setActiveItem(prev => (prev === id ? null : id));
        };

        const contextValue = {
            activeItem,
            setActiveItem: handleSetActiveItem,
            expandIcon,
            collapseIcon,
        };

        return (
            <AccordionContext.Provider value={contextValue}>
                <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
                    {children}
                </div>
            </AccordionContext.Provider>
        );
    }
);
Accordion.displayName = "Accordion";


const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, value, className, ...props }, ref) => {
        return (
            <AccordionItemContext.Provider value={{ value }}>
                <div ref={ref} className={className} {...props}>
                    {children}
                </div>
            </AccordionItemContext.Provider>
        );
    }
);
AccordionItem.displayName = "AccordionItem";


const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, ...props }, ref) => {
        const { activeItem, setActiveItem, expandIcon, collapseIcon } = useAccordion();
        const { value } = useAccordionItem();
        const isOpen = activeItem === value;

        return (
            <button
                ref={ref}
                onClick={() => setActiveItem(value)}
                className={cn("flex justify-between w-full p-2 items-center border shadow-xs rounded-md cursor-pointer", className)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${value}`}
                id={`accordion-trigger-${value}`}
                {...props}
            >
                {children}
                {isOpen ? collapseIcon : expandIcon}
            </button>
        );
    }
);
AccordionTrigger.displayName = "AccordionTrigger";


const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, ref) => {
        const { activeItem } = useAccordion();
        const { value } = useAccordionItem();
        const isOpen = activeItem === value;

        // const 
        
        const childrenNode = typeof children === 'function' ? children({ isOpen }) : children;

        return (
            <div
                ref={ref}
                id={`accordion-content-${value}`}
                aria-labelledby={`accordion-trigger-${value}`}
                role="region"
                hidden={!isOpen}
                className={cn("p-2", className, { "hidden": !isOpen })}
                {...props}
            >
                {childrenNode as ReactNode}
            </div>
        );
    }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };