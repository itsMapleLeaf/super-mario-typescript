export class InputRouter<Receiver> {
  receivers = new Set<Receiver>()

  addReceiver(receiver: Receiver) {
    this.receivers.add(receiver)
  }

  dropReceiver(receiver: Receiver) {
    this.receivers.delete(receiver)
  }

  route(routeInput: (receiver: Receiver) => void) {
    for (const receiver of this.receivers) {
      routeInput(receiver)
    }
  }
}
