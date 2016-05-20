/*
** usage: git@github.com:mangiavellano/angularjs-template.git
*/

'use strict';

import angular from 'angular';

import { configModule } from '../../config.js';

const apiModule = angular
  .module('apiModule', [
    configModule.name
  ])
  .factory('API', [
    '$http',
    'CONFIG',
    ($http, CONFIG) => {
      const API_URL = `${CONFIG.API_URL}/${CONFIG.API_VERSION}`;

      const makeRequest = (verb) => {
        return (path, params) => {
          return new Promise((resolve, reject) => {
            if (verb === 'get' && params) {
              params = { params: params };
            }

            $http[verb](API_URL + path, params)
              .then(
                (res) => resolve(res),
                (res) => reject(res)
              );
          });
        };
      };

      return {
        get:    makeRequest('get'),
        post:   makeRequest('post'),
        put:    makeRequest('put'),
        patch:  makeRequest('patch'),
        delete: makeRequest('delete')
      };
    }
  ]);

export { apiModule };
