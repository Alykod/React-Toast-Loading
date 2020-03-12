import React from 'react';
import './index.scss';
export declare type ContextValue = {
    /** Returns Id if you want to remove toast without pressing or waiting on time out */
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
    /** Color of overlay background */
    overLayColor?: string;
    /** If you have a specific component in mind for the center such as a spinner or loadingbar */
    overLayComponent?: any;
    /** Overlay style */
    overLayStyle?: object;
};
export interface OverLayContainer extends OverLayProps {
    overLay: boolean;
}
export interface ToastProps {
    /** If you want to add a unique toast element such as bootstrap or custom component. Must Contain a title and a body or no message will show unless you have a default in the component */
    defaultToast?: React.FC;
    /** if you want to modify the default toast style, use this */
    toastStyle?: object;
    /** Timeout timer for the toasts */
    toastTimeOut?: number;
    /** Locations of the toast on the screen */
    toastLocation?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "center-right" | "center-left";
}
export interface GlobalHelperProvider extends OverLayProps, ToastProps {
    /** React Children */
    children: React.ReactNode;
}
export interface ToastContainerProps extends ToastInterface, ToastProps {
}
export declare const GlobalHelperContext: React.Context<Partial<ContextValue>>;
export declare const GlobalHelperProvider: (props: GlobalHelperProvider) => JSX.Element;
export declare const useGlobalHelper: () => any;
