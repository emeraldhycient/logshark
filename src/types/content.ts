import React from "react";

export interface IHeaderLink {
    text: string;
    url: string;
    dropdown?: boolean;
    icon?: React.ReactNode;
    component?: IHeaderLink
}

export interface IFaq {
    id: string;
    question: string;
    answer: string;
}