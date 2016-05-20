'use strict';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-bootstrap';

// == import environment variables --------------------------------------------

import { configModule } from './config.js';

// == import modules ----------------------------------------------------------

// trick: import your modules here.
import { apiModule } from './services/api/api';

// == dependencies array ------------------------------------------------------

const appDependencies = [
  'ui.router',
  'ui.bootstrap',

  configModule.name,

  // trick: add your own modules dependencies here
  apiModule.name
];

// == main app -------------------------------------------------------

export const app = angular
  .module('app', appDependencies)
  .config([
    '$locationProvider',
    '$urlRouterProvider',
    '$httpProvider',
    (
      $locationProvider,
      $urlRouterProvider,
      $httpProvider
    ) => {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');
      $httpProvider.useApplyAsync(true);
    }
  ])
  .run(() => {
    console.log('Hello world!');
  });
