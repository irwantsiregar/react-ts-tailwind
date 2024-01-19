/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { config } from '../utils/config';

// interface Headers {
//   'Content-Type'?: string
// }

// interface Payload {
//   todo: string | BodyInit
//   completed: boolean | BodyInit
//   userId: number | BodyInit
// }

interface Options {
  method?: string
  // headers: Headers | null
  body?: BodyInit | string
}

export async function fetchApi (url: string, options?: Options | undefined) {
  console.log(options);

  return await fetch(`${config.api_host}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.token}`
    },
    ...(options ?? {})
  });
}
