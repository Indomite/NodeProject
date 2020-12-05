'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async index1() {
    const { ctx } = this;
    ctx.body = 'hi, index';
  }
}

module.exports = HomeController;
