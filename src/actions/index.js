'use strict';


import * as authorize from './auth';
import * as weekly from './weeklySteps';


module.exports = {
    ...authorize,
    ...weekly
};

