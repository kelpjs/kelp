'use strict';
module.exports = function Kelp(config){
  /**
   * [app description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  function app(req, res){
    var self = this, i = -1;
    (function next(){
      var middleware = app.stack[ ++i ];
      if(middleware){
        middleware(req, res, next);
      }
    })();
  };
  /**
   * [stack description]
   * @type {Array}
   */
  app.stack  = [];
  app.config = Object.create(config || {});
  /**
   * [function description]
   * @param  {[type]} middlewares [description]
   * @return {[type]}             [description]
   */
  app.use = function(middlewares){
    this.stack = this.stack.push.apply(this.stack, arguments);
    return app;
  };
  return app;
};
