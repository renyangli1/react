 var xhr = require('../common/xhr.js');
 var basePath = '/customer/manager/statistic/';
 var _request = function(path, opts, type) {
   xhr($.extend(opts || {}, {
     path: basePath + path,
     type: type
   }));
 };
 module.exports = {
   /*概览总体信息
    *@params
    *companyId
    */
   getAllSaleStatistic: function(opts) {
     _request('salesStatisticByCompanyId', opts);
   },
   /*
    *交易订单情况查询
    *@Params
    * shelfId
    * month
    *@Return
    * orders
    * list:{date,order}
    */
   getTradeOrderMonthly: function(opts) {
     _request('tradeOrderMonthly', opts);
   },
   /*
    *新增的顾客购买订单详情
    *@Params
    * shelfId
    * day
    *@Return
    * tradeId
    * totalFee
    * totalDiscount
    * tradeTitle
    * createTime
    * tradeItems
    * customerInfo
        ShelfCustomerInfo
          customerId
          avatar
          alias
        ShelfTradeItem
          shelfProductId
          tradeNum
          product
            productId
            productName
            netUnit
            price
    */
   getGetFirstRecord: function(opts) {
     _request('getFirstRecord', opts);
   },

   /*
    *顾客增长情况查询
    *@Params
    * shelfId
    * month 
    *@Return
    * numbers
    * list:{date,number}
    */
   getCustomerGrowMonthly: function(opts) {
     _request('customerGrowMonthly', opts);
   },
   /*
    *查询月营业收入
    *@Params
    * shelfId
    * month
    *@Return
    * salesOfAll
    * discountOfAll
    * salesOfMonth
    * dailyOfMonth
    * ShelfSalesMonthly
        MonthIncome
        MonthPreferential
    * ShelfSalesDaily
    day
    sales
    companyDiscount
    */
   getShelfSalesStatistic: function(opts) {
     xhr($.extend(opts || {}, {
       path: '/customer/manager/sales/ShelfSalesStatistic'
     }));
   },
   /*
    *查询日营业收入->新增的顾客购买订单详情
    *shelfId
    *day
    */
   getShelfSalesStatisticDayly: function(opts) {
     xhr($.extend(opts || {}, {
       path: '/customer/manager/sales/ShelfSalesStatisticDayly'
     }));
   }

 };