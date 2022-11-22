import IObservable from "./IObservable"
import Subscriber from "./Subscriber"

export default class Observable<T> implements IObservable<T>  {
	public subscribers: Subscriber[] = []
	private _value: T

	get value(): T {
		return this._value;
	}

	set value(value: T) {
		this._value = value;
		this.notify()
	}

	constructor(value: T) {
		this._value = value
	}

    private notify(): void {
        this.subscribers.forEach(e => e.onNotified<T | null>(this._value))
    }
    public addSubscriber<T>(subscriber: Subscriber): boolean {
        if(this.subscribers.length !== 0 && this.subscribers.some(e => e === subscriber))
            return false

        this.subscribers.push(subscriber)
        return true
    }
    public removeSubscriber(subscriber: Subscriber): void {
        this.subscribers = this.subscribers.filter(e => e !== subscriber)
    }
}
