import React from "react";

export interface IHeaderLink {
    text: string;
    url: string;
    dropdown?: boolean;
    icon?: React.ReactNode;
    component?: IHeaderLink
}