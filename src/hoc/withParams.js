import {
    useParams,
} from "react-router";
import React from "react";
import loader from './../assets/images/loader.svg'

export function withParams(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
      
        return (
            <Component
                {...props}
                profileId={params.profileId}
            />
        );
    }

    return ComponentWithRouterProp;
}

export function withSuspense(Component) {
    return (props) => {
        return (
            <React.Suspense fallback={loader}>
                <Component {...props} />
            </React.Suspense>
        )
    }

}







{/*import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                match={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}*/}




