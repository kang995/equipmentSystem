<template>
  <PageWrapper contentBackground contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { schemasAdd } from './data';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter, useRoute } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { message } from 'ant-design-vue';
  import { onMounted, ref } from 'vue';
  import { getPeopleSelectApi } from '/@/api/device-maintenance';
  import { addListApi, getDetailsApi, editListApi } from '/@/api/device-removal/data';
  const { closeCurrent } = useTabs();
  const router = useRouter();
  const route = useRoute();
  const routeId = route.query.id as string;
  const routeCodeId = route.query.codeId as string;
  const flag = route.query.flag as string;
  const [register, { getFieldsValue, setFieldsValue, updateSchema, validateFields }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    schemas: schemasAdd(routeId, routeCodeId),
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
    resetFunc: resetSubmitFunc,
    submitFunc: sumitForm,
    fieldMapToTime: [['timeDate', ['startDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
  });
  onMounted(() => {
    routeCodeId &&
      setFieldsValue({
        demolishId: routeCodeId,
      });
    routeId && getDetails();
  });
  const version = ref('');
  function getDetails() {
    getDetailsApi({
      id: routeId,
    }).then((res) => {
      setFieldsValue(res);
      version.value = res.version;
      //拆除时间设置
      setFieldsValue({
        timeDate: [res.startDate, res.endDate],
      });
      //负责人设置
      getPeopleSelectApi([res.chargeDeptId]).then((res) => {
        updateSchema({
          field: 'chargePeopleId',
          componentProps: {
            options: res,
          },
        });
      });
    });
  }
  async function resetSubmitFunc() {
    closeCurrent();
    router.go(-1);
  }
  async function sumitForm() {
    await validateFields();
    const data = getFieldsValue();
    if (!data.affixList) {
      data['affixList'] = [];
    }
    if (!data.imgList) {
      data['imgList'] = [];
    }
    if (routeId) {
      editListApi({
        ...data,
        version: version.value,
        id: routeId,
      }).then(() => {
        message.success('修改成功');
        if (flag === 'Cooment') {
          router.push({
            name: 'teardownDetails',
          });
        } else {
          closeCurrent();
          router.go(-1);
        }
      });
    } else {
      addListApi(data).then(() => {
        message.success('新增成功');
        if (flag === 'Cooment') {
          router.push({
            name: 'teardownDetails',
          });
        } else {
          closeCurrent();
          router.go(-1);
        }
      });
    }
  }
</script>
