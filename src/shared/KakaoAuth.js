import React from 'react';
const CLIENT_ID = "a3601a903e81f37561b865b380476480";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

// 프런트엔드 리다이랙트 URI 예시
// const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

// 백엔드 리다이랙트 URI 예시
// const REDIRECT_URI =  "http://localhost:5000/kakao/code";


export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;


// const KaKaoAuth = () => {
//     const code = new URL(window.location.href).searchParams.get("code");
//     return (
//         <div>
//             {code}
//         </div>
//     );
// };
// export default KaKaoAuth;