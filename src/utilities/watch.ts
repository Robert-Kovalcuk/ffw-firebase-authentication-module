import Observable from "../observer/Observable";
import Subscriber from "../observer/Subscriber";

export function watch<T>(source: Observable<T>, onChanged: (v: T) => void): () => void {
	class S extends Subscriber {
		onNotified<T>(value: T) {
			onChanged(source.value)
		}
	}

	let subscriber = new S()
	source.addSubscriber(subscriber)

	return () => {
		source.removeSubscriber(subscriber)
		subscriber.onNotified(null)
		subscriber = null
		source = null
	}
}
