import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from "react-router";
import * as StorePageHome from "./Store";
import { OwnProps, StatePageHome, Task, TaskPseudo } from "./Types";
import Dexie from "dexie";

const mapStateToProps = (state: any): {
    formField: TaskPseudo,
    tasksCollection: Task[]
} => {
    const statePageHome: StatePageHome = state.PageHome;
    return {
        formField: statePageHome.formField,
        tasksCollection: statePageHome.tasksCollection
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: OwnProps) => {
    return {
        actionUpdateFormField: (name: string, value: string) => {
            dispatch(StorePageHome.actionUpdateFormField(name, value))
        },
        actionListTasks: () => {
            dispatch(StorePageHome.actionListTasks())
        },
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

class PageHome extends React.Component<ConnectedProps<typeof connector>> {

    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFormFieldChange = this.onFormFieldChange.bind(this);
    }

    onSubmit(e: any) {
        e.preventDefault();
        if (this.props.formField.description.trim() === '') {
            return;
        }
        const db: any = new Dexie('MiniTaskManager');
        db.version(1).stores({
            tasks: '++id, description'
        });

        db.tasks.add({
            description: this.props.formField.description,
        }).then((e: any) => {
            this.props.actionListTasks();
        });
    }

    onFormFieldChange(e: any) {
        this.props.actionUpdateFormField(e.target.name, e.target.value);
    }

    componentDidMount() {
        document.body.removeAttribute('class');
        document.body.classList.add('component-page-home');

        this.props.actionListTasks();
    }

    render() {
        let collectionReact = null;
        if (typeof this.props.tasksCollection !== 'undefined') {
            if (this.props.tasksCollection.length !== 0) {
                collectionReact = (<React.Fragment>{this.props.tasksCollection.map( (item) => {
                    return (
                        <React.Fragment key={item.id}>
                            <tr>
                                <td width={50}>
                                    <input type={`checkbox`} />
                                </td>
                                <td>{item.description}</td>
                                <td width={170}>
                                    <div className={`btn-case`}>
                                        <button className={`btn btn-danger`}>
                                            <i className="las la-trash"></i>
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        </React.Fragment>
                    );
                })}</React.Fragment>);
            }
        }

        return (
            <React.Fragment>
                <div className={`main`}>
                    <div className={`inner-wrapper`}>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text"
                                       className="form-control"
                                       id="exampleInputEmail1"
                                       onChange={this.onFormFieldChange}
                                       value={this.props.formField.description}
                                       name={`description`}
                                       aria-describedby="emailHelp"
                                       placeholder="Write task description here..." />
                            </div>
                            <div className={`add-task-button-wrapper`}>
                                <button type="submit" className="btn btn-primary">Add Task</button>
                            </div>
                        </form>
                        <br />
                        <table className="table">
                            <tbody>
                            {collectionReact}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(connector(PageHome));
