const dummy1 = {
  data: [
    {
      id: 409,
      serviceName: '블리피36',
      companyName: '(주)테스트사36',
      serviceCategoryName: 'SOCIAL_MEDIA_COMMUNITY',
      email: 'test36@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'SUBSCRIBING',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo1.png',
    },
    {
      id: 408,
      serviceName: '블리피35',
      companyName: '(주)테스트사35',
      serviceCategoryName: 'SOCIAL_MEDIA_COMMUNITY',
      email: 'test35@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'SUBSCRIBING',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo2.png',
    },
    {
      id: 407,
      serviceName: '블리피34',
      companyName: '(주)테스트사34',
      serviceCategoryName: 'SOCIAL_MEDIA_COMMUNITY',
      email: 'test34@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'SUBSCRIBING',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo3.png',
    },
    {
      id: 406,
      serviceName: '블리피33',
      companyName: '(주)테스트사33',
      serviceCategoryName: 'SOCIAL_MEDIA_COMMUNITY',
      email: 'test33@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'NOT_SUBSCRIBE',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo4.png',
    },
    {
      id: 405,
      serviceName: '블리피32',
      companyName: '(주)테스트사32',
      serviceCategoryName: 'SOCIAL_MEDIA_COMMUNITY',
      email: 'test32@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'NOT_SUBSCRIBE',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo5.png',
    },
    {
      id: 404,
      serviceName: '블리피31',
      companyName: '(주)테스트사31',
      serviceCategoryName: 'SOCIAL_MEDIA_COMMUNITY',
      email: 'test31@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'NOT_SUBSCRIBE',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo6.png',
    },
    {
      id: 403,
      serviceName: '블리피30',
      companyName: '(주)테스트사30',
      serviceCategoryName: 'REAL_ESTATE_CONSTRUCTION',
      email: 'test30@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'NOT_SUBSCRIBE',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo7.png',
    },
    {
      id: 402,
      serviceName: '블리피29',
      companyName: '(주)테스트사29',
      serviceCategoryName: 'GAME',
      email: 'test29@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'NOT_SUBSCRIBE',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo8.png',
    },
    {
      id: 401,
      serviceName: '블리피28',
      companyName: '(주)테스트사28',
      serviceCategoryName: 'GAME',
      email: 'test28@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'NOT_SUBSCRIBE',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo9.png',
    },
    {
      id: 400,
      serviceName: '블리피27',
      companyName: '(주)테스트사27',
      serviceCategoryName: 'EDUCATION',
      email: 'test27@dkargo.io',
      registeredAt: '2023.08.05 16:55:00',
      contractStatus: 'NOT_SUBSCRIBE',
      serviceLogoImageUrl:
        'https://s3.ap-northeast-2.amazonaws.com/dev-mvp.bleepy.net/client/logo/logo10.png',
    },
  ],
  pagingInfo: {
    totalPages: 13,
    totalElements: 135,
    pageSize: 10,
    pageNumber: 1,
    isFirst: true,
    isLast: false,
    hasNext: true,
    hasPrevious: false,
    isEmpty: false,
  },
};

const makeDummy = (num: number) => {
  const data = JSON.parse(JSON.stringify(dummy1.data));
  data.forEach((one: any) => {
    one.id = one.id + num;
    one.serviceName = one.serviceName + num;
    one.companyName = one.companyName + num;
  });
  const pagingInfo = { ...dummy1.pagingInfo, pageSize: num };
  return { data, pagingInfo };
};

const deepCopy = (obj: any) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const copy: any = {};
  for (const key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
};

const dummy2 = makeDummy(2);
const dummy3 = makeDummy(3);
const dummy4 = makeDummy(4);
const dummy5 = makeDummy(5);
const dummy6 = makeDummy(6);
const dummy7 = makeDummy(7);
const dummy8 = makeDummy(8);
const dummy9 = makeDummy(9);
const dummy10 = makeDummy(10);
const dummy11 = makeDummy(11);
const dummy12 = makeDummy(12);
const dummy13 = makeDummy(13);
const dummy14 = makeDummy(14);

export {
  dummy1,
  dummy2,
  dummy3,
  dummy4,
  dummy5,
  dummy6,
  dummy7,
  dummy8,
  dummy9,
  dummy10,
  dummy11,
  dummy12,
  dummy13,
  dummy14,
};
