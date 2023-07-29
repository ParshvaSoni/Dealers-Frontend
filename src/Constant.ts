const prod={
    URLS:{
        BACKEND_URL:""
    }
}

const dev={
    URLS:{
        BACKEND_URL:"http://localhost:3500/"
    }
}

export  const config = process.env.REACT_APP_ENV==='DEVELOPMENT'?dev:prod;