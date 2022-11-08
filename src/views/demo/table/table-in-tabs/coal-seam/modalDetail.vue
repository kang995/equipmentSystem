<template>
  <BasicModal
    v-bind="$attrs"
    title="Modal Title"
    width="700px"
    @register="register"
    :useWrapper="true"
    :destroyOnClose="true"
    cancelText="返回"
    okText="编辑"
    @ok="goEdit"
  >
    <Description :column="1" :data="mockData" :schema="schema" :labelStyle="{ width: '144px' }" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description, DescItem } from '/@/components/Description';
  import { ref } from 'vue';

  const emit = defineEmits(['goEdit', 'register']);

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    console.log('Data Received', data);
    // 方式1;
    // setFieldsValue({
    //   field2: data.data,
    //   field1: data.info,
    // });

    // // 方式2
    // modelRef.value = { field2: data.data, field1: data.info };

    // setProps({
    //   model:{ field2: data.data, field1: data.info }
    // })
  }

  const mockData: Recordable = ref({
    username: 'test',
    nickName: 'VB',
    age: '123',
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  });
  const schema: DescItem[] = [
    {
      field: 'username',
      label: '参数',
    },
    {
      field: 'nickName',
      label: '平均厚度',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
    },
    {
      field: 'phone',
      label: '最小厚度',
    },
    {
      field: 'email',
      label: '最大厚度',
    },
    {
      field: 'addr',
      label: '分层厚度',
    },
    {
      field: 'addr',
      label: '单向抗压强度',
    },
    {
      field: 'addr',
      label: '单向抗拉程度',
    },
    {
      field: 'addr',
      label: '节理裂隙间距',
    },
    {
      field: 'addr',
      label: '灰尘爆炸指数',
    },
    {
      field: 'addr',
      label: '冲击倾向性',
    },
    {
      field: 'addr',
      label: '瓦斯含量',
    },
    {
      field: 'addr',
      label: '发火期',
    },
    {
      field: 'addr',
      label: '是否显示标签',
    },
    {
      field: 'addr',
      label: '是否可漫游',
    },
  ];

  function goEdit() {
    console.log('编辑');
    closeModal();
    emit('goEdit');
  }
</script>
