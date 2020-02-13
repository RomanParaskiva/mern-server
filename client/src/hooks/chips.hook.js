import {useCallback} from 'react';
import {Chips, default as M} from "materialize-css";

export const useChips = () => {
    let instance = M.Chips.getInstance(document);
    return useCallback(chip => {
        if(window.M && chip){
            instance.addChips({tag:chip})
        }
    },[])
}