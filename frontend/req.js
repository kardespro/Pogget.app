const axios = require("axios");
const proxyList = [
  ":@rp.proxyscrape.com:6060",
  // Diğer proxyler buraya eklenir...
];

async function main() {
  for (const proxy of proxyList) {
    try {
      const response = await axios.get("https://ipinfo.io/json", {
        proxy: {
          host: "rp.proxyscrape.com",
          port: 6060,

          protocol: "http",
          auth: {
            username: "c4qvbggtmcwcphl-country-az",
            password: "qtewo531wcn9y5o",
          },
        },
      });

      // İşlem başarılı, response kullanabilirsiniz.
      console.log("Başarılı istek:", response.status, response.data);
    } catch (error) {
      // Hata durumu, error kullanabilirsiniz.
      console.error("Hata:", error.message);
    }
  }
}

main();
