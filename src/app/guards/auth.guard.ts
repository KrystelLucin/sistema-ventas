import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const rol = localStorage.getItem('rol');
  const router = inject(Router);

  if (rol) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

function inject(type: any): any {
  return (window as any).ng?.injector?.get(type);
}