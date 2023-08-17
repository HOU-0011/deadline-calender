import React, {HtmlHTMLAttributes} from "react";
import {appendClass} from '../../util/util'
import {css} from "@emotion/react";
import {useTheme} from "../../hooks/theme/themeHook";

interface HeaderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Header(props: HeaderProp) {
    const theme = useTheme()

    return <header
        {...props}
        className={appendClass("pb-1 h-10 flex text-center", props.className)}
        style={{backgroundColor: theme.main}}
        css={css({backgroundColor: theme.main})}
    >
        {/*<Title className={"mt-2 ml-1 relative"}/>*/}
        {/*<Logo className={"absolute right-0 top-0 h-6 mt-1.5 mr-2"}/>*/}
    </header>

}
