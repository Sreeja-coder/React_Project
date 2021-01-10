// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init(){
    // Sentry.init({
    //     dsn: "https://6f94c02111824f6482a71b5f0def290c@o500076.ingest.sentry.io/5579388",
    //     release: "http-app-sree@" + process.env.npm_package_version,
    //     integrations: [new Integrations.BrowserTracing()],
      
    //     // We recommend adjusting this value in production, or using tracesSampler
    //     // for finer control
    // //     tracesSampleRate: 1.0,
    //   });   
}

function log(error){
    console.log(error);
    // Sentry.captureException(error)
}

export default{
    init,
    log
};