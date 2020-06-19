import React from "react"

export const Link = ({link}) => (
    <div>
        <div>
            {link.description} ({link.url})
        </div>
    </div>
)