import React, { useEffect } from 'react';
import { AuthContext } from "../App";

export default function KakaLogin({ location }) {
    
     const { dispatch } = React.useContext(AuthContext);
    const user = {
        email: "",
        nickname: "",
        token :""
    };

    if (location.search != ""){
        var array = location.search.split("=");
        fetch("http://localhost:8080/api/kakao", {
            method: "POST",
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            body: 'code='+array[1],
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson,null,2));

            user.email= myJson.Susscee.result.kakao_account.email;
            user.nickname = myJson.Susscee.result.properties.nickname;
            user.token = array[1];
            dispatch({
                type: "TEST",
                user: user,
            })
        });
      
    }
//   useEffect(() => {
//     if (location.search != ""){
//         var array = location.search.split("=");
//         fetch("http://localhost:8080/api/kakao", {
//             method: "POST",
//             headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//             body: 'code='+array[1],
//         })
//         .then(res => {
//                 console.log(res);
//         })
//         .catch(error => {
//                 console.log("error"+error);
//         });
//     }
//   }, [])

  return (
        <div> 
             <a href="https://kauth.kakao.com/oauth/authorize?client_id=119d5fbc03400737dc7689461d4d67fa&redirect_uri=http://localhost:3000/&response_type=code" > 로그인2</a>
        </div>
    );
}