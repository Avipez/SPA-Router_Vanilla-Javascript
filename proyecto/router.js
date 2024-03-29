class Router {
    constructor(routes){
        this.routes = routes;
        this._loadInitialRoutes();
    }

    _loadInitialRoutes() {
        const pathNameSplit = window.location.pathname.split("/");
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1): "";
    
        this.loadRoute(...pathSegs);
    }

    _matchURLToRoutes(urlSegs) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegs = route.path.split
            ("/").slice(1);

            if(routePathSegs.length !== urlSegs.length){
                return false;
            }

            return routePathSegs
                .every((routePathSegs, i) => routePathSegs === urlSegs[i])
        });

        return matchedRoute;
    }

    loadRoute(...urlSegs) {
        const matchedRoute =  this._matchURLToRoutes(urlSegs);

        const url = `/${urlSegs.join("/")}`;
        history.pushState({}, "this works", url);

        const routerOutElm = document.querySelectorAll('[data-router]')[0];
        routerOutElm.innerHTML = matchedRoute.template;
    }
}
