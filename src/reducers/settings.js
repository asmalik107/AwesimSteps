'use strict';

import Package from '../../package.json';


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
            info: Package.version
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