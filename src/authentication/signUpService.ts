import firebaseApp from "../firebase/index"
import {getAuth, UserCredential, createUserWithEmailAndPassword} from "firebase/auth"

const AUTH = getAuth(firebaseApp)

const service = {
	registerViaEmail(email: string, password: string): Promise<UserCredential> {
		return createUserWithEmailAndPassword(AUTH, email, password)
	}
}

export default service
