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
    .catch(err => cb && cb({ status: 1, msg: err }));
}

export function getCategoryId(categoryId = 0, cb) {
  const url = `/manage/category/get_category.do?categoryId=${categoryId}`;
  fetch(url, { credentials: 'include' })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ status: 1, msg: err }));
}

export function uploadImage(url, form, cb) {
  fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      // 'Content-Type': 'multipart/form-data'
    },
    body: form
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

export function uploadRichImage(file, cb) {
  const url = '/manage/product/richtext_img_upload.do';
  const form = new FormData();
  form.append('upload_file', file);

  fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      // 'Content-Type': 'multipart/form-data'
    },
    body: form
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ success: false, msg: err }));
}

export function addOrUpdateProduct(simpleData, complexData, cb) {
  const url = '/manage/product/save.do';
  // const data = queryString.stringify(simpleData) + `&detail=${complexData}`;
  const allData = { ...simpleData, ...complexData };
  fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify(allData)
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('服务器错误');
    })
    .then(res => cb && cb(res))
    .catch(err => cb && cb({ status: 1, data: err }));
}
