import { useReducer } from 'react';
import './style.css';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import { act } from 'react-dom/test-utils';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'

}

function reducer(state, action){
  switch (action.type){
    //This case is responsible to show the digits onto the screen
    case ACTIONS.ADD_DIGIT:
      if(state.currentOperation === '0' && action.payload.digit === '0'){
        return state;
      }
      if (action.payload.digit === "." && state.currentOperation.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperation: `${state.currentOperation || ''}${action.payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return{
        state: null
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.currentOperation == null){
        return state;
      }
      return{
        ...state,
        currentOperation: `${state.currentOperation.slice(0,-1)}`
      }
      case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperation == null && state.previousOperation == null){
        return state
      }
      if(state.currentOperation == null){
        return{
          ...state,
          operation: action.payload.operation
        }
      }
      if(state.previousOperation == null)  
      return{
          ...state,
          previousOperation: `${state.currentOperation}`,
          operation: action.payload.operation,
          currentOperation: null      
        }
      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentOperation == null ||
          state.previousOperation == null
        ) {
          return state
        }
        return {
          ...state,
          previousOperation:  null,
          operation: null,
          currentOperation: evaluate(state)
        }

  }
}

function evaluate({previousOperation,currentOperation,operation}){
  let result = ''
  let prev = parseFloat(previousOperation)
  let current = parseFloat(currentOperation)
  switch(operation){
    case '+':
      result = prev + current
      console.log(`We are performing this taks here properly ${result}`)
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '÷':
      result = prev / current
      break
  }
  return result.toString();
}


function App() {
  const[{previousOperation, currentOperation, operation} ,dispatch] = useReducer(reducer,{})
  return (
    <div className='calculator'>
      <div className='output'>
        <div className='previous_operation'>{previousOperation}{operation}</div>
        <div className='current_operation'>{currentOperation}</div>
      </div>
      <button className='span_2' onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation='÷' dispatch={dispatch}/>
      <DigitButton digit='1' dispatch={dispatch}/>
      <DigitButton digit='2' dispatch={dispatch}/>
      <DigitButton digit='3' dispatch={dispatch}/>
      <OperationButton operation='*' dispatch={dispatch}/>
      <DigitButton digit='4' dispatch={dispatch}/>
      <DigitButton digit='5' dispatch={dispatch}/>
      <DigitButton digit='6' dispatch={dispatch}/>
      <OperationButton operation='+' dispatch={dispatch}/>
      <DigitButton digit='7' dispatch={dispatch}/>
      <DigitButton digit='8' dispatch={dispatch}/>
      <DigitButton digit='9' dispatch={dispatch}/>
      <OperationButton operation='-' dispatch={dispatch}/>
      <DigitButton digit='.' dispatch={dispatch}/>
      <DigitButton digit='0' dispatch={dispatch}/>
      <button  className='span_2' onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}
export default App;
