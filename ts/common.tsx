import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {css} from "@emotion/react";



export const siteName = "Chat Assistant"

function Bundle() {
    return <BrowserRouter>
        <ThemeProvider>
            <Header/>
            <Contents/>
        </ThemeProvider>
    </BrowserRouter>
}

ReactDOM.render(<Bundle/>, document.getElementById("react"))
