import Subscriber from "./Subscriber"

export default interface IObservable<T> {
    subscribers: Subscriber[]
	value: T
}
