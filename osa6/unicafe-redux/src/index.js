import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const App = () => {
    const good = () => {
        store.dispatch({
            type: 'GOOD'
        })
    }
    const ok = () => {
        store.dispatch({
            type: 'OK'
        })
    }
    const bad = () => {
        store.dispatch({
            type: 'BAD'
        })
    }
    const zero = () => {
        store.dispatch({
            type: 'ZERO'
        })
    }
    return (
        <div>
            <button onClick={good}>good</button>
            <button onClick={ok}>ok</button>
            <button onClick={bad}>bad</button>
            <button onClick={zero}>reset</button>
            <div>
                good: {store.getState().good}
                <br></br>
                ok: {store.getState().ok}
                <br></br>
                bad: {store.getState().bad}
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)