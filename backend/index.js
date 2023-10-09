const express = require('express');
const mongoose = require("mongoose")
const app = express();
const queryString = require("node:querystring");
const fs = require("node:fs")
const axios = require("axios")
const BlockedUser = require("./models/BlockedUsers")
const PORT = 80;
const { rateLimit } = require('express-rate-limit')
const RedisStore = require('rate-limit-redis')
const { createClient } = require('redis')
const chalk = require("chalk")

// Create a `node-redis` client
const client = createClient({
	password: 'ks4YzZhMZKCJSiMdoAnyE0H9RwSRbExr',
    socket: {
        host: 'redis-10936.c250.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 10936
    }
})
client.connect().then(a => console.log(`${chalk.bgBlueBright(`Redis Rate Limit`)} - Connection Successfull`))

const {
	getAccessToken,
	getAuthUser,
	getUserRepo
} = require("./auth/GitHubFetchApi");
const tokenModel = require("./models/token")
const GITHUB_CLIENT_ID = "Iv1.fb4e0160c407e250",
	GITHUB_CLIENT_SECRET = "a1774055a6f830470614cc59fd4b478bf5d35698";
const socket = require("./setupWebSocket")
const cors = require("cors")
const UserStars = require("./models/user-stars")
const globalPl = require("./models/global")
const bodyParser = require("body-parser")

function getRandomToken(length = 32) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}
/*app.use(bodyParser.json({
	extended: true
}));*/
const allowedHeader = ["x-pogget-devServer"]
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: true, 
	message: async (req, res) => {
    let enabledForDevelopment = "development-server"
    return res.status(429).json({
      status: 429,
      message: "Rate Limit from Pogget Services"
    })
  },
  skip: async (req, res) => allowedHeader.includes(req.headers),
  validate: {
		xForwardedForHeader: false,
		default: true,
	},
  store: new RedisStore({
		sendCommand: (...args) => client.sendCommand(args),
	}),
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter)

// Creating Connection

mongoose.connect('mongodb+srv://pogget:8Hka33tKSxcqSDRd@pogget.lwuijxp.mongodb.net/?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Connected to the database');
		// Start your application or perform database operations
	})
	.catch(error => {
		console.error('Error connecting to the database:', error);
	});
socket(app)
app.use(cors({
  origin: "*"
}));
app.use((req, res, next) => {
	res.header("Server", "Pogget");
	res.header("backend_version", "0");
	res.header("x-pogget-router", "exist");
	res.header("x-powered-by", "PoggetTeam , https://github.com/kardespro")
	res.header("x-xss-pogget", "0");
	res.header("Author", "Nego");
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("expect-ct", "https://api.nextbinfo.dev/api/reports/?nextbinfokey=562788188171");
	next();
});
app.get('/', (req, res) => {
	res.status(200).json({
    status: 200,
    message: "Server"
  })
});

app.post("/api/reports/newReport", async(req,res) => {
  //const fs = require('fs');

  fs.appendFileSync("reports.txt", `\nCreatedTimeStamp: ${Date.now()}\nData: ${JSON.parse(req.body.data)}`)
  return res.json({
    status: 200
  })
})
app.get("/api/plugins/:pid", async (req, res) => {
  let pid = req.params.pid;

  if (!pid || !mongoose.Types.ObjectId.isValid(pid)) {
    return res.json({
      status: 404,
      message: "Incorrect Parameter",
    });
  }

  try {
    let d = await globalPl.findOne({ _id: pid });
    if (!d) {
      return res.json({
        status: 404,
        message: "Provided Plugin Not Found",
      });
    }

    return res.json({
      status: 200,
      d,
    });
  } catch (err) {
    fs.appendFileSync("error.txt", `\n${err}`);
    return res.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

app.post("/v1/auth/test", async (req, res) => {
	let token = getRandomToken();
	await new tokenModel({
		token,
		github_access_token: m
	}).save();
	res.json({ token })
})

app.get("/auth/github", async (req, res) => {
	if (authCode = req.query?.code) {
		const responseData = queryString.decode(await getAccessToken(
			GITHUB_CLIENT_ID,
			GITHUB_CLIENT_SECRET,
			authCode
		));
		let token = getRandomToken();
		if (access_token = responseData?.access_token) {
			//res.json(await getAuthUser(access_token)); //eğer token varsa kullanıcı bilgilerini al
			await (await new tokenModel({
				token,
				github_access_token: access_token
			})).save();
			res.redirect(`http://localhost:3000/auth/close/${token}`)
			//...
		} else res.json(responseData);
		return;
	}
	res.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`);
});

app.get("/api/users/@me", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Basic ")) {
    const token = authHeader.slice(6); // "Basic " kısmını çıkartarak token'ı alın
    const tokenModelData = await tokenModel.findOne({ token });

    if (!tokenModelData) {
      return res.status(401).json({
        status: 401,
        message: "User Not Found"
      });
    }

    const { github_access_token } = tokenModelData;
    const user = await getAuthUser(github_access_token);
    const Blocked = await BlockedUser.findOne({ token: github_access_token })

    // Eğer getAuthUser fonksiyonu GitHub erişim belirteci ile kullanıcı bilgilerini döndürüyorsa, burada düzgünce işlem yapabilirsiniz.
    // Örnek olarak:
    if (user) {
      res.json({
        github_access_token,
        user,
        blocked: Blocked?.blocked || false
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Failed to fetch user data from GitHub"
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: "Unauthorized"
    });
  }
});

app.get("/api/users/@me/repos", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.split(" ")[0] === "Bearer") {
		const token = authHeader.split(" ")[1]; // "Bearer " kısmını çıkartarak token'ı alır
		const tokenModel = await tokenModel.findOne({ token })
		if (!tokenModel) return res.status(401).json({
			message: "User Not Found"
		})
		const { github_access_token } = tokenModel;
		const repo = await getUserRepo(github_access_token)
		res.json({
			github_access_token,
			repo
		})
	}
});

app.post("/api/users/@me/plugins/:pid/edit", async (req, res) => {
	const { pid } = req.params;
	let db = await globalPl.findOne({ _id: pid })
	if (!db) return res.status(404).json({ message: "Plugin Not Found" })
	 const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Basic ")) {
    const token = authHeader.slice(6); 
    
		const tokenModel = await tokenModel.findOne({ token: token })
		if (!tokenModel) return res.json({
			status: 401,
			message: "User Not Found"
		})
		let githubUser = getAuthUser(tokenModel.github_access_token)
		if (db.author !== githubUser.login) return res.status(401).json({ message: "This Plugin Not Your Own" })
		await globalPl.findOneAndUpdate({
			_id: pid
		}, {
			$set: req.body
		})
		return res.json({
			message: "SuccessFully"
		})
	}
})
app.post("/api/users/@me/plugins/publish", async (req, res) => {
	let body = req.body
	const authHeader = req.headers.authorization;
	//if (!authHeader) return res.json(2)
	//if (authHeader) {
	if (authHeader && authHeader.startsWith('Basic ')) {
		const token = authHeader.slice(6); // "Bearer " kısmını çıkartarak token'ı alır
		let loadUser = await tokenModel.findOne({
			token
		})
		if (!loadUser) return res.json({
			_ServerMessage: "Null"
		})
		let ferhad = new globalPl({
			token: "31"
		})
		if (!body) return res.json(3);
		/* ferhad.plugins.push({
	  title: req.body.title,
	  description: req.body.description,
	  iconURL: req.body.iconURL,
	  repoURL: req.body.repoURL,
	  downloadURL: `${req.body.repoURL}.zip`,
	  status: "WAITING",
	  category: req.body.category,
		author: req.body.author
	})
	  ferhad.save()*/
		/*let d = await globalPl.findOneAndUpdate({ token: "31"}, { $push : {
		  title: req.body.title,
		  description: req.body.description,
		  iconURL: req.body.iconURL,
		  repoURL: req.body.repoURL,
		  downloadURL: `${req.body.repoURL}.zip`,
		  status: "WAITING",
		  category: req.body.category
		}}, { new: true })
		*/

		const { title, description, iconURL, repoURL, status, category, authorIcon, author, readmeURL } = req.body;

		await (new globalPl({
			title,
			description,
			iconURL,
			repoURL,
			downloadURL: `${repoURL}/archive/refs/heads/main.zip`,
			status,
			category,
      authorIcon,
      author,
      readmeURL,
      Date: Date.now(),
      comments: []

		})).save()
		return res.json({
			_ServerMessage: "Success",
			redirect: "/thanks"
		})
	}

	//}
});
app.post("/api/platform/plugins/approve", async (req, res) => {
	const authHeader = req.headers.authorization;
	//if (!authHeader) return res.json(2)
	//if (authHeader) {
  const headers = req.headers;
	//	if (token !== "adminus") return res.status(401).json({ status: 401 })
		let q = req.query.id
		let d = await globalPl.findOne({ _id: q })
		if (!d) return res.json({ status: 404, message: "Plugin Not Found" })
		await globalPl.findOneAndUpdate({ _id: q }, { $set: { status: "APPROVED" } })
		return res.json({
			message: "Plugin Successfull Approved"
		})
	
  
})
app.get("/api/global/plugins", async (req, res) => {
	let m = await globalPl.findOne({
		token: "31"
	})
	let data =
		(await globalPl.find()) ||
		(await globalPl.find().filter((b) => b.status === "WAITING")).catch(err=> res.json(err))
    
	return res.json({
		_ServerMessage: "Success",
		data: data,
		status: 200
	})
})/*
app.get("/api/plugins/:pid", async (req, res) => {
	let p = req.params.pid
	if (!p) return res.json({
		status: 401
	})
	let data = await globalPl.findOne({
		_id: p
	})
	if (!data) return res.json({
		status: 404,
		message: null
	})
	return res.json({
		status: 200,
		message: "200",
		data: data
	})
})*/
app.get("/api/plugins/:pid/star", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Basic ')) {
    const token = authHeader.slice(6);

    let loadUser = await tokenModel.findOne({
      token: token
    });

    if (!loadUser) {
      return res.json({
        status: 401,
        message: "Unauthorized"
      });
    }

    let plugin = await globalPl.findOne({ _id: req.params.pid });

    if (!plugin) {
      return res.json({
        status: 404,
        message: "Plugin Not Found"
      });
    }

    // Eğer starCount bir sayı değilse uygun bir hata mesajı döndürün
    

    // globalPl koleksiyonunu güncelleyin
    await globalPl.findOneAndUpdate({ _id: req.params.pid }, { $set: { starCount: +1 } });

    // Kullanıcının "starred" listesini güncelleyin
    let IsStarred = await UserStars.findOne({ token: loadUser.github_access_token})
    if(IsStarred){
         if(IsStarred.starred.includes(req.params.pid)) return res.json({
      status: 407,
      message: "Already Starred"
    })
    }
    await UserStars.findOneAndUpdate(
      { token: loadUser.github_access_token },
      { $push: { starred: { plugin_id: req.params.pid } } },
      { new: true, upsert: true }
    );

    return res.json({
      status: 200,
      message: "Plugin Successfully Starred"
    });
  } else {
    return res.json({
      status: 401,
      message: "Unauthorized"
    });
  }
});
app.get("/api/plugins/:pid/unstar", async (req, res) => {
	const authHeader = req.headers.authorization;
	//if (!authHeader) return res.json(2)
	//if (authHeader) {
	if (authHeader && authHeader.startsWith('Basic ')) {
		const token = authHeader.slice(6);

		let loadUser = await tokenModel.findOne({
			token: token
		})
		if (!loadUser) return res.json({
			_ServerMessage: "Null"
		})


		let d = await globalPl.findOne({ _id: req.params.pid })
		if (!d) return res.json({ status: 404, message: "Plugin Not FounD" })
		//let n = d.starCount + 1
		await globalPl.findOneAndUpdate({ _id: req.params.pid }, { $set: { starCount: -1 } })
    await UserStars.findOneAndUpdate( { token: loadUser.github_access_token }, { $pull: { starred: { plugin_id: req.params.pid } } }, { new: true, upsert: true })
		return res.json({
			status: 200,
			message: "Plugin Successfull UnStarred"
		})
	}
})
app.get("/api/plugins/:pid/download", async (req, res) => {
	let pid = req.params.pid
	if (!pid) return res.status(404).json({ message: "Params Not Found" })
	let d = await globalPl.findOne({ _id: pid })
	if (!d) return res.status(404).json({ message: "Plugin Not Foundd" })
	await globalPl.findOneAndUpdate({ _id: pid }, { $set: { downloadCount: d.downloadCount + 1 } })
  
	return res.json({
		message: "Downloaded"
	})
})
app.get("/api/users/@me/stars", async(req,res) => {
  const authHeader = req.headers.authorization;
	if (!authHeader) return res.json(2)
	//if (authHeader) {
	if (authHeader && authHeader.startsWith('Basic ')) {
		const token = authHeader.slice(6);

		let loadUser = await tokenModel.findOne({
			token: token
		})
		if (!loadUser) return res.json({
			_ServerMessage: "Null"
		})
    let userStarss = await UserStars.findOne({ token: loadUser.github_access_token})
  /*  return res.json({
      status: 200,
      message: "Success",
      data: userStarss.starred || []
      
    })*/
    UserStars.findOne({ token: loadUser.github_access_token })
  .exec()
  .then((user) => {
    if (user) {
      const starredData = user.starred;
      return res.json({
      status: 200,
      message: "Success",
      data: starredData.map(a => a.plugin_id)
      })
      
    } else {
     
      return res.json({
      status: 404,
      message: "Success",
      data: ""
      })
      
    }
  })
  .catch((err) => {
    console.error(err);
  });
      }
})
app.get("/api/platform/plugins/:pid/delete", async(req,res) => {
 const authHeader = req.headers.authorization;
	if (!authHeader) return res.json(2)
	//if (authHeader) {
	if (authHeader && authHeader.startsWith('Admin ')) {
		const token = authHeader.slice(6);

		if (token !== "adminus") return res.status(401).json({ status: 401 })
    let d = await globalPl.findOne({ _id: req.params.pid })
		if (!d) return res.json({ status: 404, message: "Plugin Not Found" })
   await globalPl.findOneAndDelete({ _id: req.params.pid})
    return res.json({
      message: "Plugin Was Successfull Delted"
    })
  }
})
app.get("/api/plugins/:pid/comment", async(req,res) => {
  let dataBlacklist = await axios.get("https://github.com/ooguz/turkce-kufur-karaliste/blob/master/karaliste.json")
 // let b = req.body;
  const authHeader = req.headers.authorization;
	//if (!authHeader) return res.json(2)
	//if (authHeader) {
	if (authHeader && authHeader.startsWith('Basic ')) {
		const token = authHeader.slice(6);

		let loadUser = await tokenModel.findOne({
			token: token
		})
		if (!loadUser) return res.json({
			_ServerMessage: "Null"
		})
    let pl = await globalPl.findOne({ _id: req.params.pid })
    if(!pl) return res.status(404).json({
      status: 404,
      message: "Plugin Not Found"
    })
    if(!req.query.comment) return res.status(409).json({
      status: 409,
      message: "Query Empty"
    })
    if(req.query.comment === "") return res.status(409).json({
      status: 409,
      message: "Empty Comment"
    })
    
   const user = await getAuthUser(loadUser.github_access_token)
   const props = {
     authorName: user.login,
     authorIcon: user.avatar_url,
     location: user.location,
     comment: req.query.comment
   }
  if(dataBlacklist?.data.includes(req.query.comment)) return res.status(409).json({
    status: 409,
    message: "Blocked words Included Please try again later"
  })
   await globalPl.findOneAndUpdate(
      { _id: req.params.pid },
      { $push: { comments: props } },
      { new: true }
    );
     return res.json({
       status: 200,
       message: "New Comment Pushed"
     })
  
  }
})
app.get("/prevo/guards/blocked-verify", async(req,res) => {
  let cpVerifyToken = getRandomToken(6)
  let aToken = req.query.userToken
  return res.json({
    status: 200,
    message: "New Captcha Token Created on Voodin Prevo Cloud Systems",
    captchaCode: cpVerifyToken,
    authorizedToken: aToken || "null"
  })
})


app.get("/repos/:username/:reponame/contents", async(req,res) => {
  let date = await axios.get(`https://api.github.com/repos/${req.params.username}/${req.params.reponame}/contents`)
  return res.status(200).json({
    status: 200,
    ...date.data
  })
})
app.get("/api/account-sessions/prevo/blocked-verify", async(req,res) => {
  const authHeader = req.headers.authorization;
	if (!authHeader) return res.json(2)
	//if (authHeader) {
	if (authHeader && authHeader.startsWith('Basic ')) {
		const token = authHeader.slice(6);

		let loadUser = await tokenModel.findOne({
			token: token
		})
		if (!loadUser) return res.json({
			_ServerMessage: "Null"
		})
    let dddd = await BlockedUser.findOneAndUpdate({ token: loadUser.github_access_token}, { $set: { blocked: false , verify_code: req.query._code }})
    if(!dddd) return res.status(500).json({ status: 500 , message: "Unexpected Error ! "})
    
    return res.status(200).json({
      status: 200,
      message: "Success"
    })
  }
})

app.get("/api/admin/users/block", async(req,res) => {
  const authHeader = req.headers.authorization;
	if (!authHeader) return res.json(2)
	//if (authHeader) {
	if (authHeader && authHeader.startsWith('Admin ')) {
		const token = authHeader.slice(6);
    if (token !== "adminus") return res.status(401).json({ status: 401 })
   // let ListAllUsers = (await UserModel.find())
    let listTokens = (await tokenModel.find()).map(a => a.github_access_token)
    let dReqUser = await getAuthUser(listTokens)
    let dReqExistData = await dReqUser.filter(a => a.login === req.query.github_session_username)
    let dReqFilteredGithubToken = dReqExistData.github_access_token;
    return res.json(
      {
        ...dReqExistData,
        ...dReqFilteredGithubToken
      }
    )
    
    

  }
})
app.listen(PORT, () => {
	console.log(`server started on ${PORT} PORT`);
});
