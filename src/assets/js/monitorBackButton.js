/**
 * 物理返回键监听
 * vue : vueComponent实例
 * mainRouter : 主路由(app退出页[数组])
 * func : 自定义处理事件
 * 让 路由 处理
 */
export default {
    addBackButtonListener: function(vue, mainRouter, func) {
        document.addEventListener("deviceready", function() {
            var lastTime = 0; //上次点击事件
            document.addEventListener("backbutton", function() {
                var now = new Date(); //当前点击事件
                if (vue.$f7.views.length === 1) { //单页面 
                    var currentView = vue.$f7.views.current;
                    if (currentView.main) {
                        if (currentView.router.history.length === 1) {
                            if (!exitApp(vue, lastTime, now)) {
                                lastTime = now;
                            }
                        } else {
                            var isMainRouterUrl = false;
                            if (mainRouter) {
                                for (var i = 0; i < mainRouter.length; i++) {
                                    if (currentView.router.url === mainRouter[i]) {
                                        if (!isPageTop(vue)) {
                                            if (!isDealByDialog(vue)) {
                                                vue.$f7.dialog.close();
                                                isMainRouterUrl = true;
                                                break;
                                            }
                                        } else {
                                            if (!exitApp(vue, lastTime, now)) {
                                                lastTime = now;
                                            }
                                            isMainRouterUrl = true;
                                            break;
                                        }
                                    }
                                }
                            }

                            if (!isMainRouterUrl) {
                                if (func) {
                                    func();
                                } else {
                                    if (!isPageTop(vue)) {
                                        if (!isDealByDialog(vue)) {
                                            vue.$f7.dialog.close();
                                        }
                                    } else {
                                        currentView.router.back();
                                    }
                                }
                            }
                        }
                    }
                } else {
                    //多页面
                }
            }, false);
        }, false);

        const isPageTop = (vue) => {
            return vue.$f7.data.isPageTop;
        }

        const isDealByDialog = (vue) => {
            return vue.$f7.data.dealByDialog;
        }

        const exitApp = (vue, lastTime, now) => {
            if (now - lastTime < 2000) {
                navigator.app.exitApp(); //程序退出
                // navigator.device.exitApp(); //程序退出
            } else {
                vue.$f7.toast.create({
                    text: '再点击一次退出',
                    position: 'center',
                    closeTimeout: 2000,
                }).open();
                return false;
            }
        }
    }
};