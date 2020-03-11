Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactDom = require('react-dom');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var GlobalHelperContext = React__default.createContext({});
var id = 0;
var GlobalHelperProvider = function (props) {
    var _a = React.useState([]), toasts = _a[0], setToasts = _a[1];
    var _b = React.useState(false), overLay = _b[0], setOverLay = _b[1];
    var _c = React.useState([]), idleToasts = _c[0], setIdleToasts = _c[1];
    var addToast = React.useCallback(function (message) {
        if (overLay) {
            setIdleToasts(function (idleToasts) { return __spreadArrays(idleToasts, [{ "toastId": id++, message: message }]); });
            return id;
        }
        else {
            setToasts(function (toasts) { return __spreadArrays(toasts, [{ "toastId": id++, message: message }]); });
            return id;
        }
    }, [overLay]);
    var removeToast = React.useCallback(function (id) {
        setToasts(function (toasts) { return toasts.filter(function (t) { return t.toastId !== id; }); });
    }, []);
    var addOverLay = React.useCallback(function () {
        setOverLay(true);
        setToasts([]);
    }, []);
    var removeOverLay = React.useCallback(function () {
        setOverLay(false);
        setToasts(idleToasts || []);
    }, [idleToasts]);
    var removeAllToasts = React.useCallback(function () {
        setToasts([]);
    }, []);
    var removeAllHelpers = React.useCallback(function () {
        setToasts([]);
        setOverLay(false);
    }, []);
    return (React__default.createElement(GlobalHelperContext.Provider, { value: { removeToast: removeToast, addOverLay: addOverLay, addToast: addToast, removeOverLay: removeOverLay, removeAllHelpers: removeAllHelpers, removeAllToasts: removeAllToasts } },
        React__default.createElement(OverLayContainer, { overLay: overLay, overLayColor: props.overLayColor, overLayComponent: props.overLayComponent }),
        React__default.createElement(ToastContainer, { toasts: toasts, defaultToast: props.defaultToast, toastStyle: props.toastStyle, toastTimeOut: props.toastTimeOut, toastLocation: props.toastLocation }),
        props.children));
};
var Toaster = function (props) {
    var removeToast = useGlobalHelper().removeToast;
    React.useEffect(function () {
        var timeout = setTimeout(function () {
            removeToast(props.toast.toastId);
        }, props.Timeout || 6000);
        return function () {
            clearTimeout(timeout);
        };
    }, [props, removeToast]);
    return props.defaultToast ? React__default.createElement(props.defaultToast, { message: props.toast.message, toastId: props.toast.toastId, dismiss: function () { return removeToast(props.toast.toastId); } }) :
        React__default.createElement("div", { style: props.toastStyle, className: "toast-style", onClick: function () { return removeToast(props.toast.toastId); } },
            React__default.createElement("div", { className: "toast-title" },
                React__default.createElement("label", { className: "toast-title-text" }, props.toast.message.title || "Error")),
            React__default.createElement("div", { className: "toast-body" },
                React__default.createElement("label", { className: "toast-body-text" }, props.toast.message.body || "")));
};
var useGlobalHelper = function () {
    return React.useContext(GlobalHelperContext);
};
var ToastContainer = function (props) {
    return reactDom.createPortal(React__default.createElement("div", { className: "container-style " + (props.toastLocation || "top-right") }, props.toasts.map(function (eachToast) { return (React__default.createElement(Toaster, { key: eachToast.toastId, defaultToast: props.defaultToast, toastStyle: props.toastStyle, toastTimeOut: props.toastTimeOut, toast: eachToast })); })), document.body);
};
var OverLaySelector = function (props) {
    var overLayStyle = {
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
    };
    if (props.overLayComponent) {
        return React__default.createElement(props.overLayComponent, null);
    }
    else {
        return (React__default.createElement("div", { style: overLayStyle },
            React__default.createElement(SpinnerSVG, null)));
    }
};
var OverLayPage = function (props) {
    return props.overLay && OverLaySelector(props);
};
var OverLayContainer = function (props) {
    return reactDom.createPortal(React__default.createElement(OverLayPage, { overLay: props.overLay, overLayComponent: props.overLayComponent, overLayColor: props.overLayColor, overLayStyle: props.overLayStyle }), document.body);
};
var SpinnerSVG = function () {
    return (React__default.createElement("svg", { className: "svgCircle", width: '200', height: "200", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("circle", { className: "svgInnerCircle", cx: "100", cy: "100", r: "90" })));
};

exports.GlobalHelperContext = GlobalHelperContext;
exports.GlobalHelperProvider = GlobalHelperProvider;
exports.useGlobalHelper = useGlobalHelper;
//# sourceMappingURL=index.js.map
