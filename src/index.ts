#!/usr/bin/env node

import { TaskTrackerCLI } from './presentation';
import { InitDB } from './infraestructure/db/JSON';
import { LogError } from './infraestructure/errors';
import { NotFoundError } from './domain/exceptions/notFoundError/notFoundError';
import {
  ConflitError,
  IsEmptyError,
  IsNotValidTypeError,
} from './domain/exceptions';

class Main {
  public static async init() {
    try {
      const init = new InitDB();
      await init.init();
      await new TaskTrackerCLI(init.pathDB).gettingStarted();
    } catch (error) {
      if (error instanceof NotFoundError) {
        new LogError(error.name, error.message, error.isOperational);
      } else if (error instanceof IsNotValidTypeError) {
        new LogError(error.name, error.message, error.isOperational);
      } else if (error instanceof IsEmptyError) {
        new LogError(error.name, error.message, error.isOperational);
      } else if (error instanceof ConflitError) {
        new LogError(error.name, error.message, error.isOperational);
      }
    }
  }
}

Main.init();
