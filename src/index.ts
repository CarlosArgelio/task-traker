#!/usr/bin/env node

import { TaskTrackerCLI } from './presentation';
import { InitDB } from './infraestructure/db/JSON';
import { LogError } from './infraestructure/errors';

class Main {
  public static async init() {
    try {
      const init = new InitDB();
      await init.init();
      console.log('🚀 ~ pathDB:', init.pathDB);
      new TaskTrackerCLI(init.pathDB);
    } catch (error) {
      // @ts-ignore
      new LogError(error.name, error.message, error.isOperational);
    }
  }
}

Main.init();
