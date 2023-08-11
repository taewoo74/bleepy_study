import { rest } from 'msw';
import {
  dummy0,
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
} from './dummy.tsx';

export const handlers = [
  rest.get('/table', (req, res, ctx): any => {
    const page = Number(req.url.searchParams.get('page'));
    const result = [
      dummy0,
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
    ];
    return res(ctx.status(200), ctx.json(result[page]));
  }),
];
