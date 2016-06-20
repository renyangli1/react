 var xhr = require('../common/xhr.js');
 var basePath = '/customer/manager/order';
 var _request = function(path, opts, type) {
     xhr($.extend(opts || {}, {
         path: basePath + path,
         type: type
     }));
 };
 var StatementStatusConstant = {
     INIT: 0, //盘点中
     WAIT_SEND: 1, //未发送
     WAIT_COMFIRM: 2, //发送待确认
     WAIT_PAY: 3, //已结算待付款
     COMPLETED: 4 //已付款
 };
 var InventoryStatusConstant = {
     NOT_EXIST: -1, //不存在
     INIT: 0, //未发送
     WAIT_COMFIRM: 1, //发送待确认
     WAIT_PAY: 2, //待结算
     COMPLETED: 3 //已结算
 };
 var DeliveryStatusConstant = {
     INIT: 0, //保存未发送
     WAIT_COMFIRM: 1, //等待确认
     WAIT_SHELVE: 2, //等待上架
     COMPLETED: 3, //上架完成
     DELETE: 4 //删除
 };
 var ReturnStatusConstant = {
     INIT: 0, //未发送
     WAIT_COMFIRM: 1, //等待确认
     COMPLETED: 2 //已确认
 };
 module.exports = {
     getUnCompleteDeliveryStatusCode: function() {
         return [ReturnStatusConstant.INIT, ReturnStatusConstant.WAIT_COMFIRM];
     },
     getUnCompleteInventoryStatusCode: function() {
         return [InventoryStatusConstant.NOT_EXIST, InventoryStatusConstant.INIT, InventoryStatusConstant.WAIT_COMFIRM];
     },
     getUnCompleteReturnStatusCode: function() {
         return [ReturnStatusConstant.INIT, ReturnStatusConstant.WAIT_COMFIRM];
     },
     /*
      *获取公司单子状态
      *@Params
      *companyId
      */
     getOrderDataByCompany: function(opts) {
         _request('/statementOrder/h5/findByCompanyId', opts);
     },
     isDeliveryRecordComplete: function(status) {
         var f = false;
         switch (status) {
             case DeliveryStatusConstant.WAIT_PAY:
             case DeliveryStatusConstant.COMPLETED:
                 f = true;
                 break;
             default:
                 break;
         }
         return f;

     },
     isStatementRecordComplete: function(status) {
         var f = false;
         switch (status) {
             case StatementStatusConstant.WAIT_PAY:
             case StatementStatusConstant.COMPLETED:
                 f = true;
                 break;
             default:
                 break;
         }
         return f;
     },
     isInventoryRecordComplete: function(status) {
         var f = false;
         switch (status) {
             case InventoryStatusConstant.WAIT_PAY:
             case InventoryStatusConstant.COMPLETED:
                 f = true;
                 break;
             default:
                 break;
         }
         return f;
     },
     isReturnRecordComplete: function(status) {
         var f = false;
         switch (status) {
             case ReturnStatusConstant.COMPLETED:
                 f = true;
                 break;
             default:
                 break;
         }
         return f;
     }
 };
