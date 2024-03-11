import { NextResponse } from 'next/server'
 

export function middleware(request) {
    const path = request.nextUrl.pathname;

    const isNotAllowedWithToken = path === '/loginPage' || path === '/registerPage' || path === "/verifyEmailInfo" || path === "/verifyEmail";// || path === '/verifyemail'
    
    //const isPublicPath = path !== "/verifyEmailInfo" && path !== "/verifyEmail";

    const token = request.cookies.get('token')?.value || '';
    
    if(!token){
        return NextResponse.next()
    }
    if(isNotAllowedWithToken && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    /*if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/loginPage', request.nextUrl))
        
    }*/
    

    
}

 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
      '/',
      '/loginPage',
      '/registerPage',
      '/verifyEmailInfo',
      '/verifyEmail'
    ]
  }
