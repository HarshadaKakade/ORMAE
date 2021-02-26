import Actions from './actions';

export function fetchApiList(data) {
    return {
        type: Actions.FETCH_API_LIST,
        data
    }
}

export function onChangePageId(data) {
    return {
        type: Actions.ON_CHANGE_PAGE_ID,
        data
    }
}

export function onUpdateDataList(data) {
    return {
        type: Actions.ON_UPDATE_DATA_LIST,
        data
    }
}