Global Helper is a Loading indicator (full screen) and toasts in 1 component accessible by a hook.

## How it works

Using react context, the "Provider" needs to be wrapped around your application. It handles its own state, and accepts different components for the overlay or the Toast
(If you are using bootstrap or bulma or you have your own internal css framework, you can pass a custom component and that is what is going to display.)

### TS

This package was build using Typescript<br />

### Available parameters

Launches the test runner in the interactive watch mode.<br />
**GlobalHelperProvider**

<GlobalHelperProvider>

Wraps around your application (similar to navigation or redux store)<br/>
Takes the following parameters:

overLayColor (String) Optional
Color of overlay background<br/>

overLayComponent (Component) Optional
If you have a specific component in mind for the center such as a spinner or loadingbar <br/> 

overLayStyle (Style Object) Optional
Style for the Loading page <br/>

defaultToast (Component) Optional
If you want to add a unique toast element such as bootstrap or custom component. Must Contain a title and a body or no message will show unless you have a default in the component<br/>

toastStyle (Style Object) Optional
if you want to modify the default toast style, use this <br/>

toastTimeOut (Number) Optional
Timer for auto dimiss toasts in ms <br/>

toastLocation ("top-right" | "top-left" | "bottom-right" | "bottom-left" | "center-right" | "center-left") Optional
Locations of the toast on the screen <br/>

children * Whatever is wrapped



**useGlobalHelper**

useGlobalHelper is a hook that can be used on components to access toasting or overlaying. 

it can return the following functionality

addToast() 
returns id
accepts message object which expects a title and body for the toast<br/>

removeToast()
accepts id and dismisses the toast<br/>

addOverLay()
adds overlay to the application <br/>

removeOverLay()
dismisses the overLay <br/>

removeAllToasts()
dismisses all the toasts <br/>

removeAllHelper()
dismisses all the toasts and the overLay<br/>