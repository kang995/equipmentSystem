<template>
  <PageWrapper title="表单增删示例">
    <CollapseContainer title="表单增删">
      <BasicForm @register="register" @submit="handleSubmit">
        <template #add="{ field }">
          <Button v-if="Number(field) === 0" @click="add">+</Button>
          <Button v-if="field > 0" @click="del(field)">-</Button>
        </template>
      </BasicForm>
      <a-button @click="objTransformToArrClick" class="mr-4">obj转成arr</a-button>
      <a-button @click="arrTransformToObjClick">arr转成obj</a-button>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { Input } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Button } from '/@/components/Button';
  import { arrTransformToObj, objTransformToArr } from '/@/utils/form';

  export default defineComponent({
    components: { BasicForm, CollapseContainer, PageWrapper, [Input.name]: Input, Button },
    setup() {
      const [register, { appendSchemaByField, removeSchemaByFiled, validate }] = useForm({
        schemas: [
          {
            field: 'field_a0',
            component: 'Input',
            label: '字段0',
            colProps: {
              span: 8,
            },
            required: true,
          },
          {
            field: 'field_b0',
            component: 'Input',
            label: '字段0',
            colProps: {
              span: 8,
            },
            required: true,
          },
          {
            field: '0',
            component: 'Input',
            label: ' ',
            colProps: {
              span: 8,
            },
            slot: 'add',
          },
        ],
        labelWidth: 100,
        actionColOptions: { span: 24 },
      });

      async function handleSubmit() {
        try {
          const data = await validate();
          console.log(data);
          formData.value = data;
        } catch (e) {
          console.log(e);
        }
      }

      const n = ref(1);
      const formData = ref(null);
      let transformArr;
      let transformObj;

      function add() {
        appendSchemaByField(
          {
            field: `field_a${n.value}`,
            component: 'Input',
            label: '字段' + n.value,
            colProps: {
              span: 8,
            },
            required: true,
          },
          '',
        );
        appendSchemaByField(
          {
            field: `field_b${n.value}`,
            component: 'Input',
            label: '字段' + n.value,
            colProps: {
              span: 8,
            },
            required: true,
          },
          '',
        );

        appendSchemaByField(
          {
            field: `${n.value}`,
            component: 'Input',
            label: ' ',
            colProps: {
              span: 8,
            },
            slot: 'add',
          },
          '',
        );
        n.value++;
      }

      function del(field) {
        removeSchemaByFiled([`field_a${field}`, `field_b${field}`, `${field}`]);
        // n.value--;
      }

      // 对象转数组
      function objTransformToArrClick() {
        transformArr = objTransformToArr(formData.value, ['field_a', 'field_b']);
        console.log(transformArr);
      }

      // 数组转对象
      function arrTransformToObjClick() {
        transformObj = arrTransformToObj(transformArr, ['field_a', 'field_b']);
        console.log(transformObj);
      }

      return {
        register,
        handleSubmit,
        add,
        del,
        formData,
        objTransformToArrClick,
        arrTransformToObjClick,
      };
    },
  });
</script>
