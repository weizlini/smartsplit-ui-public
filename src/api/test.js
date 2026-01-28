import {get} from "./core"

export function reset(){
    return get('/test/reset');
}