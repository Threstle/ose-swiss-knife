import React, { forwardRef, useEffect, useReducer, useRef, useState } from "react";
import { useImmerReducer } from "use-immer";
import Popin from "../../components/popin/Popin";
import useInput from "../../hooks/useInput";
import useKey from "../../hooks/useKey";
import './TrackerPage.less';
import { EKeys, State, TimedEvent } from "./Types";

const STORAGE_KEY = "ose-tracker";

interface IProps { }

const componentName = "TrackerPage";


const initialState: State = {
    turn: 0,
    turnFraction: 0,
    timedEvents: [],
    notifications: []
};

//@ts-ignore
const reducer = (state: State, action) => {


    switch (action.type) {
        case "ADD_TURN":
            state.turn += 1; break;

        case "ADD_TURN_FRACTION":
            state.turnFraction += Math.round(action.payload); break;

        case "ADD_EVENT":
            action.payload.beginning = state.turn;
            action.payload.remainingTurns = action.payload.length;
            state.timedEvents.push(action.payload); break;

        case "RESET_TURN_FRACTION":
            state.turnFraction = 0; break;

        case "REMOVE_EVENT":
            state.timedEvents = state.timedEvents.filter((e, i) => i != action.payload); break;

        case "RESET":
            state.turn = initialState.turn;
            state.turnFraction = initialState.turnFraction;
            state.timedEvents = initialState.timedEvents;
            state.notifications = initialState.notifications;
            break;

        case "EMPTY_NOTIFICATIONS":
            state.notifications = []; break;

        case "UPDATE_TIMED_EVENTS":

            state.timedEvents.map((event) => {

                event.remainingTurns = event.beginning + event.length - state.turn;
                if (event.remainingTurns <= 0) {
                    console.log(state.notifications);
                    state.notifications.push(event.name);
                    // alert(event.name);

                    if (event.repeat) {
                        event.beginning = state.turn;
                        event.remainingTurns = event.length;
                    }

                }

                return event;
            })

            state.timedEvents = state.timedEvents.filter(event => event.remainingTurns > 0); break;

        default: break;

        //localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

}


/**
 * @name HomePage
 */
const HomePage = forwardRef((props: IProps) => {

    // --------------------------------------------------------------------------------- HOOKS

    const key = useKey();

    let [state, dispatch] = useImmerReducer(reducer, initialState);

    const [popinText, setPopinText] = useState(null);

    const groupSpeed = useInput(120);

    const eventName = useInput("Encounter");
    const eventLife = useInput(2);
    const eventRepeat = useInput(true);

    // --------------------------------------------------------------------------------- USE EFFECTS

    useEffect(() => {

        if(key === EKeys.VALIDATE){emptyNotifications();return;}
        if(state.notifications.length>0)return;

        switch (key) {
            case EKeys.ADD_FIVE_FEET: addFeet(5); return;
            case EKeys.ADD_TEN_FEET: addFeet(10); return;
            case EKeys.ADD_TWENTY_FEET: addFeet(20); return;
            case EKeys.ADD_THIRTY_FEET: addFeet(30); return;
            case EKeys.ADD_FORTY_FEET: addFeet(40); return;
            case EKeys.ADD_FIFTY_FEET: addFeet(50); return;
            case EKeys.ADD_SIXTY_FEET: addFeet(60); return;
            case EKeys.ADD_SEVENTY_FEET: addFeet(70); return;
            case EKeys.ADD_EIGHTY_FEET: addFeet(80); return;
            case EKeys.ADD_NINETY_FEET: addFeet(90); return;
            case EKeys.ADD_TURN: addTurn(); return;
            case EKeys.ADD_TORCH: addTorch(); return;
            case EKeys.RESET: reset(); return;
            default: return;
        }
    }, [key]);

    useEffect(() => {

        if (state.turnFraction >= 100) {

            dispatch({ type: "ADD_TURN" })
            dispatch({ type: "RESET_TURN_FRACTION" });
            dispatch({ type: "ADD_TURN_FRACTION", payload: state.turnFraction % 100 });
        }

    }, [state.turnFraction]);

    useEffect(() => {
        dispatch({ type: "UPDATE_TIMED_EVENTS" })
    }, [state.turn]);


    // --------------------------------------------------------------------------- HANDLERS

    const addTorch = () => {
        dispatch({
            type: "ADD_EVENT", payload: {
                name: "Torch",
                length: 6,
                repeat: false
            }
        });
    }

    const addFeet = (pFeet: number) => { dispatch({ type: "ADD_TURN_FRACTION", payload: feetToPercent(pFeet) }) }

    const addTurn = () => { dispatch({ type: "ADD_TURN", payload: 5 }) }

    const addCustomEvent = () => {

        if (!eventName.value || !eventLife.value) return;

        dispatch({
            type: "ADD_EVENT", payload: {
                name: eventName.value,
                length: parseInt(eventLife.value),
                repeat: eventRepeat.value
            }
        })
    }

    const removeEvent = (pIndex: number) => {
        dispatch({
            type: "REMOVE_EVENT", payload: pIndex
        })
    }

    const emptyNotifications = () => { dispatch({ type: "EMPTY_NOTIFICATIONS" }); }
    
    const reset = () => { dispatch({ type: "RESET" }); }

    // --------------------------------------------------------------------------- Utils

    const feetToPercent = (pFeet: number) => {
        return pFeet * 100 / groupSpeed.value;
    }

    // -------------------–-------------------–-------------------–--------------- REGISTER PAGE

    // -------------------–-------------------–-------------------–--------------- RENDER

    return <div className={componentName}>
        {
            state?.notifications?.length > 0 &&
            <Popin
                text={state.notifications.reduce((accumulator: string, name: string) => { return accumulator +", "+ name })}
                onClick={emptyNotifications}
            />
        }
        <div className={`${componentName}_section`}>
            <h2>Parameters</h2>
            <div className={`${componentName}_line`}>
                <label>Group speed : </label>
                <input onChange={groupSpeed.onChange} value={groupSpeed.value} name="eventName" type="text" />
            </div>
        </div>

        <div className={`${componentName}_section`}>
            <h2>Timer</h2>
            <div className={`${componentName}_line`}>
                <h3>Turn : {state.turn}</h3>
            </div>
            <div className={`${componentName}_line`}>
                <h3>Turn advancement : {state.turnFraction} %</h3>
            </div>
        </div>

        <div className={`${componentName}_section`}>
            <h2>Actions</h2>
            <button onClick={addTurn}>Add turn</button>
            <button onClick={() => addFeet(5)}>Add 5"</button>
            <button onClick={() => addFeet(10)}>Add 10"</button>
            <button onClick={addTorch}>Add Torch</button>
            <div className={`${componentName}_subSection`}>
                <div className={`${componentName}_line`}>
                    <label>Event name</label>
                    <input name="eventName" type="text" {...eventName} />
                </div>
                <div className={`${componentName}_line`}>
                    <label>Event life/delay</label>
                    <input name="eventLife" type="number" min="1" {...eventLife} />
                </div>
                <div className={`${componentName}_line`}>
                    <label>Repeats</label>
                    <input name="eventRecuring" type="checkbox" onChange={eventRepeat.onChange} checked={eventRepeat.value} />
                </div>
                <button onClick={addCustomEvent}>Add Custom Event</button>
            </div>
        </div>
        <div className={`${componentName}_section`}>
            <h2>Events</h2>
        </div>
        <ul>
            {state.timedEvents.map((event: any, index: number) => {
                return <li key={index} className={`${componentName}_event`}>
                    <h3>{event.name} : {event.remainingTurns}</h3><button onClick={() => removeEvent(index)}>X</button>
                </li>
            })}
        </ul>
    </div>;
});

export default HomePage;

/*
const usePopin = (pInitialText:string)=>{

    const [text, setText] = useState(pInitialText);

    const onChange = (e: any) => {
        //setText(e.target.type=="checkbox"?e.target.checked:e.target.value)
    };

    return {
        text,
        onChange
    };

}*/