import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { config } from './config';

export function initializeDemoStore(state) {
  const allReducers = combineReducers(state);
  return createStore(allReducers, applyMiddleware(thunk, logger));
}

const actionTypeTemplate = (serviceName, actionType) => `${serviceName}${config.separator}${actionType}`;
const reducer = (allTypes, [serviceName, service]) => {
  const typeKeys = Object.keys(service.types);
  return allTypes.concat(typeKeys.map(type => actionTypeTemplate(serviceName, type)));
};
export const allTypesForServices = services => Object.entries(services).reduce(reducer, []);