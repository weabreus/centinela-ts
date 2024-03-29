import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

import { LockClosedIcon } from "@heroicons/react/solid";
import AuthLogo from "./AuthLogo";
import { useHistory } from "react-router-dom";
import UserDataType from "../../models/UserDataType";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import db from "../../firestore/FirestoreConfig";

const AuthForm: React.FC = () => {
  const history = useHistory();
  
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler: (event: React.SyntheticEvent) => void = (event) => {
    event.preventDefault();

    const enteredEmail: string | undefined = emailInputRef.current?.value;
    const enteredPassword: string | undefined = passwordInputRef.current?.value;

    // optional: Add validation

    // setIsLoading(true);
    let url: string;
    if (isLogin) {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_AUTH}`;
    } else {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_AUTH}`;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // setIsLoading(false);
        if (res.ok) {
          setIsLogin(false);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then(async (data) => {
        const expirationTime: Date = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );

        // @ts-ignore
        const user: DocumentSnapshot<UserDataType>= await getDoc(doc(db, "users", data.localId));

        authCtx.login(data.idToken, expirationTime.toISOString(), data.localId, user.data()!.role, user.data()!.complex);
        history.push("/");

      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div className="h-screen flex align-middle items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full  ">
          <AuthLogo />
          <form
            className="mt-8 space-y-6"
            onSubmit={submitHandler}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Correo Electronico
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Correo Electronico"
                  ref={emailInputRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  ref={passwordInputRef}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                {/* <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Olvido su contraseña?
                </a> */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthForm;