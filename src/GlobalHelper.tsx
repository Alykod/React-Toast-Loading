import React, { useState, useContext, useEffect, useCallback, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import './index.scss'

export type ContextValue  = {
    /** Returns Id if you want to remove toast without pressing or waiting on time out */
    addToast: (content: ToastMessage) => number;
    removeToast: (id: number) => void;
    addOverLay: () => void;
    removeOverLay: () => void;
    removeAllToasts: () => void;
    removeAllHelpers: () => void;
}

export type ToastMessage =  {
    title?: string,
    body?: string
}
export type ToastState = {
    toastId: number
    message?: {
        title?: string,
        body?: string
    }
}
export type ToastInterface = {
    toasts: ToastState[];
}

export type OverLayProps = {
    /** Color of overlay background */
    overLayColor?: string;
    /** If you have a specific component in mind for the center such as a spinner or loadingbar */
    overLayComponent?: any;
    /** Overlay style */
    overLayStyle?: object;
}

export interface OverLayContainer extends OverLayProps {
    overLay: boolean
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

export interface ToastContainerProps extends ToastInterface, ToastProps {}

export const GlobalHelperContext = React.createContext<Partial<ContextValue>>({});

const generateId = () => {
 return Math.floor(Math.random() * 1000000)
}

export const GlobalHelperProvider = (props: GlobalHelperProvider) => {
    const [toasts, setToasts] = useState<ToastState[]>([]);
    const [overLay, setOverLay] = useState(false);
    const [idleToasts, setIdleToasts] = useState<ToastState[]>([]);

    const addToast = useCallback((message: any) => {
        if (overLay) {
            let id = generateId();
            setIdleToasts(idleToasts => [...idleToasts, { "toastId": id, message: message }])
            return id
        }
        else {
            let id = generateId();
            setToasts(toasts => [...toasts, { "toastId": id, message: message }]);
            return id;
        }
    }, [overLay]);


    const removeToast = useCallback((id: number) => {
        setToasts(toasts => toasts.filter(t => t.toastId !== id))
    }, []);

    const addOverLay = useCallback(() => {
        setOverLay(true);
        setToasts([]);
    }, []);

    const removeOverLay = useCallback(() => {
        setOverLay(false);
        setToasts(idleToasts || []);
    }, [idleToasts]);

    const removeAllToasts = useCallback(() => {
        setToasts([]);
    }, [])



    const removeAllHelpers = useCallback(() => {
        setToasts([]);
        setOverLay(false);
    }, [])

    return (
        <GlobalHelperContext.Provider value={{ removeToast, addOverLay, addToast, removeOverLay, removeAllHelpers, removeAllToasts }}>
            <OverLayContainer overLay={overLay} overLayColor={props.overLayColor} overLayComponent={props.overLayComponent} />
            <ToastContainer toasts={toasts} defaultToast={props.defaultToast} toastStyle={props.toastStyle} toastTimeOut={props.toastTimeOut} toastLocation={props.toastLocation} />
            {props.children}
        </GlobalHelperContext.Provider>
    )

}

const Toaster = (props: any) => {
    const { removeToast } = useGlobalHelper();

    useEffect(() => {
        const timeout = setTimeout(() => {
            removeToast(props.toast.toastId);
        }, props.toastTimeOut || 6000)

        return () => {
            clearTimeout(timeout)
        }
    }, [props, removeToast]);

    return props.defaultToast ? <props.defaultToast message={props.toast.message} toastId={props.toast.toastId} dismiss={() => removeToast(props.toast.toastId)} /> :
        <div style={props.toastStyle} className="toast-style" onClick={() => removeToast(props.toast.toastId)}>
            <div className="toast-title">
                <label className="toast-title-text">{props.toast.message.title || "Error"}</label>
            </div>
            <div className="toast-body">
                <label className="toast-body-text">{props.toast.message.body || ""}</label>
            </div>
        </div>

}

export const useGlobalHelper = () => {
    return useContext<any>(GlobalHelperContext);
}

const ToastContainer = (props: ToastContainerProps) => {
    return createPortal(
        <div className={`container-style ${props.toastLocation || "top-right"}`}>
            {props.toasts.map((eachToast: ToastState) => (
                <Toaster key={eachToast.toastId} defaultToast={props.defaultToast} toastStyle={props.toastStyle} toastTimeOut={props.toastTimeOut} toast={eachToast} />
            ))}
        </div>, document.body
    )
}

const OverLaySelector = (props: OverLayProps) => {
    const overLayStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: 0,
        width: "100%",
        height: "100%",
        opacity: .6,
        backgroundColor: props.overLayColor || 'black',
        backdropFilter: "blur(2px)"
    }
    if (props.overLayComponent) {
        return <props.overLayComponent />
    } else {
        return (
            <div style={overLayStyle}>
                <SpinnerSVG />
            </div>)
    }
}

const OverLayPage = (props: any) => {
    return props.overLay && OverLaySelector(props)

}

const OverLayContainer = (props: OverLayContainer) => {
    return createPortal(
        <OverLayPage overLay={props.overLay} overLayComponent={props.overLayComponent} overLayColor={props.overLayColor} overLayStyle={props.overLayStyle} />
        , document.body
    )
}



const SpinnerSVG = () => {
    return (
        <svg className="svgCircle" width='200' height="200" xmlns="http://www.w3.org/2000/svg">
            <circle className="svgInnerCircle" cx="100" cy="100" r="90" />
        </svg>
    )
}