const routeData = new Map([
  ['/', '1'],
  ['/product/commodity', '2'],
  ['/product/category', '3'],
  ['/user/list', '4'],
  ['/order/manage', '5'],
  ['/error/404', '6'],
  ['/error/breakdown', '7']
]);

const subMenuData = new Map([
  ['2', 'sub1'],
  ['3', 'sub1'],
  ['4', 'sub2'],
  ['5', 'sub3'],
  ['6', 'sub4'],
  ['7', 'sub4']
]);

export default {
  routeData,
  subMenuData
};
