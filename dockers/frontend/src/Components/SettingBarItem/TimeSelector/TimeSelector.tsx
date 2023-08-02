import { useState } from 'react';
import './TimeSelector.css'
import { v4 as uuidv4 } from 'uuid';

interface ChildProps {
    onParamChange: (param: number) => void;
    childProps: number
    clockSize: number
    fontSize: number
}

const TimeSelector: React.FC<ChildProps> = ({ clockSize, fontSize, childProps, onParamChange }) => {
    const clockNumber: number[] = Array.from({ length: 12 }, (_, index) => index + 1);


    // 下午按鈕
    const ButtonPm = () => {
        return childProps >= 13 && childProps <= 24 ?
            <div className='am_pm_button_clicked' onClick={() => { onParamChange(childProps) }}>下午</div> :
            <div className='am_pm_button' onClick={() => { onParamChange(childProps + 12) }}>下午</div>

    }
    // 上午按鈕
    const ButtonAm = () => {
        return childProps < 13 ?
            <div className='am_pm_button_clicked' onClick={() => { onParamChange(childProps) }}>上午</div> :
            <div className='am_pm_button' onClick={() => { onParamChange(childProps - 12) }}>上午</div>
    }

    // 時鐘本體
    const Clock = () => {
        return (
            <div id="clock">
                <div className="bg">
                    <div className="point">
                        <div id="hour" style={{ transform: `rotate(${childProps * 30}deg)` }} />
                        <div className="circle"></div>
                    </div>
                </div>
                {clockNumber.map((number) => {
                    const deg = (2 * Math.PI) / 12;
                    const angle = deg * number;
                    const x = clockSize / 2 + (clockSize / 2 - fontSize) * Math.cos(angle);
                    const y = clockSize / 2 + (clockSize / 2 - fontSize) * Math.sin(angle);
                    const xCoordinate = x - fontSize / 2;
                    const yCoordinate = y - fontSize / 2;
                    const resTime = number;
                    const isSelected = number === childProps - 12 || number === childProps;

                    return (
                        <div
                            key={uuidv4()}
                            className={`number ${isSelected ? "selected" : ""}`}
                            style={{
                                left: xCoordinate,
                                top: yCoordinate,
                                ...(isSelected
                                    ? {
                                        color: "#fff",
                                        backgroundColor: "#2196F3",
                                        borderRadius: "50%",
                                    }
                                    : {}),
                            }}
                            onClick={() => selectTime(resTime)}
                        >
                            {number}
                        </div>
                    );
                })}
            </div>
        );
    };

    function selectTime(param: number) {
        if (childProps <= 12) {
            onParamChange(param)
        }
        if (childProps > 12 && childProps <= 24) {
            onParamChange(param + 12)
        }
    }

    // 時間1~24
    return (

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "end", width: "320px", height: "252px" }} >
            <ButtonAm />
            <Clock />
            <ButtonPm></ButtonPm>
        </div>

    );
}



export default TimeSelector
