import { getAuth } from "@firebase/auth"
import { getApps, initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import ApiService from "./ApiService";
import { LogBox } from "react-native";
import 'react-native-get-random-values';

LogBox.ignoreAllLogs(true);

let app;
if (!getApps.length) {
    app = initializeApp(ApiService.firebaseConfig);
} else {
    app = app();
}
const db = getFirestore(app);
const auth = getAuth();

const AddeNewNoteToFirestore = async (title, body, date, id, location) => {
    try {
        await setDoc(doc(collection(db, 'notes'), id), {
            title: title,
            body: body,
            date: date,
            user: auth.currentUser.email,
            _id: id,
            location: location
        });
    } catch (e) {
        alert(e.message);
    }
};

const getNotesByEmail = async (collect, email) => {
    const collectNotes = collection(db, collect);
    const Notes = await getDocs(collectNotes);
    let NotesByEmail = [];
    Notes.docs.filter(doc => {
        if (doc.data().user === email) {
            NotesByEmail.push(doc.data());
        }
    });
    return NotesByEmail;
};

const updateNoteDetails = async (collect, note, updateData) => {
    const Data = doc(db, collect, note._id);
    await updateDoc(Data, updateData);
};


const deleteNoteById = async(collect, id) => {
    await deleteDoc(doc(db, collect, id));
};

const getSortedArrayDateFromDict = (dict) => {
    let array = Object.values(dict)
    if(array.length == 1) return [array[0]]
    return array.sort((a,b) => {
      return b.date.toDate() - a.date.toDate()
    }); 
  }

export { auth, AddeNewNoteToFirestore, getNotesByEmail, updateNoteDetails, deleteNoteById, getSortedArrayDateFromDict };


