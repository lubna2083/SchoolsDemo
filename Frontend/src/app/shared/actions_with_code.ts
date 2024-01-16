import { Actions,ActionCode } from "./actions_enums";


export interface ActionsWithCode {
    action: Actions,
    code: {type:ActionCode,action:any,text:string,routeId:string}
}