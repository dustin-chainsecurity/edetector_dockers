import React from "react"
import ItemComponent from "./ItemComponent"
import FullLoading from "../../../../../Components/CommonConponents/FullLoading/FullLoading"
import {useToast} from "../../../../../hooks/useToast/useToast";
import { useAlert } from "../../../../../hooks/useAlert";
import { is, set } from "types-ramda";


const MainComponent = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const alert = useAlert().showAlert;
    const { toast, alarm } = useToast() ;
    const [isToastOrAlarm, setIsToastOrAlarm] = React.useState(true)

    const showAlert = (message: string) => {
        alert(message)
    }

    const showToast = (message: string) => {  
        isToastOrAlarm ? toast(message) : alarm(message)
        setIsToastOrAlarm(!isToastOrAlarm)
    }

    return (
        <div>
            <FullLoading open={isLoading} />
            <h1>點選所需功能</h1>
            <ItemComponent
                label={"安裝並啟動主服務"}
                buttonLabel={"開始"}
                onClick={setIsLoading.bind(null, true)}
            ></ItemComponent>
            <ItemComponent
                label={"重啟主服務"}
                buttonLabel={"開始"}
                onClick={showAlert.bind(null, "重啟主服務")}
            ></ItemComponent>
            <ItemComponent
                label={"移除主服務"}
                buttonLabel={"開始"}
                onClick={showToast.bind(null, "移除主服務")}
            ></ItemComponent>
        </div>
    )
}
export default MainComponent