<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { useForm, BasicForm } from '/@/components/Form/index';
  import { useRouter } from 'vue-router';
  import { AddUserAddApi } from '/@/api/sys/systemSetting/userManagement';
  import { message } from 'ant-design-vue';
  import { schemasForm } from './data';
  const router = useRouter();

  const [register, { validateFields, setProps }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    actionColOptions: {
      offset: 8,
      span: 10,
      style: {
        textAlign: 'left',
      },
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    schemas: schemasForm,
    submitFunc: submitFunc,
    resetFunc: customResetFunc,
  });
  //返回按钮
  async function customResetFunc() {
    router.push({
      name: 'UserManagement',
    });
  }

  //自定义保存按钮
  async function submitFunc() {
    const res = await validateFields();
    await setProps({
      submitButtonOptions: {
        loading: true,
      },
    });
    //新增
    facilityAdd(res);
  }
  //新增方法
  function facilityAdd(data: any) {
    AddUserAddApi(data.nickName)
      .then(() => {
        router.push({
          name: 'User',
        });
        message.success('新增成功');
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
      })
      .finally(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
      });
  }
</script>
