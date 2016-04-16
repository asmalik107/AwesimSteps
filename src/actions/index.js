'use strict';


import * as authorize from './auth';
import * as steps from './selectedSteps';
import * as weekly from './weeklySteps';


module.exports = {
    ...authorize,
    ...steps,
    ...weekly
};

