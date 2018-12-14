<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- 相当于 new Framework7，可以通过this.$f7拿到实例 -->
    <f7-statusbar></f7-statusbar>
    <!-- <f7-panel left cover>
      <f7-view url="/panel-left/" links-view=".view-main"/>
    </f7-panel>-->
    <f7-view url="/home/" :main="true" class="ios-edges">
      <!-- 退出时，要判断是否为main-view -->
      <!-- 当前view是MainActivity，其他的page相当于fragment-->
      <f7-button
        :bottom="true"
        style="z-index:999;background-color:red"
        @click="routerList"
      >View级别的按钮</f7-button>
    </f7-view>
  </f7-app>
</template>

<script>
// Import Routes...
import routes from "./routes.js";
import monitorBackButton from "assets/js/monitorBackButton.js";

let theme = "auto";
if (document.location.search.indexOf("theme=") >= 0) {
  theme = document.location.search.split("theme=")[1].split("&")[0];
}

export default {
  data() {
    return {
      //使用方法：http://framework7.io/docs/app.html
      f7params: {
        /* 用作Framework7根元素 */
        theme,
        routes,
        id: "io.framework7.testapp",
        data: function() {
          // this指向应用Framework7实例
          return {
            dealByDialog: true, //是否由dialog处理
            isPageTop: true //page是否处于top(弹窗)
          };
        },
        methods: {
          showConfirmDialog: function(msg, func, dealByDialog) {
            // 每个方法内部，this都指向应用Framework7实例
            this.data.dealByDialog = dealByDialog;
            this.dialog.confirm(msg, func);
          }
        },
        on: {
          init: function() {
            console.log("f7 on App initialized");
          },
          pageInit: function(e,page) {
            console.log("f7 on initialized");
          },
          pageBeforeIn: function(e) {
            console.log("f7 on pageBeforein");
          },
          dialogOpen: function() {
            console.log("f7 on dialogOpen");
            this.data.isPageTop = false;
          },
          dialogClose: function() {
            console.log("f7 on dialogClose");
            this.data.isPageTop = true;
          }
        },
        click: {
          //外部链接标签需要添加 class="external"
          externalLinks: ".external"
        },
        touch: {
          //   tapHold: true
        },
        view: {
          //具体可配置参数：http://framework7.io/docs/view.html#view-parameters
        },
        dialog: {
          // on: {
          //   opened: function() {
          //     console.log("Dialog opened");
          //     this.app.views.current.$storage.commit('showMsg',"胡海潮 opened");
          //   },
          //   closed: function() {
          //     console.log("Dialog closed");
          //     this.app.views.current.$storage.commit('showMsg',"胡海潮 closed");
          //   }
          // }
        }
      }
    };
  },
  methods: {
    routerList() {
      // methods使用
      this.$f7.methods.showMsg();
      // console.log(this.$f7.views.current.el.lastChild.dataset.myThis._data);//page级别

      // console.log(this.$f7.views.main);
      // if(this.$f7.views.current.main){
      //   console.log("是主视图");
      // }
      // 发出事件(1)
      //   this.$f7.emit("myCustomEvent", "Hu", "Hai", "Chao");
    },
    getView() {
      var mainView = this.$f7.views.main;
      var homeView = this.$f7.views.home; /* view 设置 data-name="home" */
      mainView.app.methods.showMsg();
    }
  },
  mounted() {
    console.log(this.$f7);
    this.$f7ready(f7 => {
      //this : VueComponet实例
      var url = ['/home/','/about/']
      monitorBackButton.addBackButtonListener(this,url);

      //   var app = this.$f7;
      var app = f7;
      app.on("pageInit", function(page) {
        //只要是page初始化都会触发
        console.log("page初始化");
      });

      app.on("click", function() {
        //只要是点击事件都会触发
        console.log("触发点击事件");
      });

      //自定义事件处理
      app.on("myCustomEvent", function(a, b, c) {
        app.dialog.alert(a + " " + b + " " + " " + c);
      });
    });
  }
};
</script>