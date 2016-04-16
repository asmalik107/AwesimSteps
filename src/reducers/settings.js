'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    goals: [
        {
            key: '1',
            title: 'Daily Goal',
            info: 10000,
            hasNavArrow: true,
            action: 'goal'
        }
    ],
    app: [
        {
            key: '1',
            title: 'App Version',
            info: '1.0.0'
        },
        {
            key: '2',
            title: 'Terms and Conditions',
            hasNavArrow: true,
            action: 'terms',
            params: {source: 'terms'}
        },
        {
            key: '3',
            title: 'Privacy Policy',
            hasNavArrow: true,
            action: 'privacy',
            params: {source: 'privacy'}
        }
    ]
};

export default function settings(state=initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}