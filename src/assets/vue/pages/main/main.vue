<template>
  <!-- <f7-page> -->
  <div class="login-screen">
    <!-- <f7-view> -->
    <div class="page" data-name="hhc">
      <f7-button @click="back1">按钮</f7-button>
      <f7-button @click="back2">按钮</f7-button>
      <f7-button @click="back3">f7级的dialog</f7-button>
    </div>
    <!-- </f7-view> -->
  </div>
  <!-- </f7-page> -->
</template>

<script>
var dialog;
export default {
  props: {},
  data() {
    return {
      msg: "132456"
    };
  },
  created() {},
  mounted() {
    if (this.$f7.views.current.main) {
      console.log("是主视图");
    }
  },
  watch: {},
  computed: {},
  methods: {
    back1() {
      // this.$f7router.back();
      // if (this.$f7.views.current.main) {
      //   console.log("是主视图");
      //   console.log(this);
      // }
      dialog = this.$f7.dialog.create({
        title: "测试",
        text: "HuHaiChao",
        buttonOk: "确认",
        buttons: [
          {
            text: "Button 1"
          },
          {
            text: "Button 2"
          },
          {
            text: "Button 3"
          }
        ],
        onClick: function(dialog, index) {
          // console.log(dialog.opened);
          console.log(dialog.app.views.current);
        }
        // on:{
        //   opened:function(){
        //     console.log('Dialog opened')
        //   },
        //   closed:function(){
        //     console.log('Dialog closed')

        //   }
        // }
      });

      dialog.open();
    },
    back2() {
      // console.log(this.$$('.page[data-name="hhc"]')[0].f7Page);
      //   if(dialog)
      //   console.log(dialog.opened);
      // this.$store.commit("showMsg", "胡海潮 opened");
      console.log(this);
    },
    back3(){
      this.$f7.methods.showConfirmDialog("调用f7的showConfirmDialog()方法",() => {
        this.$f7.router.navigate('/form/');
      },false);
    }
  },
  components: {}
};
</script>
<style lang="scss" type="text/css" scoped>
</style>