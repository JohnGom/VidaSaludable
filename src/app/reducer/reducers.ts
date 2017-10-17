export const INFO_INTERPRETATION = 'info_interpretation';
export const INCREMENT_PUNTAJE = 'increment_puntaje';

export function peopleReducer (state = 0, action) {
    switch (action.type) {
        case INFO_INTERPRETATION:
            return action.payload;
        default:
            return state;
    }
};

export function puntajeReducer (state = 0, action) {
    switch (action.type) {
        case INCREMENT_PUNTAJE:
            return state + action.payload;
        default:
            return state;
    }
};

export const mainReducer: {} = { people: peopleReducer, puntaje: puntajeReducer };