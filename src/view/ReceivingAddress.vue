<template>
  <div class="page">
    <xheader is-left="true" title="收货地址"></xheader>
    <div class="contents">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
      />

      <div style="text-align: center;">
        <van-button type="primary" @click="removeAdd">删除选中的地址</van-button>
      </div>
    </div>
  </div>
</template>

<script>

  import xheader from "../components/xheader"
  import {Toast} from "vant"

  export default {
    name: "ReceivingAddress",
    components: {xheader},
    data() {
      return {
        chosenAddressId: '',
        list: []
      }
    },
    methods: {
      onAdd() {
        // Toast('新增收货地址');
        this.$router.push({name: 'address'})
      },
      onEdit(item, index) {
        // Toast('编辑收货地址:' + index);
        // Toast('编辑收货地址:' + item);
      },
      findAddFun() {
        let $self = this
        this.$store.dispatch("findAddress")
          .then(response => {
            // console.log(response)
            if (response.success) {
              $self.list = [];

              response.result.forEach(function (res, index) {
                $self.list.push(
                  {
                    id: res.id,
                    name: res.userName,
                    tel: res.mobilePhoneNo,
                    address: res.region + "  " + res.address
                  }
                )
              })

            } else {
              Toast("失败：" + response.result)
            }


          })
          .catch(error => {
            Toast(error)
          })
      },
      removeAdd() {
        // console.log(this.chosenAddressId)

        let $self = this
        $self.$store.dispatch("removeAddress", {addrId: this.chosenAddressId})
          .then(response => {
            if (response.success) {
              // Toast()
              $self.findAddFun()
            } else {
              Toast("删除失败！" + response.result)
            }
          })
      },
    },
    created() {
      this.findAddFun()
    }
  }
</script>

<style scoped lang="scss">
  .X_footer {
    background: #fff;
    color: #ef2929;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
</style>
