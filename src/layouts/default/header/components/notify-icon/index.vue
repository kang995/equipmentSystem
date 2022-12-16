<template>
  <div :class="prefixCls" @click="handleJump">
    <Badge
      :count="count"
      :overflowCount="99"
      title="未读消息"
      :offset="[2, 8]"
      :numberStyle="numberStyle"
    >
      <BellOutlined />
    </Badge>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRouter } from 'vue-router';
  // import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    components: { BellOutlined, Badge },
    setup() {
      const { prefixCls } = useDesign('header-notify-number');
      const router = useRouter();
      // const userStore = useUserStore();
      const count = 0;
      // const count = computed(() => {
      //   return userStore.getMessageCount;
      // });
      // 获取未读消息数量
      // userStore.refreshMessageCount();

      function handleJump() {
        router.push({
          name: 'Message',
          params: {
            tabActiveKey: '1',
          },
        });
      }

      return {
        prefixCls,
        count,
        numberStyle: {
          fontSize: '12px',
          transform: 'scale(0.7)',
          padding: 0,
        },
        handleJump,
      };
    },
  });
</script>
