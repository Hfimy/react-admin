const routeData = new Map([
  ['/', '1'],
  ['/product/commodity', '2'],
  ['/product/commodity/detail', '2'],
  ['/product/commodity/add', '2'],
  ['/product/commodity/edit', '2'],
  ['/product/category', '3'],
  ['/user/list', '4'],
  ['/order/list', '5'],
  ['error/404', '6']
]);

const subMenuData = new Map([
  ['2', 'sub1'],
  ['3', 'sub1'],
  ['4', 'sub2'],
  ['5', 'sub3'],
  ['6', 'sub4']
]);

export default {
  routeData,
  subMenuData
};
