import React from 'react'
import {Link} from "react-router-dom";

import Support from "./support"
const Breadcrumbs = ({crumbs, style, className}) => {
    // Don't render a single breadcrumb.
    if (crumbs.length <= 1) {
        return null;
    }
    return (
        <div className={`text-right bg-white border-bottom shadow-sm ${className}`} style={{
            paddingTop: "15px",
            paddingBottom: "15px",
            width: "100%",
            position: "fixed",
            top: "64px",
            zIndex: "1", ...style
        }}>
            <div className="d-flex  align-items-center justify-content-between">
                <div>
                    {/* Link back to any previous steps of the breadcrumb. */}
                    {crumbs.map(({name, path}, key) =>
                            key + 1 === crumbs.length ? (
                                <span key={key} className="mr-1">
                {name}
            </span>
                            ) : (
                                <span className="mr-1" key={key}>
              <Link  to={path} className="link-color">
                  {name} 
              </Link>
              <span className="mr-1"> / </span>
            </span>
                            )
                    )}
                </div>
                            <Support/>
            </div>
        </div>
    );
};
export default Breadcrumbs;