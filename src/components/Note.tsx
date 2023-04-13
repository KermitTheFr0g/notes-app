import { FC, useState } from "react";

interface NoteProps {
    id: number;
    title: string;
    completed: boolean;
}

const Note: FC<NoteProps> = ({ id, title, completed }) => {
    // * used to show the state being changed due to the API not being live to change to completed
    const [completedState, setCompletedState] = useState<boolean>(completed);
    
    const deleteNote = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        console.log(data);
    }

    const setCompleted = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
            method: 'PUT',
            body: JSON.stringify({
                completed: !completed
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        console.log(data);
        setCompletedState(!completedState)
    }

    return (
        <div className="flex flex-col justify-between p-5 m-5 h-60 rounded-sm bg-yellow-200 md:hover:scale-110 transition duration-500">
            <span>{title}</span>
            <div className="flex align-middle justify-between">
                <div className="flex">
                    <input type="checkbox" checked={completedState} onChange={() => {
                        setCompleted();
                    }} />
                    <div className="ml-2">Completed</div>
                </div>
                <button className="text-red-500" onClick={() => {deleteNote()}}>Delete</button>
            </div>
        </div>
    )
};

export default Note;