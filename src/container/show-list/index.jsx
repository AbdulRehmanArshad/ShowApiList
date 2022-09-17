import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios"

const getlocalItems = () => {
    let list = localStorage.getItem("list")
    if (list) {
        return JSON.parse(localStorage.getItem("list"))
    } else {
        return []
    }
}
const Showlist = () => {
    const [list, setList] = useState(getlocalItems())
    const [showModal, setShowModal] = React.useState(false);
    const [tittle, setTittle] = useState()
    const [update, setUpdate] = useState()
    const [updateLocalStorage, setUpdateLocalStorage] = useState()
    const loc = (params) => {
        getlocalItems()
    }

    const SaveChanges = () => {
        console.log(update);
        list[update].title = tittle
        setList(list)
        setShowModal(false)
        localStorage.setItem("list", JSON.stringify(list))

    }
    const Edit = (item, index) => {
        setShowModal(true)
        setTittle(item.title)
        setUpdate(index)

    }
    const AxiosCall = () => {
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => setList(res.data))
    }
    useEffect(() => {
        const list = localStorage.getItem("list")
        if (list) {
            setList(getlocalItems())

        } else {
            AxiosCall()
        }

    }, [])
    return (
        <>

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="relative p-6 flex-auto">
                                    <div>
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tittle</label>
                                        <input
                                            value={tittle}
                                            onChange={(e) => setTittle(e.target.value)}
                                            type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={SaveChanges}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={SaveChanges}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

            <div className='container mx-auto px-4'>
                <h1 style={{ marginTop: "30px" }} className="text-2xl text-center">Show Api List</h1>
                {
                    list.map((item, index) => {
                        return (
                            <>
                                <div key={item.id} style={{ marginTop: "30px" }}  >
                                    <li  >{item.title}</li>
                                    <button onClick={() => Edit(item, index)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                    </button>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    );
};

export default Showlist;