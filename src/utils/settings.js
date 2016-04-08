const Settings = {
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
            action: 'terms'
        },
        {
            key: '3',
            title: 'Privacy Policy',
            hasNavArrow: true,
            action: 'privacy'
        }
    ]
};

exports.Settings = Settings;