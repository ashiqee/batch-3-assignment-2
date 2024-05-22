'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrdersServices = void 0;
const orders_model_1 = require('./orders.model');
const createNewOrderInDB = order =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.OrdersModel.create(order);
    return result;
  });
const getAllOrdersFromDB = email =>
  __awaiter(void 0, void 0, void 0, function* () {
    const query = email ? { email: email } : {};
    const result = yield orders_model_1.OrdersModel.find(query);
    return result;
  });
exports.OrdersServices = {
  createNewOrderInDB,
  getAllOrdersFromDB,
};
