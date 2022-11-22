import firebaseApp from "../firebase/index"

import {getAuth, signInWithEmailAndPassword, UserCredential, signOut} from "firebase/auth"

const AUTH = getAuth(firebaseApp)

const service = {
	login(email: string, password: string): Promise<UserCredential> {
		return signInWithEmailAndPassword(AUTH, email, password)
	},

	logout(): Promise<void> {
		return signOut(AUTH)
	}
}

export default service
