const TEMPLATE = [
  {
    entry: "src/views/index.tsx",
    template: "public/index.html",
    outPath: "/index.html",
  },
  {
    entry: "src/views/counter.tsx",
    template: "public/index.html",
    outPath: "/counter.html",
  },
  // {
  //   entry: 'src/build.js',
  //   template: 'public/index.html',
  //   outPath: '/build.html'
  // },
  // {
  //   entry: 'src/razorpay.js',
  //   template: 'public/index.html',
  //   outPath: '/razorpay.html'
  // },
  // {
  //   entry: 'src/socialauth.js',
  //   template: 'public/index.html',
  //   outPath: '/socialauth.html'
  // },
  // {
  //     entry: 'src/MotherBoardParts.js',
  //     template: 'public/index.html',
  //     outPath: '/MotherBoardParts.html'
  // },
  // {
  //     entry: 'src/CPUParts.js',
  //     template: 'public/index.html',
  //     outPath: '/CPUParts.html'
  // }
];

const rewritesForTemplate = (inTemplate) => {
  const rewrites = [];
  for (const ob of inTemplate) {
    if (ob.outPath.endsWith(".html")) {
      if (ob.outPath === "index.html") {
        continue;
      }
      const str = `^/${ob.outPath.slice(0, -5)}$`;
      console.log(str);
      rewrites.push({
        from: new RegExp(`^/${ob.outPath.slice(0, -5)}$`),
        to: `/${ob.outPath}`,
      });
      rewrites.push({
        from: new RegExp(`^/${ob.outPath.slice(0, -5)}/`),
        to: `/${ob.outPath}`,
      });
    }
  }
  // console.log(JSON.stringify(rewrites, undefined, 2))
  return rewrites;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const multipleEntry = require("react-app-rewire-multiple-entry")(TEMPLATE);

module.exports = {
  webpack: function (config, env) {
    config = multipleEntry.addMultiEntry(config);
    // console.log(JSON.stringify(config, undefined, 2));
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      proxy = {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
        },
      };
      const config = configFunction(proxy, allowedHost);
      config.historyApiFallback.rewrites = rewritesForTemplate(TEMPLATE);
      // console.log(JSON.stringify(config, undefined, 2));
      return config;
    };
  },
};
