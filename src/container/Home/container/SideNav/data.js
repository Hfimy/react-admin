const routeData = new Map([
  ['/', '1'],
  ['/commodity', '2'],
  ['/category', '3'],
  ['/userlist', '4'],
  ['/orderlist', '5'],
  ['/404', '6']
]);

const subMenuData = new Map([
  ['2', 'sub1'],
  ['3', 'sub1'],
  ['4', 'sub2'],
  ['5', 'sub3']
]);

export default {
  routeData,
  subMenuData
};
