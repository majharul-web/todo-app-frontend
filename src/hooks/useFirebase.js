
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Pages/Login/Firebase/initializeAuthentication";

initializeAuthentication()
const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)



    const googleSignIn = (location, navigate) => {
        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user)
                setError('')

                navigate(location.state?.from || '/')

            })
            .catch(error => {
                setError(error.message)
                setSuccess(false)
            })
            .finally(() => setIsLoading(false));
    }



    //create user by email & password
    const createUser = (email, password, name, navigate, location) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user)
                setError('')
                setSuccess(true)

                const newUser = { email, displayName: name }
                setUser(newUser)
                // update userName
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });

                navigate(location.state?.from || '/')
            })
            .catch(error => {
                setError(error.message)
                setSuccess(false)
            })
            .finally(() => setIsLoading(false));
    }

    //sing In user with password
    const signInUser = (email, password, location, navigate) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                navigate(destination)
                setError('');
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    // observe user
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth]);


    //sing out user
    const singOutUser = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => {
                setUser({})
                setError('')
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => setIsLoading(false));
    }





    return {
        user,
        error,
        success,
        isLoading,
        googleSignIn,
        createUser,
        signInUser,
        singOutUser,

    }
}

export default useFirebase;