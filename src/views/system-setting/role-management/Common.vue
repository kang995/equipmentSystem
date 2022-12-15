<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicForm } from '/@/components/Form';
  import { useForm } from '/@/components/Form';
  import { schemas } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter, useRoute } from 'vue-router';
  import { addRoleApi, detailRoleApi, editRoleApi } from '/@/api/sys/systemSetting/roleManagement';
  const { createMessage } = useMessage();

  const router = useRouter();
  const route = useRoute();
  const roleId = route.query.id as string;

  const [register, { validateFields, setFieldsValue, setProps }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },

    schemas: schemas,
    actionColOptions: {
      offset: 8,
      span: 14,
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '取消',
    },
    resetFunc: customResetFunc,
    submitFunc: customSubmitFunc,
  });
  // 回显
  roleId &&
    detailRoleApi(roleId).then((res) => {
      setFieldsValue(res);
    });
  async function customResetFunc() {
    router.go(-1);
  }
  async function customSubmitFunc() {
    const res = await validateFields();
    await setProps({
      submitButtonOptions: {
        loading: true,
      },
    });
    if (route.query.id) {
      Object.assign(res, { roleId: route.query.id });
      editRoleApi(res)
        .then(() => {
          createMessage.success('修改成功！');
          router.go(-1);
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
    } else {
      addRoleApi(res)
        .then(() => {
          createMessage.success('添加成功！');
          router.go(-1);
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
  }
</script>
