<template>
  <PageWrapper contentFullHeight contentClass="p-4" contentBackground>
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { formSchema } from './data';
  import { menuAddApi, menuDetailApi, menuEditApi } from '/@/api/systemSetting/menuManagement';
  import { saveMenuRootParams } from '/@/api/systemSetting/model';
  const router = useRouter();
  const route = useRoute();
  //id存在为编辑
  const ID = route.query?.id as string;

  const { createMessage } = useMessage();
  const { closeCurrent } = useTabs();
  //form表单
  const [register, { validate, setProps, getFieldsValue, setFieldsValue }] = useForm({
    schemas: formSchema,
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
    submitFunc: customSubmitFunc,
  });
  // 提交
  async function customSubmitFunc() {
    try {
      const data = getFieldsValue() as saveMenuRootParams;
      await validate();
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      if (ID) {
        editFormData(data);
      } else {
        if (data.menuType === 0) {
          data.parentId = 0;
        }
        saveFormData(data);
      }
    } catch (error) {}
  }
  // 新建
  function saveFormData(data) {
    menuAddApi(data)
      .then(() => {
        createMessage.success('提交成功');
        closeCurrent();
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
  // 修改
  function editFormData(data) {
    menuEditApi({
      menuId: ID,
      ...data,
    })
      .then(() => {
        createMessage.success('修改成功');
        closeCurrent();
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
  // 回显
  ID &&
    menuDetailApi(ID).then((res) => {
      setFieldsValue(res);
    });
</script>
