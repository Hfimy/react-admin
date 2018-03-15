import queryString from 'query-string';

export function getProductList(params, cb) {
  let url = '/manage/product/list.do';
  const data = { pageNum: params.pageNum };
  if (params.type === 'search') {
    url = '/manage/product/search.do';
    data[params.searchType] = params.searchKeyWord;
  }

  fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(data)
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ status: 1, msg: err }));
}

export function updateProductStatus(data, cb) {
  fetch('/manage/product/set_sale_status.do', {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(data)
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb(err));
}
