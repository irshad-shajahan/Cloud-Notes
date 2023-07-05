import { useEffect, useState } from 'react';
import bgImage from '../assets/bgimg.jpg';
import { toast } from 'react-toastify';
import noteimg from '../assets/note.avif';
import { useNavigate } from 'react-router-dom';
import { getdata, postForm } from '../Axios/api';

function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [newNote, setNewNote] = useState('');
    const [notes, setNotes] = useState(null)
    const [noteId, setNoteId] = useState(null)
    useEffect(() => {
        getdata('/getUser').then((res) => {
            setUser(res?.data.user)
        })
    }, [])
    useEffect(() => {
        getdata('/getNotes').then((res) => {
            if (res.data.success) {
                setNotes(res?.data.notes)
            }
        })
    }, [])
    function addNote() {
        if (newNote !== '') {
            if(noteId){
                postForm('/addNote', {noteId,note: newNote}).then((res) => {
                    if (res?.data.success) {
                        if (res.data.notes) {
                            setNotes(res.data.notes)
                        }
                        setNewNote('')
                        toast.success('Note added succesfully')
                    } else {
                        toast.error('something went wrong')
                    }   
                }) 
            }else{
                postForm('/addNote', {noteId:null,note: newNote}).then((res) => {
                    if (res?.data.success) {
                        if (res.data.notes) {
                            setNotes(res.data.notes)
                        }
                        setNewNote('')
                        toast.success('Note added succesfully')
                    } else {
                        toast.error('something went wrong')
                    }
                })
            }
        } else {
            toast.warning("Please enter a valid note")
        }
    }
    function deleteHandler(id) {
        getdata(`/deleteNote/${id}`).then((res) => {
            if (res.data.success) {
                const updatedList = notes.filter((note) => note._id !== id);
                setNotes(updatedList)
            } else {
                toast.warning('something went wrong')
            }
        })
    }
    return (
        <div>
            <div
                className='flex h-screen w-full'
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className='w-1/5 pt-4 px-2 flex flex-col'>
                    <div className='border-black border p-1 justify-between px-5 flex hover:bg-blue-300 hover:bg-opacity-50' onClick={() => {
                        setNewNote('')
                        setNoteId(null)
                    }}>
                        <h5 className='text-base font-semibold'>New Note</h5>
                        <span className='mt-1'><ion-icon name="add-outline"></ion-icon></span>
                    </div>
                    {notes?.map((elem) => {
                        return (
                            <div className='border-black border mt-2 p-1 justify-between flex hover:bg-blue-300 hover:bg-opacity-50' key={elem._id}>
                                <div className='ml-5 w-7/8 h-full' onClick={() => {
                                    setNewNote(elem.note)
                                    setNoteId(elem._id)
                                }}>
                                    <h5 className='text-base font-semibold'>{elem.note.slice(0, 20)}</h5>
                                </div>
                                <div className='hover:bg-red-400 mr-5 w-1/8' onClick={() => deleteHandler(elem._id)}>
                                    <span className='mt-1'><ion-icon name="trash-outline"></ion-icon></span>
                                </div>
                            </div>
                        );
                    })}

                </div>
                <div className='w-3/5'>
                    {/* Text Area for Note-Taking */}
                    <div
                        className='w-full h-full'
                    >
                        <textarea
                            style={{
                                backgroundImage: `url(${noteimg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            className='w-full h-full p-2'
                            placeholder='Write your note here...'
                            value={newNote} // Add the value of the note from state if needed
                            onChange={(e) => setNewNote(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className='w-1/5 bg-opacity-10 bg-black flex flex-col p-10'>
                    {user ? <>
                        <h1 className='text-black text-center text-lg font-semibold'>{user?.name}</h1>
                        <button className='bg-blue-600 mx-10 mt-10 rounded-md py-3 text-lg font-semibold text-white' onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/login')
                        }}>Logout</button>
                        {newNote !== '' ? <button className='bg-red-600 mx-10 mt-40 rounded-md py-2 text-lg font-semibold text-white flex justify-between px-5' onClick={addNote}><p>Add</p> <span className='text-2xl font-bold'><ion-icon name="add-outline"></ion-icon></span></button> : ''}</>
                        :
                        <button className='bg-blue-600 mx-10 mt-10 rounded-md py-3 text-lg font-semibold text-white' onClick={() => navigate('/login')}>Login</button>}
                </div>
            </div>
        </div>
    );
}

export default Home;
