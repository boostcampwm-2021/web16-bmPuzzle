import { useContext } from "react";
import ToastContext from "@context/toast";

const useToastContext = () => useContext(ToastContext);

export default useToastContext;
