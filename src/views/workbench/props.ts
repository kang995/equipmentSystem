import { PropType } from 'vue';

import { FormSchema } from '/@/components/Form';

export const basicProps = {
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  height: {
    type: String as PropType<string>,
    default: '280px',
  },
};
export const schemasSearch: FormSchema[] = [
  {
    field: 'startDateTime',
    component: 'RangePicker',
    label: '',
    slot: 'StartTimeSlot',
    colProps: {
      span: 16,
    },
  },
  {
    field: 'endDateTime',
    component: 'RangePicker',
    label: '',
    show: false,
  },
];
