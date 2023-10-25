// Import scss
// import './assets/scss/_theme-light.scss';
import './assets/scss/theme.scss';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Router} from "./router";
import {store} from "./store/store";

// @ts-ignore


// import "./assets/scss/app.scss";

export const Preventool = () => {
    return(
        <Provider store={store}>
            <HashRouter>
                <Router/>
            </HashRouter>
        </Provider>
    )
}