<template>
  <div :class="`${prefixCls}`">
    <div :class="`${prefixCls}-user`"> {{ userNameFirst }} </div>
    <div :class="`${prefixCls}-user-name`">你好，{{ userName }} </div>
    <div :class="`${prefixCls}-department`">
      {{ deptName }}
      <div :class="`${prefixCls}-cell-phone-dian`" v-if="deptName && phoneNumber"></div>

      <div :class="`${prefixCls}-cell-phone`">{{ phoneNumber }} </div>
    </div>
    <div :class="`${prefixCls}-time-box`">
      <span>
        <SvgIcon name="gonggong_shijian" size="20" :class="`${prefixCls}-icon`" />
        最后一次登录时间</span
      >
      <span :class="`${prefixCls}-time`">{{ loginDate }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  // import { useUserStore } from '/@/store/modules/user';
  // const userStore = useUserStore();
  const { prefixCls } = useDesign('workbench-wrapper');
  // const UserInfo = userStore.getUserInfo as any;
  // const userName = ref(UserInfo.realName);
  // const deptName = ref(UserInfo.user.dept.deptName);
  // const userNameFirst = ref(UserInfo.realName.slice(0, 1));
  // const phoneNumber = ref(UserInfo.user.phonenumber);
  // const loginDate = ref(UserInfo.user.loginDate);
  const userName = ref('章三');
  const deptName = ref('部门');
  const userNameFirst = ref('章');
  const phoneNumber = ref('1234567');
  const loginDate = ref('2022-12-15');
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{name-space}-workbench-wrapper';
  .@{prefix-cls} {
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: url(/@/assets/images/bg_userinfo@2x.png) no-repeat;
    background-size: 100% 100%;
    padding: 24px;

    &-user {
      width: 80px;
      height: 80px;
      background: linear-gradient(180deg, #84b0ff 0%, #4d79ff 100%);
      box-shadow: 0 8px 24px 0 rgba(28, 28, 32, 0.12), 0 1px 1px 0 rgba(28, 28, 32, 0.05);
      border: 2px solid #fff;
      border-radius: 50px;
      text-align: center;
      margin: 0 auto;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    &-user-name {
      margin-top: 16px;
      font-size: 20px;
      font-weight: 600;
    }

    &-department {
      font-size: 14px;
      font-weight: 400;
      margin: 8px 0 24px 0;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    &-cell-phone-dian {
      width: 4px;
      height: 4px;
      background: #fff;
      margin: 0 8px;
      border-radius: 50px;
    }

    &-icon {
      top: 3px;
      position: relative;
    }

    &-time-box {
      display: flex;
      align-items: center;
    }

    &-time- {
      font-size: 14px;
      font-weight: 600;
    }

    &-time {
      font-size: 14px;
      font-weight: 400;
      margin-left: 50px;
    }
  }
</style>
