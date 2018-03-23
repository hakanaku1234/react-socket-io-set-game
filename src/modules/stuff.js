/* ACTION TYPES */
export const FETCH_STUFF = 'FETCH_STUFF';
export const RECEIVE_STUFF = 'RECEIVE_STUFF';

/* REDUCER */
const initialState = [];

export default function stuff(state = initialState, action) {
  let newState;
  switch (action.type) {
    case FETCH_STUFF:
      return action;
    case RECEIVE_STUFF:
      newState = action.stuff;
      return newState;
    default:
      return state;
  }
}


/* ACTION CREATORS */
function receiveStuff(data) {
    return {type: RECEIVE_STUFF, stuff: data};
}

export function fetchStuff() {
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>
                response.json().then(data => ({
                    data: data,
                    status: response.status
                }))
            )
            .then(response => {
                if(response.status === 200){
                    dispatch(receiveStuff(response.data))
                }else{
                    var flash = {
                        type: 'error',
                        title: 'Error getting task list',
                        content: 'There was an error getting the task list. Please try again.'
                    }
                    dispatch({type: "DISPLAY_FLASH", data: flash})
                }
            });
    };
}
