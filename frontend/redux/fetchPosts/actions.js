import * as types from './types';
import config from '../../config';

export const fetchPostsBegin = () => ({
    type: types.FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = response => ({
    type: types.FETCH_POSTS_SUCCESS,
    payload: { response },
    hasMore: response.data.length > 0
});

export const fetchPostsFailure = error => ({
    type: types.FETCH_POSTS_FAILURE,
    payload: { error }
});

export function fetchPosts() {
    console.log("IN FETCH POSTS ACTION");
    return (dispatch, getState) => {
        console.log(getState().fetchPosts.minID);
        const jsonBody = {
            maxID: getState().fetchPosts.minID
        };
        dispatch(fetchPostsBegin());
        return fetch(config.apiURL+'/api/v1/posts/get', {
            method: 'post',
            body: JSON.stringify(jsonBody)
        })
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            console.log(json);
            dispatch(fetchPostsSuccess(json));
            return json;
          })
          .catch(error => dispatch(fetchPostsFailure(error)));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
