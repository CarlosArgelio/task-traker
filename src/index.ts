#!/usr/bin/env node

import { TaskTrackerCLI } from './infraestructure/drivind-adapters';
import { InitDB } from './infraestructure/db/JSON';

(async () => {
  const init = new InitDB();
  await init.init();
  console.log('🚀 ~ pathDB:', init.pathDB);

  new TaskTrackerCLI(init.pathDB);
})();
