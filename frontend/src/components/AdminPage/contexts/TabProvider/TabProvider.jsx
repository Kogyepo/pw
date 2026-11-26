import React, { useMemo, useState } from "react";
import { TabContext } from "./TabContext"

export const TabProvider = ({children}) => {
    const [tab, setTab] = useState([]);

    const value = useMemo(
        () => ({setTab, countTab: tab.length}),
        [tab]
    );

    return(
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    )
}