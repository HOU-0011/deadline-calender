import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./hooks/theme/themeHook";
import {Header} from "./page-component/root/header";
import {Contents} from "./page-component/root/contents";
import {Footer} from "./page-component/root/footer";


export const siteName = "deadline calender"
export const orgName = "HOU_0011"

function Bundle() {
  return <BrowserRouter>
    <ThemeProvider css={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Header css={{
        flex: "none"
      }}/>
      <Contents css={{
        flex: "auto"
      }}/>
      <Footer css={{
        flex: "none"
      }}/>
    </ThemeProvider>
  </BrowserRouter>
}

ReactDOM.render(<Bundle/>, document.getElementById("react"))
