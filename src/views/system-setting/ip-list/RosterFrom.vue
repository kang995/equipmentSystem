<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4">
    <BasicForm @register="register">
      <template #endIp>
        <a-form-item-rest>
          <div class="flex">
            <a-input addon-before="起始IP" v-model:value="startIp" />
            <a-input addon-before="结束IP" v-model:value="endIp" />
          </div>
        </a-form-item-rest>
      </template>
    </BasicForm>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Input, Form, message } from 'ant-design-vue';
  import { BasicForm } from '/@/components/Form';
  import { useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { schemas } from './data';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { postIpInfoAdd, postIpInfoDetail, postIpInfoUpdate } from '/@/api/systemSetting/ip-list';

  const { closeCurrent } = useTabs();

  const route = useRoute(),
    router = useRouter();

  const type = route.query.type,
    id = route.query.id;

  const AInput = Input,
    AFormItemRest = Form.ItemRest;
  const versionID = ref();
  id &&
    postIpInfoDetail({ id: id }).then((res) => {
      const { remark, startIp: getStartIp, endIp: getEndIp, ip, version, ipType } = res;
      if (ipType === '0') {
        setFieldsValue({
          ipType: 0,
          ip,
          remark,
        });
      } else {
        setFieldsValue({
          ipType: 1,
          remark,
        });
        endIp.value = getEndIp;
        startIp.value = getStartIp;
      }
      versionID.value = version;
    });

  let endIp = ref(''),
    startIp = ref('');

  const submitFunc = async () => {
    let params = getFieldsValue();
    params.identity = type;
    if (params.ipType === 1) {
      // 单个IP
      if (startIp.value === '' || endIp.value === '') {
        return message.warning(`${startIp.value === '' ? '开始IP' : '结束IP'}不能为空`);
      }
      params.startIp = startIp.value;
      params.endIp = endIp.value;
      delete params.ip;
    } else {
      //IP范围段
      // params.startIp = startIp.value;
      // params.endIp = endIp.value;
      // if (params.ip === '') {
      //   return message.warning('IP不能为空');
      // }
    }
    params.version = versionID.value;
    // delete params.ipType;
    if (id) {
      params.id = id;

      await postIpInfoUpdate(params);
    } else {
      await postIpInfoAdd(params);
    }
    message.success('保存成功');
    colseTab();
  };

  const resetFunc = async () => {
    colseTab();
  };

  const colseTab = () => {
    closeCurrent();
    router.push({
      name: 'IpListSet',
    });
  };

  const [register, { getFieldsValue, setFieldsValue }] = useForm({
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
    schemas,
    actionColOptions: {
      offset: 12,
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
    resetFunc,
    submitFunc,
  });
</script>
