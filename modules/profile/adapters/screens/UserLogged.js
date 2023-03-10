import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar } from '@rneui/base'
import React, { useState } from 'react'
import Loading from '../../../../kernel/components/Loading'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
//import { getAuth, updateProfile } from 'firebase/auth'
import * as Imagepicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { getAuth, updateProfile } from 'firebase/auth'

export default function UserLogged(props) {
    const auth = getAuth();
    const { user } = props
    const [show, setShow] = useState(false)
    // const removeValue = async () => {
    //     try {
    //         setShow(true)
    //         await AsyncStorage.removeItem('@session')
    //         setShow(false)
    //         setReload(true)
    //     } catch (e) {
    //         setShow(false)
    //         console.log('Error - UserLogged(12)', e);
    //     }
    // }

    const uploadImage = async (uri) => {
        setShow(false);
        const response = await fetch(uri);
        console.log("respuesta", response)
        const {_bodyBlob} = response;
        const storage = await getStorage();
        const storageRef = ref(storage, `avatars/${user.uid}`);
        return uploadBytes(storageRef, _bodyBlob);
        setShow(false);

    }
    const changeAvatar = async () => {
      const resultPermission = await Permissions.askAsync(Permissions.CAMERA)
      if(resultPermission.permissions.camera.status !== 'denied') {
        let result = await Imagepicker.launchImageLibraryAsync({
          mediaTypes: Imagepicker.MediaTypeOptions.Images,
          allowsEditing:true,
          quality:1,

        })
        if(!result.canceled){
          uploadImage(result.assets[0].uri).then((response)=>{
            console.log('Imagen actualizada');
            uploadImage
          }).catch((err)=>{
            console.log('Error, ', err);
          })
        }else{
          console.log('No se ha seleccionado una imagen');
        }
        
        
      }
    }
    const uploadPhotoProfile = () =>{
      const storage = getStorage();
      getDownloadURL(ref(storage, `avatars/${user.uid}`))
      .then((url)=>{
        updateProfile(auth.currentUser,{
            photoURL: url, //lo que se quiere cambiar
        })
        .then(()=>{
            setShow(false);
        })
        .catch((err)=>{
            setShow(false);
            console.log('fallo', err);
        });
      }).catch((err)=>{
        setShow(false)
        console.log('Error a obtener la imagen', error);
      })
  }

    return (
        <View style={styles.container}>
            {user && (
                <View style={styles.infoContainer}>
                <Avatar
                    size='xlarge'
                    rounded
                    source={{ uri: user.photoURL }}
                    containerStyle={styles.avatar}
                >
                    <Avatar.Accessory
                        size={50}
                        onPress={changeAvatar}
                    />
                </Avatar>
                <View>
                    <Text style={styles.displayName}>
                        {user.providerData[0].displayName ? user.providerData[0].displayName : 'Anónimo'}
                    </Text>
                    <Text>
                        {user.providerData[0].email}
                    </Text>
                </View>
            </View>
            )}
            
            <View style={styles.btnContainer}>
                <Button
                    title='Cerrar sesión'
                    buttonStyle={styles.btn}
                    onPress={() => {
                        setText('Cerrando sesión')
                        return auth.signOut()
                    }}
                />
            </View>
            <Loading show={show} text='Actualizando...' />
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        minHeight: '100%',
        backgroundColor: '#FFF'
    },
    btn: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: 'tomato',
        paddingVertical: 10
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 30
    },
    avatar: {
        marginRight: 16
    },
    displayName:{
        fontWeight: 'bold',
        paddingBottom: 5
    },
})