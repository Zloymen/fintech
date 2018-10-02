(() => {

    angular.module('app').controller('CaptchaController', CaptchaController);

    CaptchaController.$inject = [ '$state', '$rootScope', '$stateParams'];

    function CaptchaController($state, $rootScope, $stateParams) {

        let captchaCtrl = this;

        captchaCtrl.captchaUrlSrc = '/api/v1/captcha.gif';
        captchaCtrl.captchaUrl = captchaCtrl.captchaUrlSrc;
        captchaCtrl.updateCaptcha = updateCaptcha;

        function updateCaptcha() {
            captchaCtrl.captchaUrl = captchaCtrl.captchaUrlSrc + "?" + new Date().getTime();
        }

    }

})();
