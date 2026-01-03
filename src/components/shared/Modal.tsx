"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
}

export const Modal = ({
    title,
    description,
    isOpen,
    onClose,
    className,
    children,
}: ModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className={className}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};
