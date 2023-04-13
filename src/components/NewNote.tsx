import { FC, useState } from "react";


const NewNote: FC= () => {
    const [title, setTitle] = useState<string>("");

    const saveNote = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className="flex flex-col justify-between p-5 m-5 h-60 rounded-sm bg-blue-200 md:hover:scale-110 transition duration-500">
            <textarea 
                placeholder="Make your own note..." 
                className="outline-none bg-transparent resize-none h-full"
                onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex align-middle justify-between mt-3">
                <button className="text-green-400-500" onClick={() => {saveNote()}}>Save</button>
            </div>
        </div>
    )
};

export default NewNote;