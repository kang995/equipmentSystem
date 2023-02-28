<template>
  <PageWrapper contentBackground contentClass="p-4">
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
  import {
    getUserGroupAddApi,
    getUserGroupDetailApi,
    putUserGroupModifyApi,
  } from '/@/api/systemSetting/userGroupManagement';
  import { ref } from 'vue';
  const router = useRouter();
  const route = useRoute();
  const id = route.query.id as string;
  console.log('id: ', id);

  const [register, { setProps, validateFields, setFieldsValue }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },

    schemas: schemas,
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
    resetFunc: customResetFunc,
    submitFunc: customSubmitFunc,
  });
  async function customResetFunc() {
    await router.push({
      name: 'UserGroup',
    });
  }
  const version = ref();
  id &&
    getUserGroupDetailApi(id).then((data) => {
      console.log(1);
      setFieldsValue(data);
      version.value = data.version;
    });

  const { createMessage } = useMessage();

  async function customSubmitFunc() {
    const res = await validateFields();
    await setProps({
      submitButtonOptions: {
        loading: true,
      },
    });
    if (id) {
      res['id'] = id;
      res['version'] = version.value;
      getSubmit(putUserGroupModifyApi, res, '修改成功');
    } else {
      getSubmit(getUserGroupAddApi, res, '新增成功');
    }
  }

  function getSubmit(api, data, test) {
    api(data)
      .then(() => {
        router.push({
          name: 'UserGroup',
        });
        createMessage.success(test);
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
<style lang="less" scoped></style>
