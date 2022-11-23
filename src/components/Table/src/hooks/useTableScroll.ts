import type { BasicTableProps, TableRowSelection, BasicColumn } from '../types/table';
import { Ref, ComputedRef, ref } from 'vue';
import { computed, unref, nextTick, watch } from 'vue';
import { getViewportOffset } from '/@/utils/domUtils';
import { isBoolean } from '/@/utils/is';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
import { useModalContext } from '/@/components/Modal';
import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
import { useDebounceFn } from '@vueuse/core';

export function useTableScroll(
  propsRef: ComputedRef<BasicTableProps>,
  tableElRef: Ref<ComponentRef>,
  columnsRef: ComputedRef<BasicColumn[]>,
  rowSelectionRef: ComputedRef<TableRowSelection | null>,
  getDataSourceRef: ComputedRef<Recordable[]>,
  wrapRef: Ref<HTMLElement | null>,
  formRef: Ref<ComponentRef>,
) {
  const tableHeightRef: Ref<Nullable<number | string>> = ref(0);
  const modalFn = useModalContext();

  // Greater than animation time 280
  // 避免重复计算，paginationHeight获取不正常
  const debounceRedoHeight = useDebounceFn(redoHeight, 300);

  const getCanResize = computed(() => {
    const { canResize, scroll } = unref(propsRef);
    return canResize && !(scroll || {}).y;
  });

  watch(
    () => [unref(getCanResize), unref(getDataSourceRef)?.length],
    () => {
      console.warn('执行watch');
      const { isCanResizeParent } = unref(propsRef);
      if (unref(wrapRef) && isCanResizeParent) {
        debounceRedoHeight();
      } else {
        calcTableHeight();
      }
    },
    {
      flush: 'post',
    },
  );

  function redoHeight() {
    // console.log('执行redoHeight');
    nextTick(() => {
      calcTableHeight();
    });
  }

  function setHeight(height: number) {
    tableHeightRef.value = height;
    //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
    modalFn?.redoModalHeight?.();
  }

  // No need to repeat queries
  let paginationEl: HTMLElement | null;
  let footerEl: HTMLElement | null;
  let bodyEl: HTMLElement | null;

  async function calcTableHeight() {
    // console.log('执行calcTableHeight');
    const { resizeHeightOffset, pagination, maxHeight, isCanResizeParent, showSummary } =
      unref(propsRef);
    const tableData = unref(getDataSourceRef);

    const table = unref(tableElRef);
    if (!table) return;

    const tableEl: Element = table.$el;
    if (!tableEl) return;

    if (!bodyEl) {
      bodyEl = tableEl.querySelector('.ant-table-body');
      if (!bodyEl) return;
    }

    const hasScrollBarY = bodyEl.scrollHeight > bodyEl.clientHeight;
    const hasScrollBarX = bodyEl.scrollWidth > bodyEl.clientWidth;

    if (hasScrollBarY) {
      tableEl.classList.contains('hide-scrollbar-y') &&
        tableEl.classList.remove('hide-scrollbar-y');
    } else {
      !tableEl.classList.contains('hide-scrollbar-y') && tableEl.classList.add('hide-scrollbar-y');
    }

    if (hasScrollBarX) {
      tableEl.classList.contains('hide-scrollbar-x') &&
        tableEl.classList.remove('hide-scrollbar-x');
    } else {
      !tableEl.classList.contains('hide-scrollbar-x') && tableEl.classList.add('hide-scrollbar-x');
    }

    bodyEl!.style.height = 'unset';

    // 删除`|| tableData.length === 0`，有没有数据都计算高度
    if (!unref(getCanResize) || !unref(tableData)) return;

    await nextTick();
    // Add a delay to get the correct bottomIncludeBody paginationHeight footerHeight tableHeaderHeight

    const headEl = tableEl.querySelector('.ant-table-thead');

    if (!headEl) return;

    // Table height from bottom height-custom offset
    // 表格底部内边距加跟下一个组件距离之和（下方没有组件则为跟window底部的距离）
    const paddingHeight = 32;
    const tableBottomBorderHeight = 1;
    // Pagination height
    let paginationHeight = 0;
    // console.log('!isBoolean(pagination)', !isBoolean(pagination));
    if (!isBoolean(pagination)) {
      paginationEl = tableEl.querySelector('.ant-pagination') as HTMLElement;
      if (paginationEl) {
        const offsetHeight = paginationEl.offsetHeight;
        paginationHeight += offsetHeight || 0;
      }
    }
    // console.log('paginationHeight1', paginationHeight);
    let footerHeight = 0;
    if (showSummary) {
      footerEl = tableEl.querySelector('.ant-table-footer') as HTMLElement;
      if (footerEl) {
        const offsetHeight = footerEl.offsetHeight;
        footerHeight += offsetHeight || 0;
      }
    }

    let tableHeaderHeight = 0;
    if (headEl) {
      tableHeaderHeight = (headEl as HTMLElement).offsetHeight;
    }

    let bottomIncludeBody: number;
    let height: number;
    if (unref(wrapRef) && isCanResizeParent) {
      // console.log('paginationHeight2', paginationHeight);
      const tablePadding = 32;
      const formMargin = 16;
      let paginationMargin = 0;
      const wrapHeight = unref(wrapRef)?.offsetHeight ?? 0;
      // console.log('wrapHeight', wrapHeight);

      let formHeight = unref(formRef)?.$el.offsetHeight ?? 0;
      if (formHeight) {
        formHeight += formMargin;
      }
      if (isBoolean(pagination) && !pagination) {
        paginationMargin = 0;
      }

      const headerCellHeight =
        (tableEl.querySelector('.ant-table-title') as HTMLElement)?.offsetHeight ?? 0;
      height =
        wrapHeight -
        (resizeHeightOffset || 0) -
        formHeight -
        tablePadding -
        headerCellHeight -
        paginationHeight -
        footerHeight -
        tableHeaderHeight -
        tableBottomBorderHeight * 2 -
        paginationMargin;
    } else {
      // Table height from bottom
      bottomIncludeBody = getViewportOffset(headEl).bottomIncludeBody;
      height =
        bottomIncludeBody -
        (resizeHeightOffset || 0) -
        paddingHeight -
        paginationHeight -
        footerHeight -
        tableHeaderHeight -
        tableBottomBorderHeight;
    }
    height = (height > maxHeight! ? (maxHeight as number) : height) ?? height;
    // console.log('height', height);
    // 重新获取一下dom，防止设置高度失效
    bodyEl = tableEl.querySelector('.ant-table-body');
    if (!bodyEl) return;
    setHeight(height);

    bodyEl!.style.height = `${height}px`;
  }

  useWindowSizeFn(calcTableHeight, 280);
  onMountedOrActivated(() => {
    console.warn('执行onMountedOrActivated');
    const { isCanResizeParent } = unref(propsRef);
    if (unref(wrapRef) && isCanResizeParent) {
      debounceRedoHeight();
    } else {
      calcTableHeight();
    }
  });

  const getScrollX = computed(() => {
    let width = 0;
    if (unref(rowSelectionRef)) {
      width += 60;
    }

    // TODO props ?? 0;
    const NORMAL_WIDTH = 150;

    const columns = unref(columnsRef).filter((item) => !item.defaultHidden);
    columns.forEach((item) => {
      width += Number.parseFloat(item.width as string) || 0;
    });
    const unsetWidthColumns = columns.filter((item) => !Reflect.has(item, 'width'));

    const len = unsetWidthColumns.length;
    if (len !== 0) {
      width += len * NORMAL_WIDTH;
    }

    const table = unref(tableElRef);
    const tableWidth = table?.$el?.offsetWidth ?? 0;
    return tableWidth > width ? '100%' : width;
  });

  const getScrollRef = computed(() => {
    const tableHeight = unref(tableHeightRef);
    const { canResize, scroll } = unref(propsRef);
    return {
      x: unref(getScrollX),
      y: canResize ? tableHeight : null,
      scrollToFirstRowOnChange: false,
      ...scroll,
    };
  });

  return { getScrollRef, redoHeight };
}
