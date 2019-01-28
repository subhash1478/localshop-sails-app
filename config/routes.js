module.exports.routes = {
  '/': {
    view: 'pages/homepage'
  },
  'POST /api/login': 'AdminController.login',
  'POST /api/add-product-category': 'ProductCategoryController.addCategory',
  'GET /api/get-product-category': 'ProductCategoryController.getCategory',
  'POST /api/add-product': 'ProductController.addProduct',
  'GET /api/get-product': 'ProductController.getProduct',
  'POST /api/add-to-cart': 'OrderItemController.addToCart',
  'GET /api/get-cart': 'OrderItemController.getCart',
  'POST /api/payment-link': 'OrderController.payment',
  'POST /api/remove-cart-item': 'OrderItemController.removeCartItem',
  'GET /api/get-shipping-address': 'ShippingController.getShippingAddress',
  'POST /api/add-shipping-address': 'ShippingController.addShippingAddress',
  'POST /api/shipping-phone-otp': 'ShippingController.shippingPhoneOtp',
  'POST /api/check-phone-otp': 'ShippingController.shippingPhoneCheckOtp',
  'POST /api/create-order': 'OrderController.createOrder',
  'GET /api/get-order': 'OrderController.getOrder',
  'GET /api/get-order-list': 'OrderController.getOrderList',
  'POST /api/assign-driver': 'OrderController.assignDriverToOrder',
  'POST /api/task': 'DriverController.Task',
  //
  // ──────────────────────────────────────────────────── I ──────────
  //   :::::: D R I V E R : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  //
  'POST /api/add-driver': 'DriverController.addDriver',
  'GET /api/get-driver': 'DriverController.getDriver',
  'GET /api/get-driver-order': 'DriverController.getDriverOrder',
  'GET /api/get-driver-order-list': 'DriverController.getDriverOrderList',
  'GET /api/get-new-order': 'OrderController.getnewOrder',
  'POST /api/driver-login': 'DriverController.driverLogin',
  'GET /api/get-user-product': 'ProductController.getUserProduct',
  'GET /api/get-shop-order': 'ProductCategoryController.getShopOrder',
  'GET /api/get-user-shop': 'PostController.getUserShop',
  //
  // ────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: P U S H   N O T I F I C A T I O N : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────
  //
  'POST /api/send-push': 'PushNotificationController.createPush',
  'POST /api/add-devices': 'DevicesinfoController.addDevicesDetails',
  'GET /api/get-devices': 'DevicesinfoController.Devicesinfo',
  'GET /api/get-user-devices': 'DevicesinfoController.DevicesinfoByUserId',
  'GET /api/get-notification': 'PushNotificationController.getPushNotification',
  'POST /api/mark-read-notification': 'PushNotificationController.markReadNotification',
  //
  // ────────────────────────────────────────────────────────────────────────────────────────── I ──────────
  //   :::::: U S E R   P R O F I L E   I M A G E   U P L O A D : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────────────────
  //
  'POST /api/upload-profile-image': 'UsersController.uploadProfileImage',
  'POST /api/reject-task': 'OrderController.rejectTask',
  'GET /api/get-promoter-location': 'PromotelocationController.getPromotelocation',
  'POST /api/add-promoter-location': 'PromotelocationController.addlocation',
  'POST /api/update-promoter-subcategory': 'PromotelocationController.addsublocation',
  'GET /api/get-promoter': 'PromoterController.getPromoter',
  'POST /api/add-promoter-image': 'PromoterimagesController.uploadPromoterImage',
  'GET /api/get-promoter-image': 'PromoterimagesController.getPromoterImage',
  'POST /api/add-banner-image': 'BannerController.addBanner',
  'POST /api/delete-banner-image': 'BannerController.deleteBanner',
  'GET /api/get-banner': 'BannerController.getBanner',
  'POST /api/link-banner': 'BannerController.linkbanner',
  'GET /api/get-user-review': 'ReviewController.getReview',
  'POST /api/update-review': 'ReviewController.updateReview',
  'POST /api/delete-promoter-image': 'PromoterimagesController.deletePromoterImage',
  'GET /api/shop-product': 'ProductController.getResturantProduct',
  'POST /api/upload-product-image': 'ProductController.uploadProductImage',
  'POST /api/replace-cart': 'OrderItemController.replaceCart',
  'POST /api/vendor-join-request': 'UsersController.vendorJoin',
  'GET /api/get-location': 'LocationController.getLocation',
  'POST /api/add-location': 'LocationController.addLocation',
  // ssh root@139.59.12.86
  // password: A3CEKC74L7KCRN7I

  //
  // ──────────────────────────────────────── I ──────────
  //   :::::: : :  :   : DASHBOARD    :     :        :          :
  // ──────────────────────────────────────────────────
  //
  'GET /api/dashboard': 'DashboardController.getAllCountFrom',

  
};
