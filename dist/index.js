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

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/* svg style from Glenn Mccomb https://glennmccomb.com/articles/building-a-pure-css-animated-svg-spinner/ */\r\n\r\n.GlobalHelper_svgCircle__3nAl7 {\r\n  animation: 2s linear infinite :local(circle-animation);\r\n  max-width: 200px;\r\n}\r\n\r\n@keyframes GlobalHelper_circle-animation__2qTAd {\r\n  0% {\r\n    transform: rotateZ(0deg);\r\n  }\r\n  100% {\r\n    transform: rotateZ(360deg);\r\n  }\r\n}\r\n\r\n.GlobalHelper_svgInnerCircle__3NPlp {\r\n  animation: 5s ease-in-out infinite both :local(innercircle-animation);\r\n  display: block;\r\n  fill: transparent;\r\n  stroke: #ffff;\r\n  stroke-linecap: round;\r\n  stroke-dasharray: 283;\r\n  stroke-dashoffset: 280;\r\n  stroke-width: 10px;\r\n  transform-origin: 50% 50%;\r\n}\r\n\r\n@keyframes GlobalHelper_innercircle-animation__2yNfc {\r\n  0%,\r\n  25% {\r\n    stroke-dashoffset: 280;\r\n    transform: rotate(0);\r\n  }\r\n\r\n  50%,\r\n  75% {\r\n    stroke-dashoffset: 75;\r\n    transform: rotate(45deg);\r\n  }\r\n\r\n  100% {\r\n    stroke-dashoffset: 280;\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.GlobalHelper_container-style__1H2fj {\r\n  z-index: 999;\r\n  position: absolute;\r\n}\r\n\r\n.GlobalHelper_toast-style__2e4nX {\r\n  background-color: #ffff;\r\n  border: 1px solid rgb(70, 67, 67);\r\n  width: 20vw;\r\n  height: 5vh;\r\n  margin: 1em;\r\n  text-align: center;\r\n  box-shadow: 5px 5px rgb(233, 230, 230) ;\r\n  opacity: .7;\r\n  cursor: pointer;\r\n}\r\n\r\n.GlobalHelper_toast-title__1I8LQ {\r\n}\r\n\r\n.GlobalHelper_toast-title-text__2URxU {\r\n    font-size: medium;\r\n\r\n}\r\n\r\n.GlobalHelper_toast-body___uYXc {\r\n\r\n}\r\n\r\n.GlobalHelper_toast-body-text__3qIOz {\r\n    font-size: small;\r\n}\r\n\r\n.GlobalHelper_top-right__1sY_2 {\r\n    top: 0;\r\n    right: 0;\r\n} \r\n.GlobalHelper_top-left__3NgqQ {\r\n    top: 0;\r\n    left: 0;\r\n} \r\n\r\n.GlobalHelper_bottom-right__1ylyX {\r\n    bottom: 0;\r\n    right: 0;\r\n}\r\n.GlobalHelper_bottom-left__2s4wI {\r\n    bottom: 0;\r\n    left: 0;\r\n}\r\n.GlobalHelper_center-right__7Cmcp {\r\n    bottom: 50vh;\r\n    right: 0;\r\n}\r\n.GlobalHelper_center-left__3bqXS{\r\n    bottom: 50vh;\r\n    left: 0;\r\n}";
styleInject(css_248z);

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
