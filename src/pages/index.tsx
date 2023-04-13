import { type NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";

import Note from "@/components/Note";
import NewNote from "@/components/NewNote";

interface noteInterface {
  notes: Array<{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }>
}

const Home: NextPage<noteInterface> = (props) => {
  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [responsesPerPage, setResponsesPerPage] = useState(20);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  let filteredNotes = props.notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  if(searchType === "completed") {
    filteredNotes = filteredNotes.filter((note) => note.completed === true);
  } else if(searchType === "uncompleted") {
    filteredNotes = filteredNotes.filter((note) => note.completed === false);
  }

  //filteredNotes = filteredNotes.slice(0, 10)

  const indexOfLastResponse = currentPage * responsesPerPage;
  const indexOfFirstResponse = indexOfLastResponse - responsesPerPage;
  const currentResponses = filteredNotes.slice(indexOfFirstResponse, indexOfLastResponse);

  const totalPages = Math.ceil(filteredNotes.length / responsesPerPage);

  return (
    <>
      <Head>
        <title>Notes App!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="text-5xl text-center m-10">
          Notes App!
        </div>

        <div className="flex m-auto justify-center items-center">
          <div className="mr-2 text-2xl">Search</div>
          <input 
            type="text" 
            placeholder="Search..." 
            className="md:w-1/3 p-3 rounded-xl bg-slate-300"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex m-auto justify-center items-center md:w-1/3 mt-3">
            <div className="mr-2 text-2xl">Filter</div>
            <select
              className="md:w-1/3 p-3 rounded-xl bg-slate-300"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
        </div>

        <div className="flex flex-row m-auto justify-center">
        {currentPage > 1 && (
          <button className="bg-slate-300 p-3 m-2 rounded-xl" onClick={handlePrevPage}>Previous Page</button>
        )}
        {currentPage < totalPages && (
          <button className="bg-slate-300 p-3 m-2 rounded-xl" onClick={handleNextPage}>Next Page</button>
        )}
      </div>

        <div className="md:grid md:grid-rows-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 md:p-10">
          <NewNote />
          {
            currentResponses.map((note) => {
              return (
                <Note id={note.id} title={note.title} completed={note.completed} />
              )
            })
          }
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const notes = await res.json();

  console.log(notes);

  return {
    props: {
      notes: notes
    },
  }
}


export default Home;
