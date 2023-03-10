// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDessoijjGF7R9oqGo08Rq8IcYti4zN_gc",
    authDomain: "mis-finanzas-593df.firebaseapp.com",
    projectId: "mis-finanzas-593df",
    storageBucket: "mis-finanzas-593df.appspot.com",
    messagingSenderId: "501186145955",
    appId: "1:501186145955:web:8a252785a41b971cbd1916"
  };

  export const auth = initializeApp(firebaseConfig);
// Initialize Firebase
export const app = initializeAuth(app, { persistance: getReactNativePersistence(AsyncStorage)});