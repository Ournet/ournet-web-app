var OneSignal = window.OneSignal = window.OneSignal || [];
var $ = require('cash-dom');
var ga = require('../base/ga').ga;

function init() {
    var placeId = $('.c-subscribe-bar').data('place-id');
    var admin1Code = $('.c-subscribe-bar').data('admin1-code');
    if (!placeId || !admin1Code) {
        console.log('no data')
        return;
    }

    var category = 'notifications-weather';


    OneSignal.push(function () {

        function initNotifications(permission) {
            var currentTags;

            function subscribedToCurrentPlace() {
                return currentTags && currentTags['place-id'] == placeId;
            }

            function setPlaceId() {
                OneSignal.sendTags({ 'place-id': placeId, 'admin1-code': admin1Code });
            }

            function subscribeToNotifications() {
                OneSignal.registerForPushNotifications();
                //ga('send', 'event', category, 'show-register-native');
            }

            function hideSubscribe() {
                $('.c-subscribe-bar').addClass('u-hidden');
            }
            function showSubscribe() {
                $('.c-subscribe-bar').removeClass('u-hidden');
            }

            if (permission === 'granted') {
                OneSignal.getTags(function (tags) {
                    currentTags = tags;
                    if (!subscribedToCurrentPlace()) {
                        showSubscribe();
                    } else {
                        if (!currentTags['admin1-code']) {
                            OneSignal.sendTag('admin1-code', admin1Code);
                        }
                    }
                });
            } else {
                showSubscribe();
            }

            $('.c-subscribe-bar').click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                ga('send', 'event', category, 'click-subscribe-btn');
                if (permission === 'granted') {
                    setPlaceId();
                    ga('send', 'event', category, 'changed-place-id', placeId);
                    hideSubscribe();
                } else {
                    subscribeToNotifications();
                }
            });


            OneSignal.on('notificationPermissionChange', function (permissionChange) {
                var currentPermission = permissionChange.to;
                if (currentPermission === 'granted') {
                    setPlaceId();
                }
                ga('send', 'event', category, currentPermission);
            });
            // Occurs when the user's subscription changes to a new value.
            OneSignal.on('subscriptionChange', function (isSubscribed) {
                if (isSubscribed) {
                    hideSubscribe();
                    setPlaceId();
                } else {
                    showSubscribe();
                }
            });

        }

        OneSignal.push(["isPushNotificationsSupported", function (supported) {
            console.log('supported', supported);
            if (supported) {
                console.log('suppoted')
                OneSignal.push(["getNotificationPermission", function (permission) {
                    initNotifications(permission);
                }]);
            } else {
                console.log('hotsupported')
                hideSubscribe();
            }
        }]);
    });
}

init();