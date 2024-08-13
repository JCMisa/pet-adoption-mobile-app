import { db } from "@/config/FirebaseConfig"
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore"

const getFavList = async (user) => {
    const docSnap = await getDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress))
    if (docSnap?.exists()) {
        return docSnap.data()
    } else {
        await setDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress), {
            email: user?.primaryEmailAddress?.emailAddress,
            favorites: []
        })
    }
}

const updateFav = async (user, favorites) => {
    const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress)
    try {
        await updateDoc(docRef, {
            favorites: favorites
        })
    } catch (error) {
        console.log("update favorites error: ", error);
    }
}

export default {
    getFavList,
    updateFav
}