import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from "react";
import '../firebase';


const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [lodaing, setLodaing] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const auth = getAuth();
        
        const unSubscrib = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLodaing(false);
        });

        return unSubscrib;
    }, [])

    // signup funtion
    async function signup(email, password, userName) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        // update profile
        updateProfile(auth.currentUser, {
            displayName: userName,
        });

        const user = auth.currentUser;
        setCurrentUser({ ...user })
    }

    // login function 
    function login(email, password) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout function 
    function logout() {
        const auth = getAuth();
        return signOut(auth);
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            { !lodaing && children }
        </AuthContext.Provider>
    )
}