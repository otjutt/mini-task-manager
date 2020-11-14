export interface RootState {
    isOn: boolean
}

export interface StatePageHome {
    formField: TaskPseudo
    tasksCollection: Task[]
}

export interface OwnProps {

}

export interface ReduxAction {
    type: string,
    data: any
}

export interface TaskPseudo {
    description: string
}

export interface Task extends TaskPseudo {
    id: number
}
