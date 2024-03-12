import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// Public 데코레이터 정의
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);