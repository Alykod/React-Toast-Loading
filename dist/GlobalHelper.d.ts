import React from 'react';
import './GlobalHelper.css';
export declare type ContextValue = {
    addToast: (content: ToastMessage) => number;
    removeToast: (id: number) => void;
    addOverLay: () => void;
    removeOverLay: () => void;
    removeAllToasts: () => void;
    removeAllHelpers: () => void;
};
export declare type ToastMessage = {
    title?: string;
    body?: string;
};
export declare type ToastState = {
    toastId: number;
    message?: {
        title?: string;
        body?: string;
    };
};
export declare type ToastInterface = {
    toasts: ToastState[];
};
export declare type OverLayProps = {
    overLayColor?: string;
    overLayComponent?: any;
    overLayStyle?: object;
};
export interface OverLayContainer extends OverLayProps {
    overLay: boolean;
}
export interface ToastProps {
    defaultToast?: React.FC;
    toastStyle?: object;
    toastTimeOut?: number;
    toastLocation?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center-right" | "center-left";
}
export interface GlobalHelperProvider extends OverLayProps, ToastProps {
    children: React.ReactNode;
}
export interface ToastContainerProps extends ToastInterface, ToastProps {
}
export declare const GlobalHelperContext: React.Context<Partial<ContextValue>>;
export declare const GlobalHelperProvider: (props: GlobalHelperProvider) => JSX.Element;
export declare const useGlobalHelper: () => any;
