import invariant from 'fbjs/lib/invariant'

const listeners = {}
const eventTypes = [ 'change' ]

class AppState {

  static addEventListener(type: string, handler: Function) {
    listeners[handler] = () => {
      var currentState = 'active';
      switch (document.visibilityState) {
        case 'hidden':
        case 'prerender':
        case 'unloaded':
          currentState = 'background';
        default:
          currentState = 'active';
      }
      return handler(currentState);
    }
    invariant(eventTypes.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type)
    document.addEventListener('visibilitychange', listeners[handler], false)
  }

  static removeEventListener(type: string, handler: Function) {
    invariant(eventTypes.indexOf(type) !== -1, 'Trying to remove listener for unknown event: "%s"', type)
    document.removeEventListener('visibilitychange', listeners[handler], false)
    delete listeners[handler]
  }
}

module.exports = AppState
