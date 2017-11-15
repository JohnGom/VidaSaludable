export const INFO_INTERPRETATION = 'info_interpretation';
export const INCREMENT_PUNTAJE = 'increment_puntaje';
export const ESTADO_BIOQUIMICA = 'estado_bioquimica';
export const INTER_FISIOLOGICA = 'inter_fisiologica';

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

export function stateBio (state = 0, action) {
    switch (action.type) {
        case ESTADO_BIOQUIMICA:
            return action.payload;
        default:
            return state;
    }
};

export function infoFisiologica (state = 0, action) {
    switch (action.type) {
        case INTER_FISIOLOGICA:
            return action.payload;
        default:
            return state;
    }
};

export const mainReducer: {} = { people: peopleReducer, puntaje: puntajeReducer, bio: stateBio, fisio: infoFisiologica };