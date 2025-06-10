export default function searchByCouponGroup(groupNumber: number): {startDate: Date, endDate: Date} {

  const startDateMap: {[key: number]: Date} = {
    1: new Date('2025-07-10T12:00:00.000Z'),
    2: new Date('2025-07-12T12:00:00.000Z'),
    3: new Date('2025-07-14T12:00:00.000Z'),
    4: new Date('2025-07-19T12:00:00.000Z'),
    5: new Date('2025-07-21T12:00:00.000Z'),
    6: new Date('2025-07-26T12:00:00.000Z'),
    7: new Date('2025-07-28T12:00:00.000Z'),
    8: new Date('2025-08-02T12:00:00.000Z'),
    9: new Date('2025-08-04T12:00:00.000Z'),
    10: new Date('2025-08-09T12:00:00.000Z'),
    11: new Date('2025-08-11T12:00:00.000Z'),
    12: new Date('2025-08-16T12:00:00.000Z'),
    13: new Date('2025-08-18T12:00:00.000Z'),
    14: new Date('2025-08-23T12:00:00.000Z'),
    15: new Date('2025-08-25T12:00:00.000Z'),
    16: new Date('2025-08-30T12:00:00.000Z'),
  };

  const endDateMap: {[key: number]: Date} = {
    1: new Date('2025-07-11T12:59:59.999Z'),
    2: new Date('2025-07-13T12:59:59.999Z'),
    3: new Date('2025-07-18T12:59:59.999Z'),
    4: new Date('2025-07-20T12:59:59.999Z'),
    5: new Date('2025-07-25T12:59:59.999Z'),
    6: new Date('2025-07-27T12:59:59.999Z'),
    7: new Date('2025-08-01T12:59:59.999Z'),
    8: new Date('2025-08-03T12:59:59.999Z'),
    9: new Date('2025-08-08T12:59:59.999Z'),
    10: new Date('2025-08-10T12:59:59.999Z'),
    11: new Date('2025-08-15T12:00:00.999Z'),
    12: new Date('2025-08-17T12:59:59.999Z'),
    13: new Date('2025-08-22T12:59:59.999Z'),
    14: new Date('2025-08-24T12:59:59.999Z'),
    15: new Date('2025-08-29T12:59:59.999Z'),
    16: new Date('2025-08-31T12:59:59.999Z'),
  };

  return {
    startDate: startDateMap[groupNumber],
    endDate: endDateMap[groupNumber],
  };
}
