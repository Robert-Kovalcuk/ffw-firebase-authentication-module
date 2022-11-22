import ISubscriber from "./ISubscriber";


export default abstract class Subscriber implements ISubscriber {
    public abstract onNotified<T>(value: T): void
}
