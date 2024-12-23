import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockBackendInterceptor } from './interceptors/mock-backend.interceptor';

export const CORE_PROVIDERS = [
  provideHttpClient(
    withInterceptors([mockBackendInterceptor])
  )
]
