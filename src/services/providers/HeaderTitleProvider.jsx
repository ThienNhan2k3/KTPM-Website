import { useState } from "react";
import { HeaderTitleContext } from "../state/headerTitleContext";

export default function HeaderTitleProvider({children}) {
    const [headerTitle, setHeaderTitle] = useState("");

    return (
        <HeaderTitleContext.Provider  value={{ headerTitle, setHeaderTitle }}>
            {children}
        </HeaderTitleContext.Provider>
    )
}