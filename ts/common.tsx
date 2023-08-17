import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./hooks/theme/themeHook";
import {Header} from "./component/root/header";
import {Contents} from "./component/root/contents";


export const siteName = "deadline calender"

function Bundle() {
    return <BrowserRouter>
        <ThemeProvider>
            <Header/>
            <Contents/>
        </ThemeProvider>
    </BrowserRouter>
}

ReactDOM.render(<Bundle/>, document.getElementById("react"))
