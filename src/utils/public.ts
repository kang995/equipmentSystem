import dayjs, { OpUnitType } from 'dayjs';

/**
 * 根据类型获取开始时间结束时间
 * 年year 月month 周week 日day
 * @param type
 */
export function getTimeByType(type: string) {
  return [
    dayjs()
      .startOf(<OpUnitType>type)
      .format('YYYY-MM-DD 00:00:00'),
    dayjs()
      .endOf(<OpUnitType>type)
      .format('YYYY-MM-DD 23:59:59'),
  ];
}
