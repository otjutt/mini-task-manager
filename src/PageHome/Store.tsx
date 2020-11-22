import { combineReducers } from 'redux';
import { ReduxAction } from "./Types";
import * as Axios from "axios";
import Dexie from "dexie";

export const ACTION__PAGE_HOME__FORM_FIELD: string = 'page_home__form_field';
export const ACTION__PAGE_HOME__GET_TASKS_LIST: string = 'page_home__get_tasks_list';
export const ACTION__PAGE_HOME__SET_TASKS_COLLECTION: string = 'page_home__set_tasks_collection';

function welcome(state: any) {
    /* Set default value */
    if (typeof state === 'undefined') {
        state = 'Welcome';
    }

    /* Default value. */
    return state;
}

/* Action Update Form Fields */
export function actionUpdateFormField(name: string, value: string) {
    return (dispatch: any) => {

        dispatch({
            type: ACTION__PAGE_HOME__FORM_FIELD,
            data: {
                name,
                value
            }
        });
    };
}

export function actionListTasks() {
    return (dispatch: any) => {
        const db: any = new Dexie('MiniTaskManager');
        db.version(1).stores({
            tasks: '++id, description'
        });
        db.tasks
            .offset(0)
            .limit(100)
            .toArray(function (tasks: any) {
                dispatch({
                    type: ACTION__PAGE_HOME__SET_TASKS_COLLECTION,
                    data: tasks
                });
                dispatch({
                    type: ACTION__PAGE_HOME__FORM_FIELD,
                    data: {
                        name: 'description',
                        value: ''
                    }
                });
            });
    };
}

/* Reducer */
function formField(state: any, action: ReduxAction) {
    if (typeof state === 'undefined') {
        /* Default value for Form fields. */
        state = {
            description: ''
        };
    }
    switch (action.type) {
        case ACTION__PAGE_HOME__FORM_FIELD:
            return {...state, [action.data.name]: action.data.value};
        default:
            return state;
    }
}

function tasksCollection(state: any, action: ReduxAction) {
    /* Set default value */
    if (typeof state === 'undefined') {
        state = [];
    }

    if (action.type === ACTION__PAGE_HOME__SET_TASKS_COLLECTION) {
        return action.data;
    }

    /* Default value. */
    return state;
}

export const reducers = combineReducers({
    welcome,
    formField,
    tasksCollection
});

