"use client"
import Image from "next/image";
import React, { useEffect } from "react";
import { useState, use } from "react";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [incompleteTask, setIncompleteTask] = useState<{title: string, desc: string} []>([]);
  const [completedTask, setCompletedTask] = useState<{title: string, desc: string} []>([]);
  const [editTask, setEditTask] = useState<{title: string, desc: string} []>([]);
  // By clicking a add task button task should be added to the incompleted list
  // by clicking the delete button task should be deleted from the list
  // by clicking the checkbox the task should be moved to the completed list
  // by clicking the checkbox again the task should be moved to the incompleted list
 //  by  clicking the edit button the task should be edited

  const onSubmit = (e: any) => {
     e.preventDefault();
     setIncompleteTask([...incompleteTask, {title, desc}]);
     setTitle("");
     setDesc("");
  }

  const incompleteDeleteHandler = (index: number) => {
    let copyTask = [...incompleteTask];
    copyTask.splice(index, 1);
    setIncompleteTask(copyTask);
  }

  const DeleteHandler = (index: number) => {
    let copyTask = [...completedTask];
    copyTask.splice(index, 1);
    setCompletedTask(copyTask);
  }

  const incompleteEditHandler = (index: number) => {
    let copyTask = [...incompleteTask];
    let task = copyTask[index];
    setTitle(task.title);
    setDesc(task.desc);
    copyTask.splice(index, 1);
    setIncompleteTask(copyTask);
  }

  const EditHandler = (index: number) => {
    let copyTask = [...completedTask];
    let task = copyTask[index];
    setTitle(task.title);
    setDesc(task.desc);
    copyTask.splice(index, 1);
    setCompletedTask(copyTask);
  }

  const checkHandler = (index: number) => {
    let copyTask = [...incompleteTask];
    let task = copyTask[index];
    let copyCompletedTask = [...completedTask];
    copyCompletedTask.push(task);
    setCompletedTask(copyCompletedTask);
    copyTask.splice(index, 1);
    setIncompleteTask(copyTask);
  }

  const unCheckHandler = (index: number) => {
    let copyTask = [...completedTask];
    let task = copyTask[index];
    let copyIncompleteTask = [...incompleteTask];
    copyIncompleteTask.push(task);
    setIncompleteTask(copyIncompleteTask);
    copyTask.splice(index, 1);
    setCompletedTask(copyTask);
  }
  
  
  return (
   <>
    <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">My Todo list</h1>
    <form onSubmit={onSubmit}>
      <input type="text" className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
         placeholder="Enter task here"
         value={title}
         onChange= {(e) => {
          setTitle(e.target.value)
         }}
      />
      <input type="text" className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2"
         placeholder="Enter description here"
         value={desc}
         onChange= {(e) => {
          setDesc(e.target.value)
         }}
      />
      <button className="bg-black text-white px-4 py-2 text-2xl m-5 rounded-lg">Add Task</button>
    </form>
    <hr />
    <div className="p-8 bg-slate-200 mb-5">
        <h2 className="font-bold text-xl">Incomplete</h2>
        {incompleteTask.map((task, index) => (
          <div key={index} className="border-2 border-zinc-800 flex items-center justify-between">
            <div className="flex items-center">
            <h3>{task.title}</h3>
            </div>
            <p>{task.desc}</p>
            <div className="space-x-1">
            <button className="bg-black text-white px-4 py-2 text-sm rounded-lg" onClick={() => incompleteDeleteHandler(index)}>Delete</button>
            <button className="bg-black text-white px-4 py-2 text-sm rounded-lg" onClick={() => incompleteEditHandler(index)}>Edit</button>
            <button  className="bg-black text-white px-4 py-2 text-sm rounded-lg" onClick={() => checkHandler(index)}>Completed</button>
            </div>
          </div>
        ))}
    </div>
    <div className="p-8 bg-slate-200 mb-5">
      <h2 className="font-bold text-xl">Complete</h2>
    {completedTask.map((task, index) => (
          <div key={index} className="border-2 border-zinc-800 flex items-center justify-between">
            <div className="flex items-center">
            <h3>{task.title}</h3>
            </div>
            <p>{task.desc}</p>
            <div className="space-x-1">
            <button className="bg-black text-white px-4 py-2 text-sm rounded-lg" onClick={() => DeleteHandler(index)}>Delete</button>
            <button className="bg-black text-white px-4 py-2 text-sm rounded-lg" onClick={() => EditHandler(index)}>Edit</button>
            <button  className="bg-black text-white px-4 py-2 text-sm rounded-lg" onClick={() => unCheckHandler(index)}>inComplete</button>
            </div>
          </div>
        ))}
    </div>
   </>
  );
}
