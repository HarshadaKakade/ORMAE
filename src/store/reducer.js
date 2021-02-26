import Actions from './actions';

const defaultState = {
    dataList: [],
    pageId: 1,
    limit: 5
}
export default function AppReducer(state = defaultState, action) {
    switch (action.type) {
        case Actions.FETCH_API_LIST:
            return {
                ...state,
                dataList: [...action.data]
            };
        case Actions.ON_CHANGE_PAGE_ID:
            return {
                ...state,
                pageId: action.data
            };
        case Actions.ON_UPDATE_DATA_LIST:
            return {
                ...state,
                dataList: [...action.data]
            };
        default:
            return {
                ...state
            };
    }
}