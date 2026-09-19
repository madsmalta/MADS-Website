import {Footer} from "./footer";
import {Header} from "./header";
export function PageShell({children}:{children:React.ReactNode}){return <><a className="skip-link" href="#main-content">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></>;}

