import React, {useEffect} from 'react';

import Api from "../../services/Api";
import Auth from "../../security/Auth";
import Body from "../../components/body";

function Home () {

    useEffect(() => {
        Api
            .get("produto", {
                headers: {
                    'Authorization': `Bearer ${Auth.getToken()}`
                }
            })
            .then(console.log)
            .catch(console.log)
    })

    return (
        <>
            <Body/>
        </>
    );
}
export default Home;