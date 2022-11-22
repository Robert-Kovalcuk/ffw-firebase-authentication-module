import {UserCredential} from "firebase/auth"

import signUpService from "./signUpService"
import signInService from "./signInService"
import Observable from "../observer/Observable"
import Subscriber from "../observer/Subscriber"
import {watch} from "../utilities/watch";

interface AuthState {
	status: Status,
	userCredential: UserCredential | null
}

enum Status {
	Authenticated,
	NotAuthenticated,
	Pending
}

class Authentication {
	private readonly _state: Observable<AuthState>

	public constructor() {
		this._state = new Observable<AuthState>({
			status: Status.Pending,
			userCredential: null
		})
	}

	public get state(): AuthState {
		return this._state.value
	}

	public subscribeToState(subscriber: Subscriber): void {
		this._state.addSubscriber(subscriber)
	}

	public async currentAuthStatus(): Promise<boolean> {
		switch (this._state.value.status) {
			case Status.Authenticated:
				return true
			case Status.NotAuthenticated:
				return false
			case Status.Pending:
				return new Promise<boolean>(resolve => {
					watch(this._state, value => {
						return resolve(value.status === Status.Authenticated)
					})
				})
		}
	}

	public login(email: string, password: string): Promise<UserCredential> {
		return signInService.login(email, password).then(user => {
			this._state.value = {
				status: Status.Authenticated,
				userCredential: user
			}

			return user
		})
	}

	public logout(): Promise<void> {
		return signInService.logout().then() // swallow response
	}

	public registerViaEmail(email: string, password: string): Promise<UserCredential> {
		return signUpService.registerViaEmail(email, password)
	}
}

export default new Authentication
