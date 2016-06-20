 var xhr = require('../common/xhr.js');
 var basePath = 'customer/shelf/';
 var _request = function(path, opts, type) {
     xhr($.extend(opts || {}, {
         path: basePath + path,
         type: type
     }));
 };
 module.exports = {
     /*
      *获取公司货架
      *companyId
      */
     getCompanyShelf: function(opts) {
         _request('findAll', opts);
     }
 };
