<template>
  <!-- 
     v-bind="$attrs":用于将弹窗组件的 attribute 传入 BasicModal 组件
     title:modal标题
     canFullscreen:是否全屏
     showCancelBtn:是否显示关闭按钮
     showOkBtn:是否显示确认按钮
     centered:是否居中
     closable:是否显示右上角的关闭按钮
     footer:是否显示页脚
     header:是否显示页眉
     maskClosable:点击蒙层是否关闭   
     keyboard:是否esc关闭
     destroyOnClose:关闭时销毁 Modal 里的子元素  
 -->
  <BasicModal
    v-bind="$attrs"
    width="50%"
    :title="modalTitle"
    :canFullscreen="false"
    :showCancelBtn="false"
    :showOkBtn="false"
    :centered="false"
    :closable="true"
    :footer="null"
    :header="null"
    :maskClosable="false"
    :keyboard="false"
    @register="registerModal"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { dictionaryTypeFormSchemas } from './data';
  import {
    addManagementDictionary,
    updateManagementDictionary,
  } from '/@/api/systemSetting/dictionaryType';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const emits = defineEmits(['reload', 'register']);
  //分类类型
  interface sortParamsInterface {
    id: string;
    params: any;
  }
  const modalTitle = ref('新增父级');
  let sortParams = {} as sortParamsInterface;

  //form配置
  const [registerForm, { setFieldsValue, validate, setProps, updateSchema, resetFields }] = useForm(
    {
      schemas: dictionaryTypeFormSchemas,
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 10,
      },
      actionColOptions: {
        offset: 8,
        span: 15,
        style: {
          textAlign: 'left',
        },
      },
      submitButtonOptions: {
        text: '提交',
      },
      submitFunc: submitFunc,
    },
  );
  //modal回调
  const [registerModal, { closeModal }] = useModalInner((data) => {
    resetFields();
    const { id, params } = data;
    sortParams = { id, params };
    if (id === 'addChildren') {
      modalTitle.value = '新增下级';
      setUpdateForm('type', false);
      setUpdateForm('itemValue', true);
      setFieldsValue({ parentName: params.itemName, type: params.type });
    } else if (id === 'editChildren') {
      if (params.parentId === '0') {
        modalTitle.value = '编辑父级';
        setUpdateForm('type', true);
        setUpdateForm('itemValue', false);
        setFieldsValue({ ...params });
      } else {
        modalTitle.value = '编辑下级';
        setUpdateForm('type', false);
        setUpdateForm('itemValue', true);
        setFieldsValue({ parentName: params.ParentName, ...params });
      }
    } else if (id === 'add') {
      modalTitle.value = '新增父级';
      setUpdateForm('type', true);
      setUpdateForm('itemValue', false);
    }
  });
  //提交方法
  async function submitFunc() {
    try {
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      const data = await validate();
      if (sortParams.id === 'addChildren' || sortParams.id === 'add') {
        addDictionaryApi(sortParams, data);
      } else if (sortParams.id === 'editChildren') {
        editDictionaryApi(sortParams, data);
      }
    } catch (error) {
      console.error(error);
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
    }
  }

  //修改显示
  function setUpdateForm(field, show) {
    updateSchema({ field, show });
  }

  // 新增
  const addDictionaryApi = (sortParams: sortParamsInterface, data: any) => {
    const { params } = sortParams;
    addManagementDictionary({ parentId: params.id, ...data })
      .then(() => {
        reset('提交成功');
      })
      .finally(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
      });
  };

  // 编辑下级
  const editDictionaryApi = (sortParams: sortParamsInterface, data: any) => {
    const { params } = sortParams;
    updateManagementDictionary({ id: params.id, ...data })
      .then(() => {
        reset('编辑成功');
      })
      .finally(() => {
        setProps({
          submitButtonOptions: {
            loading: false,
          },
        });
      });
  };

  //成功回调
  function reset(title: string) {
    closeModal();
    emits('reload');
    createMessage.success(title);
  }
</script>
