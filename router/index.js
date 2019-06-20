'use strict';

module.exports = function(app) {
  app.use('/status-design-applicant', require('./routes/candidate_stage_change'));
  app.use('/candidate_stage_change', require('./routes/candidate_stage_change'));  
  app.use('/new_candidate_application', require('./routes/new_candidate_application'));  
  app.use('/application_updated', require('./routes/application_updated'));  
};
