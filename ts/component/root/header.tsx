import React, {HtmlHTMLAttributes} from "react";
import {appendClass} from '../../util/util'
import {useTheme} from "../../hooks/theme/themeHook";
/** @jsx jsx */
import {css,jsx} from "@emotion/react";

interface HeaderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Header(props: HeaderProp) {
    const theme = useTheme()

    return <div
        {...props}
        className={appendClass("pb-1 h-10 flex text-center", props.className)}
        css={css({
            backgroundColor: theme.main,
            height: "30px",
        })}
    >
        {/*<Title className={"mt-2 ml-1 relative"}/>*/}
        {/*<Logo className={"absolute right-0 top-0 h-6 mt-1.5 mr-2"}/>*/}
    </div>

}
