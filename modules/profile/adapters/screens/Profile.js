import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Loading from '../../../../kernel/components/Loading'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import { useNavigation } from '@react-navigation/native'


export default function Profile() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)
    useEffect(() => {
       const auth = getAuth();
       onAuthStateChanged(auth, (credential)=>{
        setUser(credential);
        !credential ? setSession(false) : setSession(true);
       });
       
    }, []);
    if (session===null) return <Loading show={true} text='cargando...' />
    return session ? (
        <UserLogged user={user}/>
    ) :(
        <UserGuest navigation={navigation} />
    ) 
}

const styles = StyleSheet.create({})