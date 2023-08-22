import {BrowserRouter} from "react-router-dom";
import {ThemeProvider, useTheme} from "./hooks/theme/themeHook";
import {Header} from "./page-component/header/header";
import {Contents} from "./page-component/root/contents";
import {Footer} from "./page-component/root/footer";
import {createRoot} from "react-dom/client";


export const siteName = "Tasdo"
export const orgName = "HOU_0011"

function Bundle() {
  const theme = useTheme()

  return <BrowserRouter>
    <ThemeProvider css={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    }}>
      <div css={{
        flex: "auto",
        display: "flex",
        justifyContent: "center",
      }}>
        <Header css={{
          borderLeft: "1px",
          borderStyle: "solid",
          borderColor: theme.accent,
          flex: "none"
        }}/>
        <Contents css={{
          borderRight: "1px",
          borderLeft: "1px",
          borderStyle: "solid",
          borderColor: theme.accent,
          flex: "none"
        }}/>
      </div>
      <Footer css={{
        flex: "none",
      }}/>
    </ThemeProvider>
  </BrowserRouter>
}

const element = document.getElementById("react")
if (element != undefined) {
  createRoot(element).render(<Bundle/>)
}

