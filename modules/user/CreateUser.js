import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isEmpty, size } from "lodash";
import { Image, Input, Button } from "@rneui/base";
import Loading from "../../kernel/components/Loading";
import { Icon } from "react-native-elements";
import { validateEmail } from "../../kernel/validation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function () {
  const payload = {
    email: "",
    password: "",
    repeatPassword: "",
  };
  const [show, setShow] = useState(false);
  const [error, setError] = useState(payload);
  const [data, setData] = useState(payload);
  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const changePayload = (e, type) => {
    setData({ ...data, [type]: e.nativeEvent.text });
  };
  const createUser = () => {
    if (!(isEmpty(data.email) || isEmpty(data.password))) {
      if (validateEmail(data.email)) {
        if (size(data.password) >= 6) {
          if (data.password === data.repeatPassword) {
            console.log("Listo calisto");
            setError(payload);
          } else {
            setError({
              email: "",
              password: "La contraseña debe coincidir",
              repeatPassword: "La contraseña debe coincidir",
            });
          }
        } else {
          setError({
            email: "",
            password: "La contraseña debe tener al menos 6 caracteres",
          });
        }
      } else {
        setError({
          email: "Debe ser un correo electrónico",
          password: "",
          repeatPassword: "",
        });
      }
    } else {
      setError({
        email: "Campo obligatorio",
        repeatPassword: "Campo obligatorio",
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Image
        source={"../../assets/presupuesto.png"}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <View style={styles.container}>
          <Input
            placeholder="Correo electrónico"
            keyboardtype="Email-address"
            rightIcon={
              <Icon type="material-community" name="email" size={22} />
            }
            containerStyle={styles.input}
            onChange={(e) => changePayload(e, "email")}
            errorMessage={error.email}
            autoCapitalize="none"
          />
          <Input
            placeholder="Contraseña"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            secureTextEntry={showPassword}
            onChange={(e) => changePayload(e, "password")}
            errorMessage={error.password}
          />
          <Input
            placeholder="Contraseña"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                onPress={() => setShowRepeatPassword(!showRepeatPassword)}
              />
            }
            secureTextEntry={showRepeatPassword}
            onChange={(e) => changePayload(e, "repeatPassword")}
            errorMessage={error.repeatPassword}
          />
          <Button
            title="Crear cuenta"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={createUser}
          />
        </View>
      </View>
      <Loading show={show} text="Registrar usuario" />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    marginVertical: 10,
  },
  btnContainer: {
    marginBottom: 20,
    width: "95%",
  },
  btn: {
    color: "#28a745",
  },
});
