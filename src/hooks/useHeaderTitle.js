
import { useContext } from "react";
import { HeaderTitleContext } from "@/services/state/headerTitleContext";

export const useHeaderTitle = () => {
    console.log(useContext(HeaderTitleContext));
    return useContext(HeaderTitleContext);
}